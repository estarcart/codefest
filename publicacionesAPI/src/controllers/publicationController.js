const conn = require('../config/dbConfig.js').promise();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const imgFileName = `${Date.now()}-${file.originalname}`;
        cb(null, imgFileName);
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

exports.getPublishImg = (req, res) => {
    const uploadDir = path.join(__dirname, 'uploads'); // Ruta al directorio de imágenes (asegúrate de que esté en la ubicación correcta)

    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            console.error('Error al leer el directorio:', err);
            return res.status(500).json({
                message: 'Algo ha salido mal'
            });
        }

        const fileData = files.map((file) => {
            const filePath = path.join(uploadDir, file);
            return {
                filename: file,
                path: filePath,
                size: fs.statSync(filePath).size
            };
        });

        res.json(fileData);
    });
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

        const imgFileName = imgFile.filename;

        const uploadDir = path.join(__dirname, 'uploads'); // Ruta al directorio de imágenes (asegúrate de que esté en la ubicación correcta)
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const imgPath = path.join(uploadDir, imgFileName);

        const [result] = await conn.execute(
            'INSERT INTO publicacion (imgRoute, videoRoute, textPublication, userName) VALUES (?, ?, ?, ?)',
            [imgFileName, '', textPublication, userName]
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
