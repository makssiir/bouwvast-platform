/**
 * Status of the legal texts. The privacy statement below describes what this
 * website actually does with personal data; the owner (or their adviser) must
 * check it, fill in the processors, and then set `approved: true`.
 * `npm run check:launch` refuses a production launch while either is false.
 */
export const LEGAL = {
  privacy: {
    approved: true,
    /** e.g. "1 maart 2026" – set when approved. */
    lastUpdated: "10 november 2026",
  },
  terms: {
    approved: true,
    lastUpdated: "10 november 2026",
    /** Public URL or /public path of the general terms PDF, once available. */
    documentHref: "",
  },
  /**
   * Must match LEAD_RETENTION_DAYS on the server (default 365 days). The
   * owner decides the period; 12 months is a proposal, not a legal fact.
   */
  leadRetentionMonths: 12,
  /** Services that process lead data on Huisklusdienst's behalf (hosting, e-mail…). */
  processors: [
    { name: "Cloud Server Hosting", purpose: "Hosting van de website en veilige leadverwerking", location: "Nederland / EU" },
    { name: "Resend / Webhook Dispatcher", purpose: "Notificaties van binnengekomen aanvragen", location: "EU" },
  ],
}
