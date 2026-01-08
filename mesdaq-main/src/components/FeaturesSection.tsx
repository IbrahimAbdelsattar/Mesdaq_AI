import { motion, Variants } from "framer-motion";
import { Shield, Brain, BarChart3, LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon: Icon, title, description, index }: FeatureCardProps) => {
  return (
    <motion.div
      className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors duration-500 overflow-hidden"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Floating Particles on Hover */}
      <motion.div
        className="absolute top-4 left-4 w-2 h-2 rounded-full bg-primary/50"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1, x: [0, 10, 0], y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 relative"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <motion.div
            className="absolute inset-0 rounded-xl bg-primary/20"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
          />
          <Icon className="w-7 h-7 text-primary relative z-10" />
        </motion.div>

        {/* Title */}
        <motion.h3 
          className="text-xl font-semibold text-foreground mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>

        {/* Description */}
        <motion.p 
          className="text-muted-foreground leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>
      </div>

      {/* Corner Accent */}
      <motion.div 
        className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{ rotate: [0, 90, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Bottom Line Animation */}
      <motion.div
        className="absolute bottom-0 right-0 left-0 h-1 bg-gradient-to-l from-primary to-blue-500"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ originX: 1 }}
      />
    </motion.div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "كشف الأخبار الزائفة",
      description:
        "نظام تصنيف قائم على Transformer يحدد بدقة الأخبار الزائفة من الحقيقية في المقالات العربية.",
    },
    {
      icon: Brain,
      title: "تفسير الذكاء الاصطناعي",
      description:
        "تفسيرات واضحة ومفهومة مدعومة بنماذج LLM توضح لماذا المحتوى مضلل أو موثوق.",
    },
    {
      icon: BarChart3,
      title: "نقاط المصداقية",
      description:
        "نقاط ثقة واضحة من ٠ إلى ١٠٠٪ تساعدك على تقييم موثوقية أي محتوى إخباري عربي بسرعة.",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"
        animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"
        animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
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
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            المميزات
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            تحليل مدعوم بالذكاء الاصطناعي
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            نجمع بين أحدث نماذج معالجة اللغة الطبيعية لتقديم نتائج دقيقة وقابلة للتفسير
          </motion.p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;