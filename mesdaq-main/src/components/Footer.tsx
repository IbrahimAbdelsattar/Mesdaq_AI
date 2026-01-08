import { motion } from "framer-motion";
import { Github, Shield, Heart, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="py-12 border-t border-border bg-card/50 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated background */}
      <motion.div
        className="absolute top-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        animate={{ x: [0, 50, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Name */}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center relative overflow-hidden"
              whileHover={{ rotate: -10 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <Shield className="w-5 h-5 text-primary-foreground relative z-10" />
            </motion.div>
            <span className="text-lg font-bold text-foreground">
              مِصداق<span className="gradient-text">AI</span>
            </span>
          </motion.div>

          {/* Center Text */}
          <motion.div
            className="flex items-center gap-2 text-muted-foreground text-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span>صُنع بـ</span>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Heart className="w-4 h-4 text-destructive fill-destructive" />
            </motion.div>
            <span>لمشروع</span>
            <span className="font-semibold text-foreground">NTI</span>
            <span>النهائي</span>
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
              <span className="text-sm">GitHub</span>
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                whileHover={{ opacity: 1, x: 0 }}
              >
                <ExternalLink className="w-3 h-3" />
              </motion.div>
            </motion.a>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="mt-8 pt-6 border-t border-border text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-muted-foreground text-sm">
            © {currentYear} مِصداق AI. جميع الحقوق محفوظة.
          </p>
          <motion.p 
            className="text-primary/60 text-xs mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            منصة الكشف عن الأخبار الزائفة بالذكاء الاصطناعي
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;