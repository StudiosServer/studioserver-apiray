const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configuración de nodemailer para usar Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'servido1034@gmail.com', // Reemplaza con tu dirección de correo de Gmail
        pass: 'mi tokio191' // Reemplaza con tu contraseña o contraseña de aplicación
    }
});

// Verificar la configuración del transporte
transporter.verify(function(error, success) {
    if (error) {
        console.error('Error de configuración:', error);
    } else {
        console.log('Servidor listo para enviar correos');
    }
});

router.get('/send-message', (req, res) => {
    const { name, email, message } = req.query;

    if (!name || !email || !message) {
        console.error('Faltan parámetros en la solicitud:', { name, email, message });
        return res.status(400).json({ error: 'Faltan parámetros en la solicitud' });
    }

    const mailOptions = {
        from: 'lizilami10@gmail.com', // Reemplaza con tu dirección de correo de Gmail
        to: email,
        subject: `Mensaje de ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
            return res.status(500).json({ error: 'Hubo un error al enviar el correo electrónico.' });
        }
        console.log('Correo enviado:', info);
        res.json({ message: 'Mensaje recibido', info });
    });
});



// router.get('/send-message', (req, res) => {
//     const { name, email, message } = req.query;

//    res.json({
//     creator: 'Studio Server',
//     nombre: name,
//     email: email,
//     Mensaje: message,
//    })
// });

module.exports = router;
