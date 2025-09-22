const API = 'http://localhost:3000/api';
const box = document.getElementById('detail');

function qs(name){ return new URLSearchParams(window.location.search).get(name); }
function formatAUD(n){ return Number(n).toLocaleString('en-AU',{style:'currency',currency:'AUD'}) }
function dateLabel(dt){ return new Date(dt).toLocaleString() }

async function load() {
  const id = qs('id') || 1;
  const res = await fetch(`${API}/events/${id}`);
  if (!res.ok){ box.innerHTML = `<div class="p">Event not found.</div>`; return; }
  const e = await res.json();
  const pct = e.goal ? Math.min(100, Math.round((e.progress/e.goal)*100)) : 0;

  box.innerHTML = `
    <img src="${e.image_url || 'https://picsum.photos/seed/fallback/800/400'}" alt="">
    <div class="p">
      <div class="badge">${e.category}</div>
      <h2>${e.name}</h2>
      <p class="note">${e.location} • ${dateLabel(e.event_date)}</p>
      <p>${e.description || ''}</p>
      <div class="kpi"><b>Ticket:</b>&nbsp; ${e.price>0?formatAUD(e.price):'Free'}</div>
      <div style="margin:8px 0">
        <small>Goal ${e.goal} | Progress ${e.progress} (${pct}%)</small>
        <div class="progress"><div style="width:${pct}%"></div></div>
      </div>
      <button class="btn" onclick="alert('This feature is currently under construction.')">Register</button>
    </div>
  `;
}
load();
