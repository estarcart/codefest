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
