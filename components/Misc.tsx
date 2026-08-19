import { ReactNode } from "react";

export function AccentBanner({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-l-4 border-lime bg-card border border-border ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  sub?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-muted">
        {icon}
        <span className="text-[12px]">{label}</span>
      </div>
      <span className="font-display text-[20px] font-500 text-ink">{value}</span>
      {sub}
    </div>
  );
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[12px] font-medium tracking-label text-brand">
      {children}
    </span>
  );
}
