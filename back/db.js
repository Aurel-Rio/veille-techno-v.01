const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'riozacki',
  password: 'Domino.bae.713',
  database: 'veiltech',
});

// Établir la connexion à la base de données
pool.getConnection((error, connection) => {
  if (error) {
    console.error('Erreur de connexion à la base de données :', error);
  } else {
    console.log('Connexion à la base de données réussie.');
    connection.release(); // Libérer la connexion pour qu'elle puisse être utilisée par d'autres requêtes
  }
});

module.exports = pool.promise(); // Utilisez la version promise du pool pour les requêtes
