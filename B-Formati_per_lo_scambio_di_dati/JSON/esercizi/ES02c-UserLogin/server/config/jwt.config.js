// Configurazione JWT

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'es02c-jwt-secret-change-in-production',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'es02c-refresh-secret-change-in-production',
  ACCESS_TOKEN_EXPIRY: '15m',   // 15 minuti
  REFRESH_TOKEN_EXPIRY: '7d'    // 7 giorni
};
