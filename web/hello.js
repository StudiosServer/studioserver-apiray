const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configuración de nodemailer para usar Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'servidor1034@gmail.com',
        pass: 'mi tokio191' // Asegúrate de usar una contraseña segura o una contraseña de aplicación
    }
});

router.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: 'servidor1034@gmail.com',
        to: email,
        subject: `Mensaje de ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Hubo un error al enviar el correo electrónico.' });
        }
        res.json({ message: 'Correo enviado correctamente', info });
    });
});

module.exports = router;
