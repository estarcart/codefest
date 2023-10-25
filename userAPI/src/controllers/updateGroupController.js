const jwt = require('jsonwebtoken');
const conn = require('../config/dbConnection').promise();

// Controlador para agregar más personas a un grupo existente
exports.updateGroup = async (req, res, next) => {
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

        // Datos de la solicitud, incluyendo el ID del grupo y los nuevos miembros
        const { groupId, members } = req.body;

        // Verifica si el usuario autenticado es un miembro del grupo
        const [checkMembership] = await conn.execute(
            "SELECT `group_id` FROM `user_groups` WHERE `user_id` = ? AND `group_id` = ?",
            [decoded.id, groupId]
        );

        if (checkMembership.length === 0) {
            return res.status(403).json({
                message: "You are not a member of the specified group.",
            });
        }

        // Agregar nuevos miembros al grupo en la tabla user_groups
        for (const memberId of members) {
            await conn.execute(
                "INSERT INTO `user_groups` (`user_id`, `group_id`) VALUES (?, ?)",
                [memberId, groupId]
            );
        }

        return res.json({
            message: "Members added to the group successfully",
        });
    } catch (err) {
        next(err);
    }
}
