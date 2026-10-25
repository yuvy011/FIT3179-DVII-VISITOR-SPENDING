# Verification: international nightly spending

Checked 21 October 2026 against the downloaded official TRA workbook:
https://www.tra.gov.au/content/dam/austrade-assets/global/wip/tra/documents/international-visitor-survey-results-march-quarter-2026.xlsx

Year ending March 2026; international visitors aged 15+. Formula: spending ($m) / nights (thousands) × 1,000.

| State | Spending (A$m) | Nights (thousand) | A$/night | Cells |
|---|---:|---:|---:|---|
| Tasmania | 758.615527 | 5090.323036 | 149.03 | Table 3!K11/G11 × 1000 |
| New South Wales | 15225.484010 | 107820.186388 | 141.21 | Table 3!K6/G6 × 1000 |
| Queensland | 8155.149581 | 60379.679577 | 135.06 | Table 3!K8/G8 × 1000 |
| Northern Territory | 569.776332 | 4467.147450 | 127.55 | Table 3!K12/G12 × 1000 |
| Victoria | 10527.723275 | 83258.895786 | 126.45 | Table 3!K7/G7 × 1000 |
| South Australia | 1741.540211 | 14716.794259 | 118.34 | Table 3!K9/G9 × 1000 |
| Australian Capital Territory | 628.809606 | 5969.319085 | 105.34 | Table 3!K13/G13 × 1000 |
| Western Australia | 3290.267868 | 39726.784672 | 82.82 | Table 3!K10/G10 × 1000 |

Tasmania is the highest point estimate among the eight states/territories, not among all Australian tourism regions. All existing Figure 11 inputs match the official cells. No correction to the source numbers was required.

## Tasmania close-up

Table 5 F27/G27 and F28/G28 support two aggregates. Table 6 G20/H20 confirms Hobart corresponds to Hobart and the South. No finer spending allocation is invented. Both areas reconcile to Table 3 Tasmania spending and nights. Circles encode total expenditure, using the same solid orange and a zero-based area scale. Regional TAS is shown at a schematic northern anchor, not presented as a measured local point.

- Hobart and the South: A$563.403334m, 2781.220739 thousand nights; A$202.57/night.

- Rest of Tasmania (combined): A$195.212193m, 2309.102297 thousand nights; A$84.54/night.

The unmodified downloaded workbook is included at `source/tra-ivs-march-2026.xlsx` for audit.
