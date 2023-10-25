const conn = require('../config/dbConfig.js').promise();

exports.getPublish = async (req, res) => {
    try {
        const [rows] = await conn.execute('SELECT * FROM publicacion');
        res.json(rows);
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        return res.status(500).json({
            message: 'Algo ha salido mal'
        });
    };
};

exports.createPublish = async (req, res) => {
    try {
        const { imgRoute, videoRoute, textPublication, userName } = req.body;

        const [result] = await conn.execute(
            'INSERT INTO publicacion (imgRoute, videoRoute, textPublication, userName) VALUES (?, ?, ?, ?)',
            [imgRoute, videoRoute, textPublication, userName]
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
