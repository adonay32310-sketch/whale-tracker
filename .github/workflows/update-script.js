const fs = require('fs');

console.log('Spouštím aktualizaci whale dat...');

// Zatím placeholder - zde můžeme přidat scraping nebo RSS
// Prozatím jen načte aktuální soubor a přidá dummy záznam (pro test)

let data = [];
try {
  data = JSON.parse(fs.readFileSync('whale-data.json', 'utf8'));
} catch (e) {
  console.log('Soubor nenalezen, vytvářím nový.');
}

// Příklad přidání nové transakce (nahraď reálným zdrojem)
const newEntry = {
  "time": new Date().toLocaleDateString('cs-CZ') + " " + new Date().toLocaleTimeString('cs-CZ', {hour: '2-digit', minute: '2-digit'}),
  "btc": Math.floor(Math.random() * 800) + 300,
  "usd": Math.floor(Math.random() * 50) + "M",
  "price": "64200",
  "from": "Binance",
  "to": "unknown",
  "interp": "Potenciální nákup"
};

data.push(newEntry);

fs.writeFileSync('whale-data.json', JSON.stringify(data, null, 2));
console.log('Přidána nová transakce.');
