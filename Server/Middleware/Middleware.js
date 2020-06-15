


// Importing the Modules

const jwt = require ('jsonwebtoken');
const path = require ('path');
const Config = require (path.resolve (__dirname , '..', 'Config', 'Config'));
const { UserModel } = require (path.resolve(__dirname, '..', 'Database', 'Models', 'UserModel'));


// Making the Middleware Function 

const Middleware = (req, res, next) => {

    try {

        if (!req.header('x-auth')) {
            throw new Error ('No token is present in the request');
        }

        const token = req.header ('x-auth');
        const decodedTokenValue = jwt.verify (token, Config.SECRET);
        //console.log (token);
        //console.log (decodedTokenValue);

        UserModel.findDocByToken (decodedTokenValue, token)
        
        .then((foundDoc) => {

            if (!foundDoc) {
                throw new Error ('No user has that token');
            }

            req.foundDoc = foundDoc;
            next ();

        })

        .catch ((CatchedError) => {

            return res.status (401).send ({

                status: 'Failure',
                message: CatchedError.message

            })

        })


    }

    catch (CatchedError) {


        return res.status (401).send ({

            status: 'Failure',
            message: CatchedError.message

        })

    }


}


module.exports = {

    Middleware

}