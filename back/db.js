const mysql = require('mysql2/promise'); // Utiliser mysql2/promise au lieu de mysql2

const pool = mysql.createPool({
  host: 'localhost',
  user: 'riozacki',
  password: 'Domino.bae.713',
  database: 'veiltech',
});

// Aucun besoin de pool.getConnection(), car nous utilisons la version promise

// Établir la connexion à la base de données et afficher un message en cas de succès
pool.getConnection()
  .then((connection) => {
    console.log('Connexion à la base de données réussie.');
    connection.release(); // Libérer la connexion pour qu'elle puisse être utilisée par d'autres requêtes
  })
  .catch((error) => {
    console.error('Erreur de connexion à la base de données :', error);
  });

module.exports = pool; // Utiliser directement le pool pour les requêtes
