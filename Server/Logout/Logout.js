

// Importing all the Modules

const LogoutRouter = require ('express').Router ();
const path = require ('path');
const { UserModel } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'UserModel'));


// handling the /logout endpoint

LogoutRouter.get('/', (req, res) => {

    UserModel.findByIdAndUpdate (req.foundDoc._id, {

        $set: {

            'tokens': []

        }

    }, { new: true}).then ((updatedDoc) => {

        return res.status (200).send ({

            status: 'Logout Success',
            updatedDoc

        })

    })

    .catch ((CatchedError) => {

        return res.status (401).send ({



        })

    })

})



// Exporting the Logout 

module.exports = {

    LogoutRouter

}