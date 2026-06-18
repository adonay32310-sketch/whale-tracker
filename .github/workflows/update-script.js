const fs = require('fs');
const https = require('https');

console.log('Spouštím aktualizaci whale dat...');

let data = [];
try {
  data = JSON.parse(fs.readFileSync('whale-data.json', 'utf8'));
} catch (e) {
  console.log('Soubor nenalezen, vytvářím nový.');
  data = [];
}

// Zatím jednoduchý placeholder + možnost přidat RSS nebo scraping
// Zde můžeme později přidat reálné stahování (např. z Whale Alert RSS)

const newEntry = {
  "time": new Date().toLocaleDateString('cs-CZ') + " " + new Date().toLocaleTimeString('cs-CZ', {hour: '2-digit', minute: '2-digit'}),
  "btc": Math.floor(Math.random() * 1200) + 400,
  "usd": (Math.floor(Math.random() * 80) + 25) + "M",
  "price": "64200",
  "from": "Binance",
  "to": "unknown",
  "interp": "Potenciální nákup"
};

data.push(newEntry);

fs.writeFileSync('whale-data.json', JSON.stringify(data, null, 2));
console.log(`Přidána nová transakce. Celkem záznamů: ${data.length}`);
