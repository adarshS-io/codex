// CarbonTwin · Vanilla JS simulation (mirrors the React app's logic)
const HOTSPOTS = [
  { id:'silk',  name:'Silk Board',     source:'transport',  baseCO2:180, x:52, y:70 },
  { id:'peen',  name:'Peenya',         source:'industry',   baseCO2:220, x:30, y:30 },
  { id:'elec',  name:'Electronic City',source:'industry',   baseCO2:160, x:60, y:82 },
  { id:'whit',  name:'Whitefield',     source:'power',      baseCO2:140, x:78, y:45 },
  { id:'kora',  name:'Koramangala',    source:'residential',baseCO2: 90, x:55, y:60 },
  { id:'mgrd',  name:'MG Road',        source:'transport',  baseCO2:130, x:50, y:50 },
];
const COLOR = { transport:'#f59e0b', industry:'#ef4444', power:'#a855f7', residential:'#10b981' };

const state = { roadsideCapture:0, verticalGardens:0, biofilters:0, evAdoption:0 };

function reduction(source, iv){
  const r = ({
    transport:   0.0035*iv.roadsideCapture + 0.0010*iv.verticalGardens + 0.0055*iv.evAdoption,
    industry:    0.0060*iv.biofilters     + 0.0010*iv.verticalGardens + 0.0005*iv.roadsideCapture,
    power:       0.0050*iv.biofilters     + 0.0008*iv.verticalGardens,
    residential: 0.0035*iv.verticalGardens+ 0.0005*iv.roadsideCapture,
  })[source] || 0;
  return Math.min(r, 0.85);
}

function drawMap(){
  const svg = document.getElementById('map');
  const max = Math.max(...HOTSPOTS.map(h => h.baseCO2 * (1 - reduction(h.source, state))));
  svg.innerHTML = `
    <defs>
      <pattern id="g" width="5" height="5" patternUnits="userSpaceOnUse">
        <path d="M5 0 L0 0 0 5" fill="none" stroke="#1f2a44" stroke-width=".15"/>
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#g)"/>
    <path d="M18,28 C22,16 38,10 52,12 C66,14 80,18 86,30 C92,42 90,56 84,68
             C78,80 64,90 50,90 C34,90 20,82 14,68 C8,54 12,40 18,28 Z"
          fill="#121a2c" stroke="#10b981" stroke-opacity=".5" stroke-width=".4"/>
    <g stroke="#8a97b1" stroke-opacity=".4" stroke-width=".3" fill="none">
      <path d="M14,50 L86,50"/><path d="M50,12 L50,90"/>
      <ellipse cx="50" cy="50" rx="22" ry="18"/>
    </g>
    ${HOTSPOTS.map(h => {
      const co2 = h.baseCO2 * (1 - reduction(h.source, state));
      const r   = 4 + (co2/max)*8;
      const c   = COLOR[h.source];
      return `<circle cx="${h.x}" cy="${h.y}" r="${r}" fill="${c}" opacity=".35">
                <title>${h.name}: ${co2.toFixed(0)} t/day</title>
              </circle>
              <circle cx="${h.x}" cy="${h.y}" r="1.4" fill="${c}"/>`;
    }).join('')}
  `;
}

function drawBars(){
  const wrap = document.getElementById('bars');
  const rows = HOTSPOTS.map(h => {
    const r   = reduction(h.source, state);
    const eff = h.baseCO2 * (1 - r);
    return { name:h.name, pct:Math.round(r*100), eff };
  });
  wrap.innerHTML = rows.map(r =>
    `<div class="bar"><span>${r.name}</span>
       <span class="track"><span class="fill" style="width:${r.pct}%"></span></span>
       <span>${r.pct}% · ${r.eff.toFixed(0)}t</span></div>`).join('');
}

function recompute(){
  drawMap(); drawBars();
  const base = HOTSPOTS.reduce((s,h)=>s+h.baseCO2,0);
  const eff  = HOTSPOTS.reduce((s,h)=>s + h.baseCO2*(1-reduction(h.source,state)), 0);
  document.getElementById('base').textContent  = base.toFixed(0)+' t/day';
  document.getElementById('eff').textContent   = eff.toFixed(0)+' t/day';
  document.getElementById('saved').textContent = (base-eff).toFixed(0)+' t/day';
}

['roadsideCapture','verticalGardens','biofilters','evAdoption'].forEach((id,i) => {
  const el = document.getElementById(id);
  const out = document.getElementById('o'+(i+1));
  el.addEventListener('input', () => { state[id] = +el.value; out.textContent = el.value; recompute(); });
});

recompute();
