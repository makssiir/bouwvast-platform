import Icon from "./Icon"

/** "Read more"-style label with an arrow that nudges on hover of the parent link. */
export default function More({
  children,
  className = "",
  hidden,
}: {
  children: React.ReactNode
  className?: string
  /** Set when the surrounding link already has this text as its name. */
  hidden?: boolean
}) {
  return (
    <span className={`more ${className}`} aria-hidden={hidden || undefined}>
      {children}
      <span className="btn-arrow" aria-hidden="true">
        <Icon name="arrow-right" size={16} strokeWidth={2} />
      </span>
    </span>
  )
}
