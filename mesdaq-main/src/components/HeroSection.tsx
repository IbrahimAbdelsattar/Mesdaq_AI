import { motion, Variants } from "framer-motion";
import { ArrowDown, Sparkles, Zap, Shield, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.02]" />
      <motion.div
        className="absolute top-1/4 right-1/2 translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-radial from-blue-500/10 to-transparent blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <motion.div
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8"
            whileHover={{ scale: 1.05, borderColor: "hsl(199, 89%, 48%)" }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm text-muted-foreground">
              مدعوم بتقنيات Transformers و LLMs
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            اكشف الأخبار الزائفة{" "}
            <motion.span 
              className="gradient-text inline-block"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              بالذكاء الاصطناعي
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            مِصداق AI يستخدم تقنيات معالجة اللغة الطبيعية المتقدمة والنماذج اللغوية الكبيرة 
            لتحليل الأخبار العربية وشرح التضليل بوضوح
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="hero" size="xl" asChild className="group">
                <a href="#analyze" className="flex items-center gap-2">
                  تحليل الأخبار
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowDown className="w-5 h-5" />
                  </motion.div>
                </a>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="lg" asChild>
                <a href="#how-it-works">تعرّف على الآلية</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Animated Features Icons */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-8 mt-16"
          >
            {[
              { icon: Shield, label: "حماية موثوقة", delay: 0 },
              { icon: Brain, label: "ذكاء اصطناعي", delay: 0.1 },
              { icon: Zap, label: "تحليل فوري", delay: 0.2 },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay + 1 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-secondary/50 border border-border flex items-center justify-center"
                  whileHover={{ 
                    borderColor: "hsl(199, 89%, 48%)",
                    boxShadow: "0 0 20px hsl(199, 89%, 48%, 0.3)"
                  }}
                  animate={{ 
                    y: [0, -5, 0],
                  }}
                  transition={{ 
                    y: { duration: 2, repeat: Infinity, delay: index * 0.3 }
                  }}
                >
                  <item.icon className="w-5 h-5 text-primary" />
                </motion.div>
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-8 mt-16 max-w-xl mx-auto"
          >
            {[
              { value: "٩٨٪", label: "دقة التحليل" },
              { value: "٠-١٠٠", label: "نقاط المصداقية" },
              { value: "AI", label: "تفسيرات ذكية" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.div
                  className="absolute inset-0 bg-primary/5 rounded-xl -z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                />
                <motion.div 
                  className="text-2xl md:text-3xl font-bold gradient-text mb-1"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div 
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
          whileHover={{ borderColor: "hsl(199, 89%, 48%)" }}
        >
          <motion.div
            className="w-1 h-2 bg-primary rounded-full"
            animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;