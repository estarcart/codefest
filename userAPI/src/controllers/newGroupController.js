const jwt = require('jsonwebtoken');
const conn = require('../config/dbConnection').promise();

// Controlador para crear un nuevo grupo y agregar usuarios a él
exports.createGroup = async (req, res, next) => {
    try {
        // Verifica la autenticación del usuario
        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ) {
            return res.status(422).json({
                message: "Please provide the token",
            });
        }

        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, 'sklatt75wZ/9ZOd7Yova32AyYKCXj20M4HnFctJrfVK4BcQ00CdC2E3K0etBBtYf');

        // Datos del nuevo grupo
        const { groupName, members } = req.body;

        // Crear el grupo en la base de datos
        const [result] = await conn.execute(
            "INSERT INTO `grupo` (`name`) VALUES (?)",
            [groupName]
        );

        const groupId = result.insertId;

        if (groupId) {
            // Agregar usuarios al grupo en la tabla user_groups
            for (const memberId of members) {
                await conn.execute(
                    "INSERT INTO `user_groups` (`user_id`, `group_id`) VALUES (?, ?)",
                    [memberId, groupId]
                );
            }

            return res.json({
                message: "Group created and members added successfully",
            });
        } else {
            res.status(500).json({
                message: "Failed to create the group",
            });
        }
    } catch (err) {
        next(err);
    }
}
