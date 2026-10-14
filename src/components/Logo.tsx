/**
 * Bouwvast logo: a pine-green tile with a roof over a brick bond
 * ("bouw" + "vast"), followed by the wordmark. Kept in sync with
 * public/favicon.svg.
 */
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className="shrink-0"
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

export function Logo({ white }: { white?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 select-none">
      <LogoMark />
      <span
        className="font-display text-[1.4rem] font-extrabold leading-none tracking-[0.01em]"
        style={{ color: white ? "#ffffff" : "var(--color-ink)" }}
      >
        BOUW<span style={{ color: white ? "var(--color-pine-300)" : "var(--color-pine-700)" }}>VAST</span>
      </span>
    </span>
  )
}
