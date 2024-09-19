import { cn } from "@/lib/utils";

export function CircularProgress({
  percentage,
  className,
  warningWordLeft,
  limitWordLeft,
}: {
  percentage: number;
  className: string;
  warningWordLeft: number;
  limitWordLeft: number;
}) {
  const circumference = 2 * Math.PI * 18; // 18 is the radius of the circle
  const isOverLimit = percentage > 100;
  const isWarningLimit = percentage > 80 && percentage < 100;

  const strokeDashoffset =
    circumference - (Math.min(percentage, 100) / 100) * circumference;

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
    >
      <svg className="w-8 h-8" viewBox="0 0 40 40" aria-hidden="true">
        <circle
          className="text-gray-200"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r="18"
          cx="20"
          cy="20"
        />
        <circle
          className={cn(
            isWarningLimit
              ? "text-yellow-500"
              : isOverLimit
                ? "text-red-500"
                : "text-primary"
          )}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="18"
          cx="20"
          cy="20"
        />
      </svg>
      <span
        className={cn(
          "absolute text-xs tabular-nums font-medium",
          isOverLimit ? "text-red-500" : "text-primary"
        )}
      >
        {isOverLimit ? "-" : ""}
        {isOverLimit
          ? Math.abs(Math.round(limitWordLeft))
          : isWarningLimit && Math.abs(Math.round(warningWordLeft))}
      </span>
      <span className="sr-only tabular-nums">
        {isOverLimit
          ? `Exceeded by ${Math.round(warningWordLeft)}%`
          : `${Math.round(percentage)}% complete`}
      </span>
    </div>
  );
}
