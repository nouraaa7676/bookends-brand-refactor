import { Recommendation } from "@/lib/recommend";

interface RecommendationCardProps {
  rec: Recommendation;
}

const qualityColor = (quality: string) => {
  switch (quality?.toLowerCase()) {
    case "like new":
      return "bg-primary/10 text-primary";
    case "good":
      return "bg-accent text-accent-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const RecommendationCard = ({ rec }: RecommendationCardProps) => {
  const matchPercent = rec.similarity < 1 ? Math.round(rec.similarity * 100) : 85;

  return (
    <div className="rounded-xl border-2 border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <h4 className="mb-1 font-heading text-lg font-semibold text-secondary">
        📚 {rec.title}
      </h4>
      <p className="mb-2 text-sm text-muted-foreground">✍️ by {rec.author}</p>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
          AED {rec.price}
        </span>
        <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${qualityColor(rec.quality)}`}>
          {rec.quality}
        </span>
        <span className="rounded-full bg-muted px-3 py-0.5 text-xs text-muted-foreground">
          {rec.genre}
        </span>
        <span className="ml-auto text-xs text-muted-foreground">
          Match: {matchPercent}%
        </span>
      </div>
    </div>
  );
};

export default RecommendationCard;
