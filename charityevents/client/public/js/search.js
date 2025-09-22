const API = 'http://localhost:3000/api';

const dateEl = document.getElementById('date');
const locEl = document.getElementById('location');
const catEl = document.getElementById('category');
const msg = document.getElementById('msg');
const results = document.getElementById('results');

function formatAUD(n){ return Number(n).toLocaleString('en-AU',{style:'currency',currency:'AUD'}) }
function dateLabel(dt){ return new Date(dt).toLocaleString() }

async function loadCategories() {
  const res = await fetch(`${API}/categories`);
  const cats = await res.json();
  catEl.innerHTML = `<option value="">All Categories</option>` +
    cats.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}

async function search() {
  const params = new URLSearchParams();
  if (dateEl.value) params.append('date', dateEl.value);
  if (locEl.value.trim()) params.append('location', locEl.value.trim());
  if (catEl.value) params.append('category', catEl.value);

  msg.textContent = '';
  results.innerHTML = '';

  const res = await fetch(`${API}/events/search/filter?` + params.toString());
  if (!res.ok) { msg.textContent = 'Error searching events.'; return; }
  const data = await res.json();

  if (!data.length) { msg.textContent = 'No events found. Try different filters.'; return; }

  results.innerHTML = data.map(e => `
    <div class="card">
      <img src="${e.image_url || 'https://picsum.photos/seed/fallback/800/400'}" alt="">
      <div class="p">
        <div class="badge">${e.category}</div>
        <h3>${e.name}</h3>
        <p class="note">${e.location} • ${dateLabel(e.event_date)} • ${e.price>0?formatAUD(e.price):'Free'}</p>
        <button class="btn" onclick="window.location='event.html?id=${e.id}'">View Details</button>
      </div>
    </div>
  `).join('');
}

document.getElementById('btnSearch').addEventListener('click', search);
document.getElementById('btnClear').addEventListener('click', () => {
  dateEl.value = '';
  locEl.value = '';
  catEl.value = '';
  msg.textContent = '';
  results.innerHTML = '';
});

loadCategories();
