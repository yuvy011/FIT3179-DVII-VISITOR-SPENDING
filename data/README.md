# Dataset Documentation & Provenance

Cleaned official data and transparent derivations for **Follow Australia’s Travel Dollar — Visitor Spending in Australia**, Monash FIT3179.

No spending observation is invented. CSV copies are for inspection and are not loaded by the browser. Display spans and waffle cells are encodings of published aggregates, not individual tourists or transactions. Years are annual periods to March; historical amounts are nominal Australian dollars.

## File inventory

Sizes use decimal KB (1000 bytes).

| Files | Format | Primary source | Size | Purpose |
|---|---|---|---|---|
| `international-states.json` / `international-states.csv` | json / csv | TRA IVS 2026 Table 3 | 4.6 KB / 2.1 KB | Eight states: spending, nights and derived nightly ratios; Figures 8 and 12. |
| `domestic-categories.json` / `domestic-categories.csv` | json / csv | TRA DoTS 2026 Table 4b | 1.4 KB / 0.6 KB | Seven exclusive residents’ expense groups; Figure 1. |
| `category-history.json` / `category-history.csv` | json / csv | TRA IVS 2024–2026 Table 8 | 5.2 KB / 2.3 KB | 21 category/year estimates, shares and indices; Figures 10 and 11 derivations. |
| `category-share-endpoints.json` / `category-share-endpoints.csv` | json / csv | Derived from category history | 5.7 KB / 2.5 KB | 14 observed 2024/2026 shares, pp changes and separate label positions; Figure 11. |
| `budget-tree.json` | json | Derived from IVS 2026 Table 8 | 1.1 KB | Seven latest category amounts plus hierarchy root; Figure 2. |
| `purpose-categories.json` / `purpose-categories.csv` | json / csv | TRA IVS 2026 Table 7 | 8.9 KB / 3.7 KB | 35 original purpose/category cells and source references; Figure 4 derivation. |
| `purpose-mosaic.json` / `purpose-mosaic.csv` | json / csv | Derived from IVS Table 7 | 11.9 KB / 5.7 KB | 20 retained observed cells for five categories plus derived spans and selected-category shares; Figure 4. |
| `market-categories.json` / `market-categories.csv` | json / csv | TRA IVS 2026 Table 8 | 6.7 KB / 2.8 KB | 35 home-country/category amounts and shares; Figure 7. |
| `domestic-regions.json` / `domestic-regions.csv` | json / csv | TEQ DoTS March 2026 regional overnight table | 4.4 KB / 2.5 KB | 11 regions with totals, nights, nightly ratios and boundary-derived anchors; Figure 9. |
| `leisure-waffle.json` / `leisure-waffle.csv` | json / csv | Derived from IVS Table 7 | 20.1 KB / 8.3 KB | 100 display cells representing the rounded holiday experience share; Figure 5. |
| `nightly-change.json` / `nightly-change.csv` | json / csv | Derived from IVS 2026 Table 3 | 1.1 KB / 0.5 KB | Eight current-minus-previous nightly spending differences; Figure 12. |
| `market-flows.json` / `market-flows.csv` | json / csv | TRA IVS 2026 Table 1 | 3.1 KB / 1.7 KB | Five residence groups’ trips, in-Australia spending and per-trip ratios; Figure 6. |
| `spending-scope.json` / `spending-scope.csv` | json / csv | TRA IVS 2026 Table 1 O31/K31 | 0.7 KB / 0.4 KB | Two published totals and their difference arranged as three waterfall bars; Figure 3. |
| `australia-states.geojson` | geojson | ABS ASGS 2021 / TRA IVS | 51.4 KB | Simplified official state polygons with joined spending attributes; Figure 8. |
| `queensland-tourism-regions.geojson` | geojson | TRA 2026 tourism-region boundaries | 179.1 KB | 11 region polygons for the Queensland overview and southeast inset; Figure 9. |
| `market-flows.geojson` | geojson | TRA IVS 2026 / Natural Earth anchors | 5.0 KB | Five schematic residence-to-Australia connections, not flight routes; Figure 6. |
| `world-110m.topojson` | topojson | Natural Earth via World Atlas | 107.8 KB | Compact global country geometry for Figure 6. |

## Sources and attribution

