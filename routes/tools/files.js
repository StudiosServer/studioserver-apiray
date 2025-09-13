const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/tools/files', (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({
            creator: 'Studio Server',
            status: true,
            message: 'Por favor, proporciona un nombre de archivo.'

        });
    }

    const filePath = path.join(__dirname, 'image', query);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({
                creator: 'Studio Server',
                status: true,
                message: 'archivo no elcontrado',
            });
        }

        res.sendFile(filePath, (err) => {
            if (err) {
                return res.status(500).json({
                    creator: 'Studio Server',
                    status: false,
                    coment: 'file >_< ?',
                    message: 'Hubo un error al enviar el archivo, esto puede deberse a que el archivo no existe o no es el nombre correcto, o tambien que aun no se haya descargado aun el archivo.',
                });
            }

            // Programar la eliminación del archivo después de un minutos
            setTimeout(() => {
                fs.unlink(filePath, (err) => {
                    if (err) {
                    } else {
                    }
                });
            }, 60000); // 60000 milisegundos = 1 minutos
        });
    });
});

module.exports = router;
