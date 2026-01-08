import os
import torch
from transformers import BertTokenizer, BertForSequenceClassification
# import spacy # Moved to NERCounter for better error handling on Python 3.14

import logging

# Configure logger
logger = logging.getLogger(__name__)

class SentimentAnalyzer:
    def __init__(self, model_dir=None, model=None, tokenizer=None):
        """
        Initialize the sentiment analyzer. 
        Can accept pre-loaded model/tokenizer to prevent re-loading on every request.
        """
        if model and tokenizer:
            logger.info("Using pre-loaded AraBERT model...")
            self.model = model
            self.tokenizer = tokenizer
        elif model_dir:
            logger.info(f"Loading AraBERT model from {model_dir}...")
            self.tokenizer = BertTokenizer.from_pretrained(model_dir)
            self.model = BertForSequenceClassification.from_pretrained(model_dir)
        else:
            raise ValueError("Must provide either model_dir or (model, tokenizer)")
            
        self.model.eval()

    def analyze(self, text):
        """
        Predict sentiment for the given Arabic text.
        """
        inputs = self.tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
        with torch.no_grad():
            outputs = self.model(**inputs)
            logits = outputs.logits
            # probability = torch.softmax(logits, dim=1) # Useful if we want confidence later
            prediction = torch.argmax(logits, dim=1).item()
        
        # Mapping depends on the model's training; assuming 0: Negative, 1: Positive for now.
        # This can be adjusted based on the labels in config.json if available.
        sentiment_map = {0: "Negative", 1: "Positive", 2: "Neutral"}
        return sentiment_map.get(prediction, "Unknown")

class ClickbaitDetector:
    def __init__(self):
        # Common Arabic clickbait keywords/phrases
        self.clickbait_keywords = [
            "شاهد قبل الحذف", "لن تصدق", "بسرعة", "فضيحة", "لا يفوتك", 
            "مفاجأة", "حصرياً", "عاجل", "الصدمة", "كيف حصل هذا", "خطير"
        ]

    def detect(self, text):
        """
        Simple keyword-based clickbait detection.
        """
        found_keywords = [kw for kw in self.clickbait_keywords if kw in text]
        is_clickbait = len(found_keywords) > 0
        return {
            "is_clickbait": is_clickbait,
            "found_keywords": found_keywords
        }

class NERCounter:
    _nlp_instance = None
    
    def __init__(self):
        """
        Initialize NER with singleton pattern for Spacy model
        """
        if NERCounter._nlp_instance is None:
            try:
                import spacy
                NERCounter._nlp_instance = spacy.load("xx_ent_wiki_sm") # Multi-language model often used for Arabic
            except (ImportError, Exception) as e:
                logger.warning(f"Warning: Could not import or load spaCy. NER counting will be disabled. Error: {e}")
                NERCounter._nlp_instance = None
        
        self.nlp = NERCounter._nlp_instance

    def count_entities(self, text):
        """
        Count named entities (Person, Org, Loc) in the text.
        """
        if not self.nlp:
            return {"PER": 0, "ORG": 0, "LOC": 0}
        
        doc = self.nlp(text)
        counts = {"PER": 0, "ORG": 0, "LOC": 0}
        # Standard SpaCy labels: PER, ORG, LOC
        for ent in doc.ents:
            label = ent.label_
            # Map standard labels if needed, but xx_ent_wiki_sm usually uses PER, ORG, LOC
            if label in counts:
                counts[label] += 1
        return counts

def extract_features(text, sentiment_analyzer=None, model_dir=None):
    """
    Aggregate all text features into a single dictionary.
    
    Args:
        text (str): The news text.
        sentiment_analyzer (SentimentAnalyzer, optional): Pre-initialized analyzer. 
                                                         If None, will create new one (SLOW).
        model_dir (str, optional): Path to model if initializing new analyzer.
    """
    if sentiment_analyzer is None:
        if model_dir is None:
             raise ValueError("Must provide sentiment_analyzer instance OR model_dir")
        sentiment_analyzer = SentimentAnalyzer(model_dir=model_dir)

    clickbait_detector = ClickbaitDetector()
    ner_counter = NERCounter()

    sentiment = sentiment_analyzer.analyze(text)
    clickbait_info = clickbait_detector.detect(text)
    ner_counts = ner_counter.count_entities(text)

    return {
        "text": text,
        "sentiment": sentiment,
        "clickbait_analysis": clickbait_info,
        "ner_counts": ner_counts,
        "total_words": len(text.split())
    }

if __name__ == "__main__":
    # Example usage
    MODEL_DIR = os.path.dirname(os.path.abspath(__file__))
    
    print("Initializing Analyzer once...")
    try:
        analyzer = SentimentAnalyzer(model_dir=MODEL_DIR)
        
        test_text = "شاهد قبل الحذف: مفاجأة كبيرة في العاصمة القاهرة اليوم"
        
        print("Extracting features using pre-loaded analyzer...")
        features = extract_features(test_text, sentiment_analyzer=analyzer)
        
        print("\nExtracted Features:")
        for key, value in features.items():
            print(f"{key}: {value}")
    except Exception as e:
        print(f"Error: {e}")
