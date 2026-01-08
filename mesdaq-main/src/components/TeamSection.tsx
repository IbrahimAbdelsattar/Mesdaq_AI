import { motion } from "framer-motion";
import { Brain, Cpu, Search, Database, LucideIcon } from "lucide-react";

interface TeamCardProps {
  name: string;
  role: string;
  responsibility: string;
  icon: LucideIcon;
  image?: string;
  index: number;
}

const TeamCard = ({ name, role, responsibility, icon: Icon, image, index }: TeamCardProps) => {
  return (
    <motion.div
      className="group relative bg-card/40 backdrop-blur-xl rounded-3xl border border-white/5 p-8 hover:border-primary/40 transition-all duration-700 overflow-hidden shadow-2xl shadow-black/5"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -12 }}
    >
      {/* Dynamic Overlay Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
      />

      {/* Modern Background Pattern */}
      <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
        <Icon className="w-24 h-24 rotate-12" />
      </div>

      {/* Avatar Section with Advanced Ring */}
      <div className="relative mb-8 flex justify-center">
        <motion.div
          className="relative w-28 h-28 p-1 rounded-full bg-gradient-to-tr from-primary via-blue-500 to-purple-500 overflow-hidden shadow-xl"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="w-full h-full rounded-full bg-background overflow-hidden relative">
            {image ? (
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-secondary">
                <Icon className="w-12 h-12 text-primary" />
              </div>
            )}
          </div>

          {/* Decorative Ring Glow */}
          <motion.div
            className="absolute inset-0 rounded-full border border-white/20"
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Floating Tag */}
        <div className="absolute -bottom-2 px-3 py-1 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20">
          <Icon className="w-3 h-3 text-primary" />
        </div>
      </div>

      {/* Information Area */}
      <div className="relative z-10 text-center">
        <motion.h3
          className="text-xl font-bold text-foreground mb-1 tracking-tight"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          {name}
        </motion.h3>

        <motion.p
          className="text-primary font-medium text-xs uppercase tracking-[0.2em] mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          {role}
        </motion.p>

        <motion.p
          className="text-muted-foreground/80 text-[13px] leading-relaxed mb-6 font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          {responsibility}
        </motion.p>
      </div>

      {/* Subtle Interaction Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        style={{ originX: 0 }}
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
      image: "/team/ibrahim.jpg",
    },
    {
      name: "يوسف أبو زيد",
      role: "مهندس ذكاء اصطناعي",
      responsibility: "بناء وتحسين نماذج Transformer لتصنيف النصوص العربية.",
      icon: Cpu,
      image: "/team/youssef.jpg",
    },
    {
      name: "ياسين",
      role: "مهندس ذكاء اصطناعي",
      responsibility: "تصميم خطوط معالجة اللغة الطبيعية واستخراج السمات لتحليل المصداقية.",
      icon: Search,
      image: "/team/yassin.jpg",
    },
    {
      name: "طه",
      role: "مهندس ذكاء اصطناعي",
      responsibility: "تنفيذ منطق LLM وتوليد مخرجات الذكاء الاصطناعي القابلة للتفسير.",
      icon: Database,
      image: "/team/taha.jpg",
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
              image={member.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;