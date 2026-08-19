import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

export default function Button({
  children,
  variant = "primary",
  className = "",
  icon,
  type = "button",
  onClick,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 border font-sans text-[15px] font-semibold px-5 py-3.5 transition-colors";
  const variants: Record<Variant, string> = {
    primary: "bg-lime border-ink text-ink hover:bg-lime-dark",
    secondary: "bg-transparent border-ink text-ink hover:bg-ink hover:text-canvas",
    ghost: "border-transparent text-ink hover:opacity-60 px-0 py-0",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
      {icon}
    </button>
  );
}
