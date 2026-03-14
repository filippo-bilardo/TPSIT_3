/**
 * Esercizio 09 - API Meteo (Node.js)
 * 
 * Obiettivi:
 * - Chiamare API OpenWeatherMap
 * - Parsing dati JSON meteo
 * - Salvataggio storico su file JSON
 * 
 * API utilizzata: OpenWeatherMap (https://openweathermap.org/api)
 * Nota: Richiede API key gratuita
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// CONFIGURAZIONE
const API_KEY = 'YOUR_API_KEY_HERE'; // Ottieni da: https://openweathermap.org/api
const CITY = 'Milan';
const UNITS = 'metric'; // metric = Celsius, imperial = Fahrenheit

/**
 * Funzione per chiamare l'API meteo
 */
function getWeatherData(city) {
  return new Promise((resolve, reject) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${UNITS}`;
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          
          if (res.statusCode === 200) {
            resolve(jsonData);
          } else {
            reject(new Error(`API Error: ${jsonData.message}`));
          }
        } catch (error) {
          reject(new Error('Errore parsing JSON: ' + error.message));
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Funzione per formattare i dati meteo
 */
function formatWeatherData(data) {
  return {
    timestamp: new Date().toISOString(),
    city: data.name,
    country: data.sys.country,
    coordinates: {
      lat: data.coord.lat,
      lon: data.coord.lon
    },
    weather: {
      main: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon
    },
    temperature: {
      current: data.main.temp,
      feels_like: data.main.feels_like,
      min: data.main.temp_min,
      max: data.main.temp_max
    },
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    wind: {
      speed: data.wind.speed,
      deg: data.wind.deg
    },
    clouds: data.clouds.all,
    visibility: data.visibility
  };
}

/**
 * Funzione per salvare i dati su file JSON
 */
function saveWeatherHistory(weatherData) {
  const historyFile = path.join(__dirname, 'weather-history.json');
  
  let history = [];
  
  // Leggi lo storico esistente se presente
  if (fs.existsSync(historyFile)) {
    try {
      const fileContent = fs.readFileSync(historyFile, 'utf8');
      history = JSON.parse(fileContent);
    } catch (error) {
      console.error('Errore lettura storico:', error.message);
    }
  }
  
  // Aggiungi nuova entry
  history.push(weatherData);
  
  // Mantieni solo le ultime 100 entries
  if (history.length > 100) {
    history = history.slice(-100);
  }
  
  // Salva su file
  try {
    fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));
    console.log(`✓ Dati salvati in ${historyFile}`);
  } catch (error) {
    console.error('Errore salvataggio file:', error.message);
  }
}

/**
 * Funzione principale
 */
async function main() {
  console.log('=== Esercizio 09 - API Meteo ===\n');
  
  // Verifica API key
  if (API_KEY === 'YOUR_API_KEY_HERE') {
    console.error('❌ Errore: Configura la tua API key!');
    console.log('1. Registrati su https://openweathermap.org/');
    console.log('2. Ottieni la tua API key gratuita');
    console.log('3. Sostituisci YOUR_API_KEY_HERE nel codice\n');
    return;
  }
  
  try {
    console.log(`📡 Recupero dati meteo per ${CITY}...`);
    
    // Chiamata API
    const rawData = await getWeatherData(CITY);
    
    // Formattazione dati
    const formattedData = formatWeatherData(rawData);
    
    // Visualizza risultati
    console.log('\n📊 Dati meteo:');
    console.log('─'.repeat(50));
    console.log(`🌍 Città: ${formattedData.city}, ${formattedData.country}`);
    console.log(`🌤️  Condizioni: ${formattedData.weather.description}`);
    console.log(`🌡️  Temperatura: ${formattedData.temperature.current}°C`);
    console.log(`   Percepita: ${formattedData.temperature.feels_like}°C`);
    console.log(`   Min/Max: ${formattedData.temperature.min}°C / ${formattedData.temperature.max}°C`);
    console.log(`💧 Umidità: ${formattedData.humidity}%`);
    console.log(`💨 Vento: ${formattedData.wind.speed} m/s`);
    console.log(`☁️  Nuvolosità: ${formattedData.clouds}%`);
    console.log('─'.repeat(50));
    
    // Salva su file
    saveWeatherHistory(formattedData);
    
    // Visualizza JSON completo
    console.log('\n📄 Dati JSON completi:');
    console.log(JSON.stringify(formattedData, null, 2));
    
  } catch (error) {
    console.error('❌ Errore:', error.message);
  }
}

// Esegui il programma
main();

/**
 * ESERCIZI AGGIUNTIVI:
 * 
 * 1. Modifica il programma per accettare la città come parametro da riga di comando
 *    Esempio: node 09-weather-api.js Rome
 * 
 * 2. Aggiungi funzionalità per ottenere le previsioni a 5 giorni
 *    Endpoint: api.openweathermap.org/data/2.5/forecast
 * 
 * 3. Implementa una funzione per calcolare statistiche dallo storico
 *    (temperatura media, giorni di pioggia, ecc.)
 * 
 * 4. Crea un sistema di alert che notifica se la temperatura
 *    supera una certa soglia
 * 
 * 5. Implementa cache delle richieste per evitare chiamate
 *    multiple alla stessa città in poco tempo
 */
