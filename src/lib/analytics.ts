export type AnalyticsEvent = "form_started" | "form_submitted" | "language_changed" | "phone_clicked" | "email_clicked";

export function track(_event: AnalyticsEvent, _props: Record<string, string | undefined> = {}): void {
  // Single integration boundary for the analytics provider selected at launch.
}
