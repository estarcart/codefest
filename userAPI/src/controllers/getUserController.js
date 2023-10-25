const jwt = require('jsonwebtoken');
const conn = require('../config/dbConnection').promise();

exports.getUser = async (req,res,next) => {

    try{

        if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ){
            return res.status(422).json({
                message: "Please provide the token",
            });
        }

        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, 'sklatt75wZ/9ZOd7Yova32AyYKCXj20M4HnFctJrfVK4BcQ00CdC2E3K0etBBtYf');

        const [row] = await conn.execute(
            "SELECT `id`,`name`,`email` FROM `users` WHERE `id`=?",
            [decoded.id]
        );

        if(row.length > 0){
            return res.json({
                user:row[0]
            });
        }

        res.json({
            message:"No user found"
        });
        
    }
    catch(err){
        next(err);
    }
}