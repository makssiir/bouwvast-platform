export function Logo({ white }: { white?: boolean }) {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Green rounded icon squircle */}
      <div 
        className="w-10 h-10 rounded-[12px] flex items-center justify-center text-white shadow-xs shrink-0"
        style={{ 
          background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
        }}
      >
        <svg 
          width="22" 
          height="22" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M3 10.5L12 3l9 7.5v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20.5v-10z" />
          <path d="M9.5 22v-6.5a1.5 1.5 0 0 1 1.5-1.5h2a1.5 1.5 0 0 1 1.5 1.5V22" />
        </svg>
      </div>

      {/* Bold Wordmark: BOUW (dark/white) + VAST (green) */}
      <span 
        className="font-extrabold text-2xl tracking-tight leading-none"
        style={{ 
          fontFamily: "var(--font-display)", 
          color: white ? "#ffffff" : "#0f172a" 
        }}
      >
        BOUW<span style={{ color: "#16a34a" }}>VAST</span>
      </span>
    </div>
  );
}
