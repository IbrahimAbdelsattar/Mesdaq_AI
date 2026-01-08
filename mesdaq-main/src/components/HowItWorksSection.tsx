import { motion, Variants } from "framer-motion";
import { FileText, Languages, Cpu, Search, MessageSquareText } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: FileText,
      title: "إرسال النص",
      description: "الصق أو اكتب نص الخبر العربي الذي تريد التحقق منه",
    },
    {
      icon: Languages,
      title: "معالجة النص",
      description: "يتم تنظيف النص العربي وتحضيره للتحليل",
    },
    {
      icon: Cpu,
      title: "تنبؤ النموذج",
      description: "نموذج Transformer يصنف المحتوى كخبر زائف أو حقيقي",
    },
    {
      icon: Search,
      title: "تحليل السمات",
      description: "استخراج الأنماط اللغوية والمؤشرات",
    },
    {
      icon: MessageSquareText,
      title: "تفسير الذكاء الاصطناعي",
      description: "LLM يولد نقاط المصداقية والتفسير المفصل",
    },
  ];

  const lineVariants: Variants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 1.5 },
    },
  };

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <motion.div
        className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"
        animate={{ x: [50, -50, 50], opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2"
        animate={{ x: [-50, 50, -50], opacity: [0.3, 0.6, 0.3], scale: [1.2, 1, 1.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            الآلية
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            كيف يعمل النظام
          </h2>
          <p className="text-lg text-muted-foreground">
            عملية بسيطة من ٥ خطوات للتحقق من المحتوى الإخباري العربي
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting Line */}
            <motion.div
              className="absolute right-8 md:right-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block origin-top"
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />
            <motion.div
              className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:hidden origin-top"
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />

            {/* Animated particles along the line */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute right-[30px] md:right-1/2 w-2 h-2 rounded-full bg-primary hidden md:block"
                style={{ top: `${i * 20 + 10}%` }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [0, 100, 200],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Steps */}
            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-start gap-8 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Step Number & Icon */}
                  <motion.div
                    className="relative z-10 flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center shadow-lg shadow-primary/25 relative overflow-hidden"
                      initial={{ rotate: 10, scale: 0.8 }}
                      whileInView={{ rotate: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: index * 0.5 }}
                      />
                      <step.icon className="w-7 h-7 text-primary-foreground relative z-10" />
                    </motion.div>
                    <motion.div
                      className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-card border-2 border-primary flex items-center justify-center text-xs font-bold text-primary"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.15 + 0.3 }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                    >
                      {index + 1}
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    className={`flex-1 ${
                      index % 2 === 0 ? "md:text-right md:pl-16" : "md:text-left md:pr-16"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className="bg-card p-6 rounded-2xl border border-border hover:border-primary/30 transition-colors relative overflow-hidden group"
                      whileHover={{ boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
                    >
                      {/* Hover gradient */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      <h3 className="text-xl font-semibold text-foreground mb-2 relative z-10">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground relative z-10">{step.description}</p>
                    </motion.div>
                  </motion.div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;