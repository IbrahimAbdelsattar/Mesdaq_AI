import { motion } from "framer-motion";
import { Target, Lightbulb, Shield } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Target,
      title: "الرسالة",
      description: "مكافحة التضليل في المحتوى العربي باستخدام تقنيات الذكاء الاصطناعي المتقدمة",
    },
    {
      icon: Lightbulb,
      title: "الرؤية",
      description: "مجتمع رقمي عربي أكثر وعياً ومعرفة",
    },
    {
      icon: Shield,
      title: "القيم",
      description: "الشفافية والدقة وتمكين المستخدم",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3], x: [0, -50, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Animated lines */}
      <motion.div
        className="absolute top-1/4 right-0 w-64 h-px bg-gradient-to-l from-primary/20 to-transparent"
        animate={{ scaleX: [0, 1, 0], x: [0, -100, -200] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              عن المشروع
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              عن مِصداق AI
            </h2>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
          >
            {/* Decorative corners */}
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

            <motion.p
              className="text-lg md:text-xl text-foreground leading-relaxed text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              يهدف مِصداق AI إلى مكافحة التضليل في الإعلام الرقمي العربي من خلال الجمع بين 
              أحدث نماذج معالجة اللغة الطبيعية والذكاء الاصطناعي القابل للتفسير. توفر منصتنا 
              رؤى شفافة ودقيقة وقابلة للتنفيذ لمساعدة المستخدمين على التعرف على الأخبار الزائفة.
            </motion.p>

            {/* Values */}
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {/* Pulse effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-primary/20"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                    <item.icon className="w-6 h-6 text-primary relative z-10" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Arabic Quote */}
            <motion.div
              className="mt-12 pt-8 border-t border-border"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <motion.p 
                className="text-center text-primary text-xl font-semibold"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                مِصداق — نحو إعلام عربي رقمي أكثر مصداقية وشفافية
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;