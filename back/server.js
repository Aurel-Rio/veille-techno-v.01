const express = require('express');
const path = require('path');
const app = express();
const port = 3001; // Choisissez un numéro de port

// Middleware pour autoriser les requêtes Cross-Origin
app.use(express.static(path.join(__dirname, '../front/build')));

// Middleware pour analyser le corps des requêtes JSON
app.use(express.json());

// Routes API
app.use('/api/auth', require('./api/auth'));

// Définir une route pour servir l'application React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/build/index.html'));
});

// Écouter les requêtes sur le port spécifié
app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}.`);
});
