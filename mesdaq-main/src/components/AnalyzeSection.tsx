import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Sparkles, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AnalyzeSectionProps {
  onAnalysisComplete: (result: any) => void;
}

const AnalyzeSection = ({ onAnalysisComplete }: AnalyzeSectionProps) => {
  const [newsText, setNewsText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!newsText.trim()) return;
    setIsLoading(true);
    onAnalysisComplete(null); // Reset previous result

    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ news_text: newsText }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze text");
      }

      const data = await response.json();
      onAnalysisComplete(data);

      // Verification toast
      toast({
        title: "تم التحليل بنجاح",
        description: "تم استخراج النتائج من النموذج والذكاء الاصطناعي.",
      });

      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);

    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        variant: "destructive",
        title: "خطأ في التحليل",
        description: "تأكد من تشغيل الخادم (Backend) وحاول مرة أخرى.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="analyze" className="py-24 relative overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />

      {/* Animated circles */}
      <motion.div
        className="absolute top-10 right-10 w-64 h-64 border border-primary/10 rounded-full"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-48 h-48 border border-blue-500/10 rounded-full"
        animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            animate={{ opacity: [0.7, 1, 0.7] }}
          >
            جرّب الآن
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            تحليل الأخبار العربية
          </h2>
          <p className="text-lg text-muted-foreground">
            الصق أي نص خبر عربي أدناه للتحقق من مصداقيته
          </p>
        </motion.div>

        {/* Analysis Form */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="bg-card rounded-3xl border border-border p-8 shadow-lg relative overflow-hidden"
            whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated corner decorations */}
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-transparent"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />

            {/* Icon */}
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
            >
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <FileText className="w-8 h-8 text-primary" />
              </motion.div>
            </motion.div>

            {/* Text Area */}
            <div className="relative">
              <motion.textarea
                value={newsText}
                onChange={(e) => setNewsText(e.target.value)}
                placeholder="الصق نص الخبر العربي هنا للتحقق من مصداقيته..."
                className="w-full h-48 bg-secondary/50 border border-border rounded-2xl p-6 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-right"
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <motion.div
                className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-muted-foreground"
                animate={{ opacity: newsText.length > 0 ? 1 : 0.5 }}
              >
                <motion.span
                  key={newsText.length}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="font-bold text-primary"
                >
                  {newsText.length}
                </motion.span>
                <span>حرف</span>
              </motion.div>
            </div>

            {/* Analyze Button */}
            <div className="mt-6 flex justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="hero"
                  size="xl"
                  onClick={handleAnalyze}
                  disabled={!newsText.trim() || isLoading}
                  className="min-w-[200px] relative overflow-hidden"
                >
                  {/* Button shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="w-5 h-5 animate-spin" />
                        جاري التحليل...
                      </motion.div>
                    ) : (
                      <motion.div
                        key="analyze"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        تحليل
                        <Send className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>

            {/* Example Text Button */}
            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={() =>
                  setNewsText(
                    "أعلنت وزارة الصحة اليوم عن اكتشاف علاج جديد يقضي على جميع الأمراض بنسبة ١٠٠٪ وسيتم توزيعه مجاناً على جميع المواطنين بدءاً من الأسبوع القادم."
                  )
                }
                className="text-sm text-primary hover:underline inline-flex items-center gap-2 relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                تحميل نص تجريبي
                <motion.span
                  className="absolute bottom-0 right-0 left-0 h-0.5 bg-primary origin-right"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnalyzeSection;