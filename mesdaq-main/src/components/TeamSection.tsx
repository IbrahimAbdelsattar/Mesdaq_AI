import { motion } from "framer-motion";
import { Brain, Cpu, Search, Database, LucideIcon } from "lucide-react";

interface TeamCardProps {
  name: string;
  role: string;
  responsibility: string;
  icon: LucideIcon;
  index: number;
}

const TeamCard = ({ name, role, responsibility, icon: Icon, index }: TeamCardProps) => {
  return (
    <motion.div
      className="group relative bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-colors duration-500 overflow-hidden"
      initial={{ opacity: 0, y: 40, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Floating particles */}
      <motion.div
        className="absolute top-4 left-4 w-2 h-2 rounded-full bg-primary/30"
        animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
      />

      {/* Avatar/Icon */}
      <motion.div
        className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center relative"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-primary/20"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
        />
        <Icon className="w-8 h-8 text-primary relative z-10" />
      </motion.div>

      {/* Name */}
      <motion.h3 
        className="text-lg font-semibold text-foreground text-center mb-1"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.2 }}
      >
        {name}
      </motion.h3>

      {/* Role */}
      <motion.p 
        className="text-primary text-sm font-medium text-center mb-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        {role}
      </motion.p>

      {/* Responsibility */}
      <motion.p 
        className="text-muted-foreground text-sm text-center leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.4 }}
      >
        {responsibility}
      </motion.p>

      {/* Bottom line animation */}
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

const TeamSection = () => {
  const team = [
    {
      name: "إبراهيم عبدالستار",
      role: "مهندس ذكاء اصطناعي",
      responsibility: "تطوير نماذج الذكاء الاصطناعي وتنفيذ حلول التعلم الآلي لكشف الأخبار الزائفة.",
      icon: Brain,
    },
    {
      name: "يوسف أبو زيد",
      role: "مهندس ذكاء اصطناعي",
      responsibility: "بناء وتحسين نماذج Transformer لتصنيف النصوص العربية.",
      icon: Cpu,
    },
    {
      name: "ياسين",
      role: "مهندس ذكاء اصطناعي",
      responsibility: "تصميم خطوط معالجة اللغة الطبيعية واستخراج السمات لتحليل المصداقية.",
      icon: Search,
    },
    {
      name: "طه",
      role: "مهندس ذكاء اصطناعي",
      responsibility: "تنفيذ منطق LLM وتوليد مخرجات الذكاء الاصطناعي القابلة للتفسير.",
      icon: Database,
    },
  ];

  return (
    <section id="team" className="py-24 relative overflow-hidden">
      {/* Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
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
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            الفريق
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            تعرّف على المهندسين
          </h2>
          <p className="text-lg text-muted-foreground">
            الأشخاص الموهوبون وراء مِصداق AI
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <TeamCard
              key={index}
              name={member.name}
              role={member.role}
              responsibility={member.responsibility}
              icon={member.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;