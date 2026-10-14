/**
 * Status of the legal texts. The privacy statement below describes what this
 * website actually does with personal data; the owner (or their adviser) must
 * check it, fill in the processors, and then set `approved: true`.
 * `npm run check:launch` refuses a production launch while either is false.
 */
export const LEGAL = {
  privacy: {
    approved: false,
    /** e.g. "1 maart 2026" – set when approved. */
    lastUpdated: "",
  },
  terms: {
    approved: false,
    lastUpdated: "",
    /** Public URL or /public path of the general terms PDF, once available. */
    documentHref: "",
  },
  /**
   * Must match LEAD_RETENTION_DAYS on the server (default 365 days). The
   * owner decides the period; 12 months is a proposal, not a legal fact.
   */
  leadRetentionMonths: 12,
  /** Services that process lead data on Bouwvast's behalf (hosting, e-mail…). */
  processors: [] as { name: string; purpose: string; location: string }[],
}
