import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, TrendingUp, Info, HelpCircle } from "lucide-react";

interface ResultsSectionProps {
  result?: {
    is_fake: boolean;
    credibility_score: number;
    explanation: string;
    prediction_details?: {
      model_confidence: number;
    };
  };
}

const ResultsSection = ({ result }: ResultsSectionProps) => {
  // Use real data or fallback
  const displayResult = result || {
    is_fake: false,
    credibility_score: 0,
    explanation: "No result",
    prediction_details: { model_confidence: 0 }
  };

  const confidence = displayResult.prediction_details?.model_confidence || 0;
  // Trust calibration: If confidence is low (< 60%), treat as Uncertain
  const isUncertain = confidence < 0.60;

  return (
    <section id="results" className="py-24 relative overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute top-20 right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
            تقرير التحليل
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            نتيجة الفحص
          </h2>
        </motion.div>

        {/* Card */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-card rounded-3xl border border-border p-8 shadow-xl relative overflow-hidden"
          >
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div
                className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg font-semibold border ${isUncertain
                  ? "bg-slate-100 text-slate-700 border-slate-300"
                  : displayResult.is_fake
                    ? "bg-destructive/10 text-destructive border-destructive/20"
                    : "bg-success/10 text-success border-success/20"
                  }`}
              >
                {isUncertain ? (
                  <>
                    <HelpCircle className="w-6 h-6" />
                    نتيجة غير حاسمة
                  </>
                ) : displayResult.is_fake ? (
                  <>
                    <AlertTriangle className="w-6 h-6" />
                    خبر زائف على الأرجح
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-6 h-6" />
                    خبر حقيقي على الأرجح
                  </>
                )}
              </div>
            </div>

            {/* Score */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-muted-foreground font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  مؤشر المصداقية (تقديري)
                </span>
                <span className="text-2xl font-bold text-foreground">
                  {Math.min(99, displayResult.credibility_score)}٪
                </span>
              </div>
              <div className="h-4 bg-secondary rounded-full overflow-hidden relative">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${displayResult.credibility_score < 40
                    ? "bg-gradient-to-l from-destructive to-orange-500"
                    : displayResult.credibility_score < 70
                      ? "bg-gradient-to-l from-warning to-yellow-400"
                      : "bg-gradient-to-l from-success to-emerald-400"
                    }`}
                  style={{ width: `${displayResult.credibility_score}%` }}
                />
              </div>

              {/* Trust labels */}
              <div className="flex justify-between mt-2 text-xs text-muted-foreground px-1">
                <span>مرتفع</span>
                <span>منخفض</span>
              </div>

              {isUncertain && (
                <p className="text-center text-sm text-muted-foreground mt-4 bg-secondary/50 p-2 rounded-lg">
                  تنبيه: درجة ثقة النموذج منخفضة ({Math.round(confidence * 100)}%). يُنصح بشدة بالتحقق من المصادر الرسمية.
                </p>
              )}
            </div>

            {/* Explanation */}
            <div className="bg-secondary/30 rounded-2xl p-6 border border-border">
              <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                <Info className="w-4 h-4" />
                التحليل اللغوي
              </h4>
              <p className="text-foreground leading-relaxed text-right text-sm md:text-base">
                {displayResult.explanation}
              </p>
            </div>

            {/* Mandatory Disclaimer */}
            <div className="mt-8 pt-6 border-t border-border/50 text-center">
              <p className="text-xs text-muted-foreground/70">
                إخلاء مسؤولية: Mesdaq AI أداة مساعدة للتحليل اللغوي ولا تضمن صحة الخبر بنسبة 100%. يرجى دائماً العودة للمصادر الرسمية.
              </p>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;