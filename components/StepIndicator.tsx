import { Check } from "lucide-react";

export type Step = {
  label: string;
  status: "done" | "active" | "upcoming";
};

export default function StepIndicator({ steps }: { steps: Step[] }) {
  return (
    <ol className="flex items-start px-5 py-6">
      {steps.map((step, i) => (
        <li key={step.label} className="flex flex-1 items-center last:flex-initial">
          <div className="flex flex-col items-center gap-2">
            <div
              className={[
                "flex h-10 w-10 items-center justify-center rounded-full border font-mono text-[13px] font-medium",
                step.status === "done"
                  ? "border-brand bg-brand text-lime"
                  : step.status === "active"
                  ? "border-brand bg-lime text-brand"
                  : "border-border bg-card text-muted",
              ].join(" ")}
            >
              {step.status === "done" ? (
                <Check size={16} strokeWidth={2.5} />
              ) : (
                String(i + 1).padStart(2, "0")
              )}
            </div>
            <span
              className={[
                "whitespace-nowrap text-[12px]",
                step.status === "upcoming" ? "text-muted" : "text-ink font-medium",
              ].join(" ")}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 ? (
            <div
              className={[
                "mx-2 mb-5 h-px flex-1",
                step.status === "done" ? "bg-brand" : "bg-border",
              ].join(" ")}
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
