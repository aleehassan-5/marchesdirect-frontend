export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display font-600 uppercase tracking-tight text-[22px] leading-none ${className}`}
    >
      MARCHÉS<span className="text-lime-dark">/</span>DIRECT
    </span>
  );
}
