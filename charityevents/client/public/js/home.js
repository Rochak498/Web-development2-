const API = 'http://localhost:3000/api';
const grid = document.getElementById('events');

function formatAUD(n){ return Number(n).toLocaleString('en-AU',{style:'currency',currency:'AUD'}) }
function dateLabel(dt){ return new Date(dt).toLocaleString() }

async function load() {
  const res = await fetch(`${API}/events`);
  const data = await res.json();
  const sorted = data.sort((a,b)=> new Date(a.event_date)-new Date(b.event_date));

  grid.innerHTML = sorted.map(e => `
    <div class="card">
      <img src="${e.image_url || 'https://picsum.photos/seed/fallback/800/400'}" alt="">
      <div class="p">
        <div class="badge">${e.category}</div>
        <h3>${e.name}</h3>
        <p class="note">${e.location} • ${dateLabel(e.event_date)} • ${e.price>0?formatAUD(e.price):'Free'}</p>
        <div class="kpi"><small>Progress ${e.progress}/${e.goal}</small></div>
        <div class="progress" style="margin:8px 0">
          <div style="width:${e.goal?Math.min(100, Math.round((e.progress/e.goal)*100)):0}%"></div>
        </div>
        <button class="btn" onclick="openDetails(${e.id})">View Details</button>
      </div>
    </div>
  `).join('');
}

function openDetails(id){ window.location.href = `event.html?id=${id}`; }
load();