1. **Tourism Research Australia — International Visitor Survey (IVS)**: [March 2026 results](https://www.tra.gov.au/en/tourism-statistics/international-tourism-results/international-tourism-results-march-2026), corresponding March 2024 and revised March 2025 workbooks. Tables 1 (trips/scope totals), 3 (state spending/nights), 7 (purpose/category) and 8 (country/category and annual totals). Exact workbook URLs and cells are in DATA_NOTES.md.
2. **Tourism Research Australia — Domestic Tourism Statistics (DoTS)**: [March 2026](https://www.tra.gov.au/en/tourism-statistics/domestic-tourism-statistics-results/dots-march-2026), Table 4b annual overnight expenditure. It replaces NVS from January 2025; no unadjusted pre-COVID cross-survey growth is inferred.
3. **Tourism and Events Queensland (TEQ)**: [Domestic visitation](https://teq.queensland.com/domestic-visitation.html), March 2026 `regOvernight` table. Recalculate spending/night from published regional totals and nights.
4. **ABS**: [ASGS 2021 state boundaries](https://geo.abs.gov.au/arcgis/rest/services/ASGS2021/STE/FeatureServer), simplified for Figure 8. [ABS copyright and licence](https://www.abs.gov.au/website-privacy-copyright-and-disclaimer).
5. **TRA tourism-region geography**: [2026 region maps and shapefiles](https://www.tra.gov.au/en/profiles/tourism-regions-maps). Southern Great Barrier Reef merges Bundaberg, Gladstone and Capricorn Coast as in the TEQ grouping. Boundary processing is documented in DATA_NOTES.md.
6. **Natural Earth / World Atlas**: [World Atlas](https://github.com/topojson/world-atlas), countries-110m. Natural Earth geographic data are [public domain](https://www.naturalearthdata.com/about/terms-of-use/). World Atlas packaging licence accompanies the project.

Source rights remain with their respective publishers; statistical and geographic sources are credited separately. This project’s derived extracts are attributed transformations, not claims of ownership over the original estimates.

## Cleaning, formulas and ethical considerations

- Keep source estimates at full retained precision; round labels only. Missing or suppressed cells are not turned into zero.
- Preserve the international source’s combined food/drink/accommodation group. Do not infer region-level category spending or country-to-state flows from separate marginal tables.
- A$b = A$m / 1000. A$ per night = A$m / nights in thousands × 1000. Calculate ratios of totals, not a mean of state averages.
- Category share uses the matching market/purpose/year total. Growth = current category amount / its 2024 amount − 1. Share change in percentage points = (new share − old share) × 100.
- Marimekko width is retained purpose / all retained spending; height is category / retained purpose spending. The product is the observed joint spending share. Its layout spans are not extra data observations.
- The scope waterfall’s middle bar is total trip spending minus spending in Australia. It is not another spending category or an inferred country split.
- Official Queensland geometry is simplified using Australian Albers with topology preservation and converted to WGS84; representative points are inside original region boundaries. Every region is shown once in the overview/inset, with common size/colour domains.
- The domestic item sum is A$65.064m below the published Table 4b total, approximately 0.0605%. Retain and disclose that source discrepancy; do not allocate it to Other. The headline total stays published; the item chart reproduces item estimates.
- Only aggregate survey/geographic data are used, with no personal information. Survey estimates are not individual tourist budgets, causal evidence or significance tests. Nominal changes do not isolate inflation.

## Performance measurements

The data extracts total **451.3 KB uncompressed**, including CSV inspection copies. The measured initial browser download is approximately **1.43 MB**, including the twelve specifications, chart libraries, local fonts and chart data. `index.html` is approximately **36.6 KB**. The figures load locally without external CDN requests. File sizes are measurements, not a guarantee of a particular loading time.

Figure 4 excludes Entertainment and Other spending only. Its shares and widths use the five retained categories, with original dollars unchanged. `full_budget_share` preserves the original table share. Other figures retain their existing category coverage.


## Figure 09 replacement: ABS before/after arrivals
See [ABS source and calculations](ABS_ARRIVALS_SOURCE.md). Data: `abs-arrivals-before-after.json` and `.csv`. Two annual observations per country, transcribed from ABS Table 1.7; arrow geometry is derived presentation metadata.


## Verified Tasmania replacement (21 October 2026)
Figure 12 now uses `tasmania-international-areas.json` and `tasmania-outline.geojson`; the old Queensland files are retained only as unused historical inputs. See `VERIFIED_NIGHTLY_SPENDING.md` for exact source cells and arithmetic. The state ranking uses Table 3; the close-up uses Table 5 and Table 6 from the same IVS workbook and period.
