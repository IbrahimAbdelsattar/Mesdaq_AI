import { AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";

interface ResultCardProps {
  isFake: boolean;
  credibilityScore: number;
  explanation: string;
}

const ResultCard = ({ isFake, credibilityScore, explanation }: ResultCardProps) => {
  return (
    <div className="bg-card rounded-3xl border border-border p-8 shadow-lg">
      {/* Result Badge */}
      <div className="flex justify-center mb-8">
        <div
          className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg font-semibold ${
            isFake
              ? "bg-destructive/20 text-destructive border border-destructive/30"
              : "bg-success/20 text-success border border-success/30"
          }`}
        >
          {isFake ? (
            <>
              <AlertTriangle className="w-6 h-6" />
              Likely Fake News
            </>
          ) : (
            <>
              <CheckCircle2 className="w-6 h-6" />
              Likely Real News
            </>
          )}
        </div>
      </div>

      {/* Credibility Score */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-muted-foreground font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Credibility Score
          </span>
          <span className="text-2xl font-bold text-foreground">{credibilityScore}%</span>
        </div>
        <div className="h-4 bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              credibilityScore < 40
                ? "bg-gradient-to-r from-destructive to-orange-500"
                : credibilityScore < 70
                ? "bg-gradient-to-r from-warning to-yellow-400"
                : "bg-gradient-to-r from-success to-emerald-400"
            }`}
            style={{ width: `${credibilityScore}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Low Trust</span>
          <span>High Trust</span>
        </div>
      </div>

      {/* AI Explanation */}
      <div className="bg-secondary/30 rounded-2xl p-6 border border-border">
        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
          AI Analysis
        </h4>
        <p className="text-foreground leading-relaxed font-arabic text-right" dir="rtl">
          {explanation}
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
