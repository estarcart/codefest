const conn = require('../config/dbConfig.js').promise();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configuración de multer para la subida de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directorio donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        const imgFileName = `${Date.now()}-${file.originalname}`;
        cb(null, imgFileName); // Nombre único del archivo
    },
});

const upload = multer({ storage: storage });

exports.getPublish = async (req, res) => {
    try {
        const [rows] = await conn.execute('SELECT * FROM publicacion');
        res.json(rows);
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        return res.status(500).json({
            message: 'Algo ha salido mal'
        });
    }
};

exports.createPublish = upload.single('file'), async (req, res) => {
    try {
        const { textPublication, userName } = req.body;

        const imgFile = req.file;
        if (!imgFile) {
            return res.status(400).json({
                message: 'Debes subir una imagen'
            });
        }

        // Directorio donde se guardarán las imágenes (en la misma ubicación que tu archivo)
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        // Ruta completa de la imagen
        const imgPath = path.join(uploadDir, imgFile.filename);

        // Inserta la información en la base de datos, incluyendo la ruta de la imagen
        const [result] = await conn.execute(
            'INSERT INTO publicacion (imgRoute, videoRoute, textPublication, userName) VALUES (?, ?, ?, ?)',
            [imgPath, '', textPublication, userName] // Cambio en esta línea
        );

        const insertedId = result.insertId;

        return res.status(201).json({
            message: 'Publicación creada exitosamente',
            insertedId: insertedId
        });
    } catch (error) {
        console.error('Error al crear la publicación:', error);
        return res.status(500).json({
            message: 'Algo ha salido mal'
        });
    }
};
