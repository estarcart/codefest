const jwt = require('jsonwebtoken');
const conn = require('../config/dbConnection').promise();

exports.getGroups = async (req, res, next) => {
    try {
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

        // Aquí puedes realizar una consulta a la base de datos para obtener los grupos a los que pertenece el usuario.
        const [userGroups] = await conn.execute(
            "SELECT `g`.`id`, `g`.`name` FROM `grupo` AS `g` " +
            "JOIN `user_groups` AS `ug` ON `g`.`id` = `ug`.`group_id` " +
            "WHERE `ug`.`user_id` = ?",
            [decoded.id]
        );

        if (userGroups.length > 0) {
            return res.json({
                groups: userGroups
            });
        }

        res.json({
            message: "No groups found for the user"
        });

    } catch (err) {
        next(err);
    }
}
