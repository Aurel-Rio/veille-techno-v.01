const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

router.post('/register', async (req, res) => {
  const { username, email, password, isAdmin } = req.body; // Ajout de isAdmin dans la déstructuration

  try {
    // Vérifier si l'utilisateur existe déjà avec l'email fourni
    const existingUser = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      console.log('Cet email est déjà utilisé.');
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Hachage du mot de passe avant de l'enregistrer en base de données
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Enregistrement de l'utilisateur dans la base de données
    await db.query('INSERT INTO users (username, email, password, isAdmin) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, isAdmin]); // Utilisation de isAdmin dans la requête

    // Réponse indiquant le succès de l'inscription
    console.log('Inscription réussie !');
    res.json({ message: 'Inscription réussie !' });
  } catch (error) {
    console.error('Une erreur est survenue lors de l\'inscription :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'inscription.' });
  }
});

module.exports = router;
