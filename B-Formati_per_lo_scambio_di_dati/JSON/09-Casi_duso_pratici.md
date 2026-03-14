# 9. Casi d'uso pratici

## Configurazione applicazioni

JSON è ampiamente utilizzato per file di configurazione grazie alla sua leggibilità.

### package.json (Node.js)

```json
{
  "name": "mia-app",
  "version": "1.0.0",
  "description": "Applicazione di esempio",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest",
    "build": "webpack"
  },
  "dependencies": {
    "express": "^4.18.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "webpack": "^5.0.0"
  }
}
```

### appsettings.json (.NET)

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyDb;User Id=sa;Password=***"
  },
  "AppSettings": {
    "MaxUploadSize": 10485760,
    "EnableCache": true,
    "CacheDuration": 3600
  }
}
```

### Configurazione personalizzata

```json
{
  "app": {
    "name": "MyApp",
    "version": "2.1.0",
    "environment": "production"
  },
  "server": {
    "host": "0.0.0.0",
    "port": 8080,
    "ssl": true
  },
  "database": {
    "type": "postgresql",
    "host": "db.esempio.com",
    "port": 5432,
    "name": "mydb",
    "pool": {
      "min": 2,
      "max": 10
    }
  },
  "features": {
    "authentication": true,
    "notifications": true,
    "analytics": false
  }
}
```

## Scambio dati tra client e server

### Richiesta login

```json
// POST /api/auth/login
{
  "email": "utente@esempio.com",
  "password": "password123",
  "remember_me": true
}
```

### Risposta con token

```json
// Response 200 OK
{
  "success": true,
  "data": {
    "user": {
      "id": 123,
      "email": "utente@esempio.com",
      "nome": "Mario Rossi",
      "ruolo": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 3600
  }
}
```

### Elenco prodotti (e-commerce)

```json
// GET /api/prodotti?categoria=elettronica&page=1
{
  "data": [
    {
      "id": 1,
      "nome": "Laptop Pro",
      "descrizione": "Laptop ad alte prestazioni",
      "prezzo": 1299.99,
      "valuta": "EUR",
      "disponibile": true,
      "immagini": [
        "https://cdn.esempio.com/img1.jpg",
        "https://cdn.esempio.com/img2.jpg"
      ],
      "specifiche": {
        "processore": "Intel i7",
        "ram": "16GB",
        "storage": "512GB SSD"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 156,
    "total_pages": 8
  }
}
```

### Carrello shopping

```json
// POST /api/carrello
{
  "user_id": 123,
  "items": [
    {
      "product_id": 1,
      "quantità": 2,
      "prezzo_unitario": 29.99
    },
    {
      "product_id": 5,
      "quantità": 1,
      "prezzo_unitario": 149.99
    }
  ],
  "totale": 209.97,
  "valuta": "EUR"
}
```

## Database NoSQL (MongoDB)

### Documento utente

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "mario_rossi",
  "email": "mario@esempio.com",
  "profilo": {
    "nome": "Mario",
    "cognome": "Rossi",
    "data_nascita": "1990-05-15",
    "avatar": "https://cdn.esempio.com/avatars/mario.jpg"
  },
  "indirizzo": {
    "via": "Via Roma 10",
    "città": "Milano",
    "cap": "20100",
    "paese": "Italia"
  },
  "preferenze": {
    "lingua": "it",
    "newsletter": true,
    "notifiche": {
      "email": true,
      "push": false
    }
  },
  "creato_il": "2024-01-15T10:30:00Z",
  "ultimo_accesso": "2024-03-14T15:20:00Z",
  "tags": ["premium", "verificato"]
}
```

### Documento post (blog)

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "titolo": "Introduzione a JSON",
  "slug": "introduzione-a-json",
  "autore": {
    "id": "507f1f77bcf86cd799439011",
    "nome": "Mario Rossi"
  },
  "contenuto": "JSON è un formato di scambio dati...",
  "categoria": "Programmazione",
  "tags": ["json", "tutorial", "web"],
  "pubblicato": true,
  "data_pubblicazione": "2024-03-10T12:00:00Z",
  "commenti": [
    {
      "id": "c1",
      "autore": "Luigi Verdi",
      "testo": "Ottimo articolo!",
      "data": "2024-03-11T14:30:00Z"
    }
  ],
  "statistiche": {
    "visualizzazioni": 1523,
    "mi_piace": 89,
    "condivisioni": 12
  }
}
```

## File di dati

### Dati geografici (GeoJSON)

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [9.1900, 45.4642]
      },
      "properties": {
        "name": "Milano",
        "popolazione": 1400000,
        "paese": "Italia"
      }
    }
  ]
}
```

### Dati statistici

```json
{
  "dataset": "Vendite 2024",
  "periodo": {
    "inizio": "2024-01-01",
    "fine": "2024-03-31"
  },
  "dati": [
    {
      "mese": "Gennaio",
      "vendite": 125000,
      "ordini": 450,
      "crescita": 12.5
    },
    {
      "mese": "Febbraio",
      "vendite": 138000,
      "ordini": 502,
      "crescita": 10.4
    },
    {
      "mese": "Marzo",
      "vendite": 156000,
      "ordini": 578,
      "crescita": 13.0
    }
  ],
  "totale": {
    "vendite": 419000,
    "ordini": 1530,
    "media_ordine": 273.86
  }
}
```

### Manifest file (PWA)

```json
{
  "name": "My Progressive Web App",
  "short_name": "MyPWA",
  "description": "Un'app web progressiva di esempio",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2196F3",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Dati per grafici (Chart.js)

```json
{
  "labels": ["Gen", "Feb", "Mar", "Apr", "Mag"],
  "datasets": [
    {
      "label": "Vendite 2024",
      "data": [12, 19, 3, 5, 2],
      "backgroundColor": "rgba(75, 192, 192, 0.2)",
      "borderColor": "rgba(75, 192, 192, 1)",
      "borderWidth": 1
    }
  ]
}
```
