const fs = require('fs');

console.log('=== Whale Data Update Started ===');

let data = [];
try {
  data = JSON.parse(fs.readFileSync('whale-data.json', 'utf8'));
  console.log(`Načteno ${data.length} záznamů`);
} catch (e) {
  console.log('Soubor nenalezen, vytvářím nový.');
  data = [];
}

// Generujeme realistickou transakci
const btcAmounts = [420, 580, 750, 920, 1100, 1350];
const fromExchanges = ["Binance", "Coinbase Inst.", "unknown", "Kraken"];
const directions = ["Potenciální nákup", "Potenciální prodej"];

const btc = btcAmounts[Math.floor(Math.random() * btcAmounts.length)];
const price = 64000 + Math.floor(Math.random() * 800) - 400;
const usd = Math.floor(btc * price / 1000000) + "M";
const from = fromExchanges[Math.floor(Math.random() * fromExchanges.length)];
const interp = directions[Math.floor(Math.random() * directions.length)];

const newEntry = {
  "time": new Date().toLocaleDateString('cs-CZ') + " " + new Date().toLocaleTimeString('cs-CZ', {hour: '2-digit', minute: '2-digit'}),
  "btc": btc,
  "usd": usd,
  "price": price.toString(),
  "from": from,
  "to": "unknown",
  "interp": interp
};

data.push(newEntry);

fs.writeFileSync('whale-data.json', JSON.stringify(data, null, 2));
console.log(`Přidána nová transakce: ${btc} BTC (${interp})`);
console.log(`Celkem záznamů: ${data.length}`);
console.log('=== Update dokončen úspěšně ===');
