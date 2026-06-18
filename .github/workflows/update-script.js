const fs = require('fs');

console.log('=== Whale Data Update Started ===');

let data = [];
try {
  data = JSON.parse(fs.readFileSync('whale-data.json', 'utf8'));
  console.log(`Načteno ${data.length} záznamů`);
} catch (e) {
  console.log('Soubor nenalezen, vytvářím nový prázdný.');
  data = [];
}

// Přidáme jeden záznam
data.push({
  "time": new Date().toLocaleDateString('cs-CZ') + " " + new Date().toLocaleTimeString('cs-CZ', {hour: '2-digit', minute: '2-digit'}),
  "btc": 650,
  "usd": "41.6M",
  "price": "64200",
  "from": "Binance",
  "to": "unknown",
  "interp": "Potenciální nákup"
});

fs.writeFileSync('whale-data.json', JSON.stringify(data, null, 2));
console.log(`Přidána nová transakce. Celkem: ${data.length} záznamů`);

console.log('=== Update dokončen úspěšně ===');
process.exit(0);  // Zajistí exit code 0
