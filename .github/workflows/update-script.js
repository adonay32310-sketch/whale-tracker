const fs = require('fs');

console.log('Spouštím aktualizaci whale dat...');

let data = [];
try {
  data = JSON.parse(fs.readFileSync('whale-data.json', 'utf8'));
} catch (e) {
  console.log('Soubor nenalezen nebo poškozen, vytvářím nový.');
  data = [];
}

// Přidáme placeholder transakci (pro testování)
const newEntry = {
  "time": new Date().toLocaleDateString('cs-CZ') + " " + new Date().toLocaleTimeString('cs-CZ', {hour: '2-digit', minute: '2-digit'}),
  "btc": Math.floor(Math.random() * 900) + 400,
  "usd": (Math.floor(Math.random() * 60) + 25) + "M",
  "price": "64200",
  "from": "Binance",
  "to": "unknown",
  "interp": "Potenciální nákup"
};

data.push(newEntry);

fs.writeFileSync('whale-data.json', JSON.stringify(data, null, 2));
console.log(`Přidána nová transakce. Celkem záznamů: ${data.length}`);
