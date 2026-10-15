/**
 * Huisklusdienst logo: a pine-green tile with a roof over a brick bond
 * (the house and the work on it), followed by the wordmark. Kept in sync
 * with public/favicon.svg.
 */
export function LogoMark({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={`shrink-0 ${className}`}
    >
      <rect width="40" height="40" rx="11" fill="#1e6b3e" />
      <path
        d="M9 19.5 20 10.5l11 9"
        fill="none"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g fill="#fff">
        <rect x="11.5" y="22" width="7.6" height="4.6" rx="1.2" />
        <rect x="20.9" y="22" width="7.6" height="4.6" rx="1.2" />
        <rect x="11.5" y="28.4" width="3.2" height="4.6" rx="1.2" opacity="0.72" />
        <rect x="16.4" y="28.4" width="7.2" height="4.6" rx="1.2" />
        <rect x="25.3" y="28.4" width="3.2" height="4.6" rx="1.2" opacity="0.72" />
      </g>
    </svg>
  )
}

/**
 * `compact` (header) scales the mark and wordmark down on narrow phones so the
 * logo, language switch and menu button fit next to each other from 320px.
 */
export function Logo({ white, compact }: { white?: boolean; compact?: boolean }) {
  return (
    <span className={`flex items-center select-none ${compact ? "gap-2 min-[360px]:gap-2.5" : "gap-2.5"}`}>
      <LogoMark className={compact ? "h-8 w-8 min-[360px]:h-9 min-[360px]:w-9 min-[480px]:h-10 min-[480px]:w-10" : ""} />
      <span
        className={`font-display font-extrabold leading-none tracking-[-0.01em] ${
          compact
            ? "text-[1.02rem] min-[360px]:text-[1.15rem] min-[480px]:text-[1.3rem] sm:text-[1.4rem]"
            : "text-[1.3rem] sm:text-[1.4rem]"
        }`}
        style={{ color: white ? "#ffffff" : "var(--color-ink)" }}
      >
        Huisklus<span style={{ color: white ? "var(--color-pine-300)" : "var(--color-pine-700)" }}>dienst</span>
      </span>
    </span>
  )
}
