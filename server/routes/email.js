// server/routes/email.js

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

// Configura el transportador de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Usa la variable de entorno
    pass: process.env.EMAIL_PASS   // Usa la variable de entorno
  }
});

// Ruta para enviar un correo
router.post('/send', async (req, res) => {
  const { to, subject, text } = req.body;
  
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,  // Usa la variable de entorno
      to,
      subject,
      text
    });
    res.status(200).json({ message: 'Email enviado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar el email', error });
  }
});

module.exports = router;
