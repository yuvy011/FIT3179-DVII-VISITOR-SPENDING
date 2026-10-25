// The HTML order defines the reading order. Each chart loads one readable JSON file.
const chartIDs = [...document.querySelectorAll('.chart')].map(element => element.id);
const chartViews = {};
// Heights include chart axes/legends. The white card then follows the SVG naturally.
const chartHeights = {
  chart_tsa_split: [260, 240],
  chart_education_spending: [370, 370],
  chart_market_value: [260, 150],
  chart_tsa_history: [385, 355],
  chart_domestic_categories: [380, 390],
  chart_budget_treemap: [410, 390],
  chart_spending_scope: [330, 330],
  chart_purpose_mix: [520, 520],
  chart_education_waffle: [330, 300],
  map_visitor_origins: [610, 610],
  chart_market_rank: [450, 430],
  map_international_nightly: [480, 400],
  chart_category_growth: [460, 480],
  chart_category_share_slope: [460, 460],
  chart_nightly_lollipop: [400, 400]
};
async function drawChart(id) {
  const element = document.getElementById(id);
  try {
    const response = await fetch('json/' + id + '.json');
    if (!response.ok) throw new Error('Cannot load ' + id);
    const spec = await response.json();
    element.style.width = '100%';
    const availableWidth = id === 'chart_education_waffle' ? element.clientWidth : element.closest('.chart-stage').clientWidth;
    const mobile = availableWidth < 600;
    // The two location maps keep their desktop design on a phone: the stage scrolls sideways instead.
    const scrollMap = mobile && id === 'map_queensland_symbols';
    const mapW = scrollMap ? 720 : availableWidth;
    if (scrollMap) {
      const stage = element.closest('.chart-stage');
      stage.style.overflowX = 'auto';
      stage.style.justifyContent = 'flex-start';
      element.classList.add('scroll-map');
      setTimeout(() => { stage.scrollLeft = (stage.scrollWidth - stage.clientWidth) / 2; }, 700);
      element.style.width = mapW + 'px';
      element.style.flex = '0 0 ' + mapW + 'px';
      if (!stage.previousElementSibling || !stage.previousElementSibling.classList.contains('scroll-hint')) {
        stage.insertAdjacentHTML('beforebegin', '<p class="scroll-hint">Swipe or scroll sideways to view the complete map.</p>');
      }
    }
    if (id === 'map_visitor_origins') {
      spec.width = availableWidth;
      spec.height = 570;
      element.style.width = spec.width + 'px';
      element.style.flex = '0 0 ' + spec.width + 'px';
      element.classList.add('scroll-map');
      const stage = element.closest('.chart-stage');
      stage.style.overflowX = 'auto';
      stage.style.justifyContent = 'flex-start';
      spec.autosize = {type: 'fit', contains: 'padding'};
    } else if (id === 'map_queensland_symbols') {
      spec.width = mapW;
      spec.height = 540;
      spec.autosize = {type: 'fit', contains: 'padding'};
    } else if (id === 'chart_market_value') {
      spec.width = availableWidth;
      spec.height = 400;
      spec.layer[0].encoding.color.legend.columns = mobile ? 2 : 3;
      if (mobile) { spec.encoding.x.axis.labelAngle = -40; spec.layer[1].mark.fontSize = 10; }
      spec.autosize = {type: 'fit', contains: 'padding'};
    } else if (id === 'chart_education_waffle') {
      // Square cells: the grid is a fixed square, the legend sits beside it (below on a phone).
      const cell = mobile ? Math.min(availableWidth - 24, 300) : 320;
      spec.width = cell;
      spec.height = cell;
      if (spec.encoding.color.legend) spec.encoding.color.legend.orient = mobile ? 'bottom' : 'right';
      if (spec.encoding.color.legend) spec.encoding.color.legend.columns = 1;
      spec.autosize = {type: 'pad', contains: 'padding'};
    } else {
      spec.width = mapW;
      spec.height = chartHeights[id][mobile && !scrollMap ? 1 : 0];
      if (id === 'chart_domestic_categories') {
        spec.width = Math.max(availableWidth, 600);
        element.style.width = spec.width + 'px';
        if (availableWidth < 900) {
          spec.transform[0].calculate = "format(datum.spend_b,'.2f')";
          spec.layer[1].encoding.x = {datum: 0, type: 'quantitative'};
          spec.layer[1].mark.align = 'left';
          spec.layer[1].mark.dx = 5;
        }
      }
      if (id === 'chart_purpose_mix') {
        spec.width = Math.max(availableWidth, 760);
        element.style.width = spec.width + 'px';
      }
      const hint = element.closest('figure').querySelector('.scroll-hint');
      if (hint) hint.hidden = spec.width <= availableWidth;
      if (id === 'chart_market_rank') {
        spec.encoding.x.axis.labelFontSize = mobile ? 9 : 13;
        spec.encoding.x.axis.labelLimit = mobile ? 62 : 200;
        if (mobile) spec.encoding.x.axis.labelExpr = "datum.value == 'Food, drink & stay' ? 'Food/stay' : datum.value == 'Entertainment' ? 'Entert.' : datum.value";
      }
      if ((id === 'chart_category_share_slope' || id === 'chart_nightly_lollipop') && mobile) {
        spec.encoding.color && spec.encoding.color.legend && (spec.encoding.color.legend.columns = 2);
      }
      if (id === 'map_international_nightly') {
        spec.encoding && null;
        spec.layer[0].encoding.color.legend.columns = mobile ? 2 : 3;
        if (mobile) { spec.projection.scale = 290; spec.projection.center = [140, -28]; }
      }
      if (id === 'chart_category_share_slope' && mobile) {
        spec.encoding.x.scale.domain = [-0.85, 1.5];
      }
      if (id === 'chart_category_growth' && mobile) {
        spec.encoding.y.axis.labelLimit = 100;
        spec.encoding.y.axis.labelFontSize = 10;
        spec.encoding.x.axis.values = [0, 50, 100];
        spec.encoding.x.title = 'Change vs 2024 (nominal)';
        spec.layer[1].mark.fontSize = 10;
      }
      if (id === 'chart_spending_scope' && mobile) {
        spec.layer[0].mark.size = 52;
        spec.layer[2].mark.fontSize = 11;
        spec.encoding.x.axis.labelFontSize = 10;
      }
      spec.autosize = {type: 'fit', contains: 'padding'};
    }
    if (chartViews[id]) chartViews[id].finalize();
    const result = await vegaEmbed(element, spec, {actions: false, renderer: 'svg'});
    chartViews[id] = result.view;
  } catch (error) {
    element.textContent = 'Chart unavailable.';
    console.error(error);
  }
}
async function drawAll() {
  document.body.dataset.rendered = 'false';
  await Promise.all(chartIDs.map(drawChart));
  document.body.dataset.rendered = 'true';
  updateChapter();
}
drawAll();
// Width changes need a refit; mobile address-bar height changes do not.
let resizeTimer;
let lastWidth = window.innerWidth;
window.addEventListener('resize', () => {
  if (window.innerWidth === lastWidth) return;
  lastWidth = window.innerWidth;
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(drawAll, 250);
});
// Keep the chapter buttons at the top and show the reader's current chapter.
const chapters = [...document.querySelectorAll('.story-chapter')];
const chapterLinks = [...document.querySelectorAll('.section-nav a')];
function updateChapter() {
  let current = chapters[0].id;
  for (const chapter of chapters) {
    if (chapter.getBoundingClientRect().top <= 140) current = chapter.id;
  }
  for (const link of chapterLinks) {
    if (link.getAttribute('href') === '#' + current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
window.addEventListener('scroll', updateChapter, {passive: true});
updateChapter();
