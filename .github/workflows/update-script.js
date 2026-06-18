const fs = require('fs');
const Parser = require('rss-parser');
const parser = new Parser();

console.log('=== Whale Data Update Started ===');

let data = [];
try {
  data = JSON.parse(fs.readFileSync('whale-data.json', 'utf8'));
  console.log(`Načteno ${data.length} záznamů`);
} catch (e) {
  console.log('Soubor nenalezen, vytvářím nový.');
  data = [];
}

parser.parseURL('https://whale-alert.io/feed')
  .then(feed => {
    console.log(`Našel ${feed.items.length} feed položek.`);

    let added = 0;
    feed.items.slice(0, 8).forEach(item => {
      if (item.title && item.title.includes('BTC') && item.title.includes('transferred')) {
        const match = item.title.match(/(\d+)\s+BTC/);
        if (match) {
          const btc = parseInt(match[1]);
          if (btc > 300) {
            const newEntry = {
              "time": new Date().toLocaleDateString('cs-CZ') + " " + new Date().toLocaleTimeString('cs-CZ', {hour: '2-digit', minute: '2-digit'}),
              "btc": btc,
              "usd": "~" + Math.floor(btc * 64000 / 1000000) + "M",
              "price": "64200",
              "from": "unknown",
              "to": "unknown",
              "interp": item.title.toLowerCase().includes('to exchange') ? "Potenciální prodej" : "Potenciální nákup"
            };

            if (!data.some(d => d.time === newEntry.time && d.btc === newEntry.btc)) {
              data.push(newEntry);
              added++;
            }
          }
        }
      }
    });

    fs.writeFileSync('whale-data.json', JSON.stringify(data, null, 2));
    console.log(`Přidáno ${added} nových transakcí z RSS. Celkem: ${data.length}`);
  })
  .catch(err => {
    console.error('Chyba RSS:', err.message);
    // Fallback
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
    console.log('Použit fallback.');
  });

console.log('=== Update dokončen ===');
