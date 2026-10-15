/**
 * The place pages and service × place pages, which carry most of the local
 * copy (data/cityIntros.ts, data/localTraits.ts). Loaded as their own chunk
 * through lib/localPages.ts so other pages do not download that text.
 */
export { default as CityPage } from "./CityPage"
export { default as ServiceCityPage } from "./ServiceCityPage"
