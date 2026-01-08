import { motion } from "framer-motion";
import { Shield, Layout, Sparkles } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="py-8 border-t border-white/5 bg-card/30 backdrop-blur-xl relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"
          animate={{ x: [-20, 20, -20], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px]"
          animate={{ x: [20, -20, 20], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4">
          {/* Brand & Copyright */}
          <div className="flex items-center gap-4">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center relative overflow-hidden">
                <Shield className="w-4 h-4 text-primary-foreground relative z-10" />
              </div>
              <span className="text-base font-bold text-foreground">
                مِصداق<span className="gradient-text">AI</span>
              </span>
            </motion.div>
            <div className="hidden sm:block h-4 w-[1px] bg-white/10" />
            <p className="text-muted-foreground text-xs font-light">
              © {currentYear} جميع الحقوق محفوظة
            </p>
          </div>

          {/* Project Badge */}
          <motion.div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10"
            whileHover={{ scale: 1.05, borderColor: "rgba(59, 130, 246, 0.3)" }}
          >
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-xs font-medium text-foreground/80">
              مشروع <span className="text-primary font-bold text-xs">NTI</span> النهائي
            </span>
          </motion.div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <motion.a
              href="#about"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ y: -1 }}
            >
              عن المشروع
            </motion.a>
            <motion.a
              href="#features"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ y: -1 }}
            >
              الميزات
            </motion.a>
            <motion.a
              href="#team"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ y: -1 }}
            >
              الفريق
            </motion.a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;