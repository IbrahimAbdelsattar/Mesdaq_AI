"""
LLM Service for generating explanations and credibility scores
"""
import os
import json
import logging
from typing import Tuple, Optional
from dotenv import load_dotenv
import requests

load_dotenv()
logger = logging.getLogger("llm_service")

class LLMExplainer:
    """
    Service for generating explanations using OpenRouter API with Claude 3.5 Sonnet
    """
    
    def __init__(self):
        self.api_key = os.getenv("OPENROUTER_API_KEY")
        self.api_base = "https://openrouter.ai/api/v1"
        self.model = "anthropic/claude-3.5-sonnet"
        
        if not self.api_key:
            logger.warning("OPENROUTER_API_KEY not found in environment")
    
    def generate_explanation(
        self,
        news_text: str,
        is_fake: bool,
        model_confidence: float,
        sentiment: str,
        is_clickbait: bool,
        entities: dict
    ) -> Tuple[str, int, int]:
        """
        Generate explanation using Claude 3.5 Sonnet via OpenRouter
        
        Returns:
            Tuple of (explanation_text, prompt_tokens, completion_tokens)
        """
        
        if not self.api_key:
            return self._get_fallback_explanation(is_fake, model_confidence), 0, 0
        
        prompt = self._build_prompt(
            news_text, is_fake, model_confidence, sentiment, is_clickbait, entities
        )
        
        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
            }
            
            payload = {
                "model": self.model,
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                "temperature": 0.5,
                "max_tokens": 500,
            }
            
            response = requests.post(
                f"{self.api_base}/chat/completions",
                headers=headers,
                json=payload,
                timeout=30
            )
            
            if response.status_code != 200:
                logger.error(f"OpenRouter API error: {response.status_code} - {response.text}")
                return self._get_fallback_explanation(is_fake, model_confidence), 0, 0
            
            data = response.json()
            explanation = data["choices"][0]["message"]["content"].strip()
            prompt_tokens = data.get("usage", {}).get("prompt_tokens", 0)
            completion_tokens = data.get("usage", {}).get("completion_tokens", 0)
            
            return explanation, prompt_tokens, completion_tokens
            
        except Exception as e:
            logger.error(f"Error calling OpenRouter API: {str(e)}")
            return self._get_fallback_explanation(is_fake, model_confidence), 0, 0
    
    def _build_prompt(
        self,
        news_text: str,
        is_fake: bool,
        model_confidence: float,
        sentiment: str,
        is_clickbait: bool,
        entities: dict
    ) -> str:
        """Build the prompt for Claude"""
        
        classification = "مزيف (Fake)" if is_fake else "حقيقي (Real)"
        # Never show 100% confidence to the LLM or in text
        confidence_pct = min(99, round(model_confidence * 100))
        
        prompt = f"""أنت خبير لغوي ومحلل محتوي رقمي.
المهمة: شرح وتفسير نتيجة نموذج الذكاء الاصطناعي بلغة متزنة ودقيقة دون ادعاء الحقيقة المطلقة.

بيانات النموذج:
- التصنيف الأولي: {classification}
- الثقة في النمط اللغوي: {confidence_pct}%
- تحليل المشاعر: {sentiment}
- مؤشر أسلوب الطعم (Clickbait): {'نعم' if is_clickbait else 'لا'}
- الكيانات المذكورة: {sum(entities.values())}

الخبر:
"{news_text}"

تعليمات صارمة:
1. لا تستخدم لغة قاطعة (مثل "هذا خبر كاذب 100%"). استخدم لغة احتمالية (مثل "تشير المؤشرات اللغوية..."، "يغلب على الخبر طابع...").
2. ركز على "لماذا" اعتقد النموذج ذلك (اللغة العاطفية، غياب المصادر، المبالغة، أو العكس).
3. تجنب المصطلحات التقنية المعقدة. خاطب المستخدم العادي.
4. إذا كان الخبر "حقيقي"، ركز على توازن اللغة ووجود مؤشرات المصداقية.
5. إذا كان الخبر "مزيف"، ركز على أسلوب الإثارة أو الغموض أو المبالغة.

المطلوب إخراج JSON فقط:
{{
  "explanation": "شرح متزن (3-4 جمل) يوضح الأسباب اللغوية والنمطية للنتيجة.",
  "factors": ["عامل 1", "عامل 2"],
  "credibility_score": درجة تقديرية من 0 ل 95 (لا تعطِ 100 أبداً، الحد الأقصى 95)
}}"""
        
        return prompt
    
    def _get_fallback_explanation(self, is_fake: bool, confidence: float) -> str:
        """Get fallback explanation if LLM call fails"""
        
        # Clamp to 99% max
        confidence_pct = min(99, round(confidence * 100))
        
        if is_fake:
            return (f"تشير التحليلات الآلية للنمط اللغوي إلى احتمالية أن يكون الخبر غير دقيق (بنسبة ثقة {confidence_pct}%). "
                   f"يعتمد هذا التقييم على رصد مؤشرات مثل اللغة المبالغ فيها، أو أسلوب الإثارة العاطفية، "
                   f"التي غالباً ما تصاحب المحتوى المضلل.")
        else:
            return (f"تشير التحليلات الآلية إلى أن الخبر صيغ بلغة متوازنة وموضوعية (بنسبة ثقة {confidence_pct}%). "
                   f"يخلو النص من مؤشرات المبالغة أو الإثارة المعتادة في الأخبار المضللة، مما يرفع من احتمالية مصداقيته من الناحية اللغوية.")
    
    def extract_json_from_response(self, text: str) -> Optional[dict]:
        """Extract JSON from LLM response"""
        
        try:
            start_idx = text.find('{')
            end_idx = text.rfind('}') + 1
            
            if start_idx != -1 and end_idx > start_idx:
                json_str = text[start_idx:end_idx]
                return json.loads(json_str)
        except json.JSONDecodeError:
            logger.warning("Failed to parse JSON from LLM response")
        
        return None
    
    def calculate_credibility_score(
        self,
        is_fake: bool,
        model_confidence: float,
        sentiment: str,
        is_clickbait: bool,
        entity_diversity: float
    ) -> int:
        """
        Calculate credibility score (0-100) based on multiple factors.
        Ensures strict bounds and avoids 100% certainty.
        """
        
        # Base score from model confidence
        base_score = int(model_confidence * 90) if not is_fake else int((1 - model_confidence) * 90)
        
        sentiment_adjustment = 0
        if sentiment == "neutral":
            sentiment_adjustment = 5
        elif sentiment in ["positive", "negative"]:
            # Strong sentiment slightly reduces credibility in objective news
            sentiment_adjustment = -2
        
        clickbait_adjustment = -15 if is_clickbait else 5
        entity_adjustment = int(entity_diversity * 10)
        
        final_score = base_score + sentiment_adjustment + clickbait_adjustment + entity_adjustment
        
        # Clamp score between 5 and 95 (Never 0 or 100)
        return max(5, min(95, final_score))
