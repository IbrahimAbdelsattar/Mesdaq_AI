import { LucideIcon } from "lucide-react";

interface TeamCardProps {
  name: string;
  role: string;
  responsibility: string;
  icon: LucideIcon;
  delay?: number;
}

const TeamCard = ({ name, role, responsibility, icon: Icon, delay = 0 }: TeamCardProps) => {
  return (
    <div
      className="group relative bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 animate-slide-up"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Avatar/Icon */}
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-8 h-8 text-primary" />
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-foreground text-center mb-1">{name}</h3>

      {/* Role */}
      <p className="text-primary text-sm font-medium text-center mb-3">{role}</p>

      {/* Responsibility */}
      <p className="text-muted-foreground text-sm text-center leading-relaxed">
        {responsibility}
      </p>

      {/* Hover Gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

export default TeamCard;
