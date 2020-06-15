

// Importing the Modules

const mongoose = require ('mongoose');
const validator = require ('validator');
const jwt = require ('jsonwebtoken');
const path = require ('path');
const Config = require (path.resolve(__dirname, '..', '..', 'Config', 'Config'));



// Making use of mongoose-unique-validator-plugin
const uniqueValidator = require ('mongoose-unique-validator');


// Defining the UserSchema

const UserSchema = new mongoose.Schema ({

    email: {

        type: String,
        required: true,
        minlength: 1,
        unique: true,
        maxlength: 50,
        trim: true,
        validate: {

            validator: (email) => {

                return validator.isEmail (email);

            },

            message: '{VALUE} is not a valid Email format'

        }

    },


    password: {

        type: String,
        minlength: 10,
        maxlength: 50,
        trim: true,
        required: true

    },

    userName: {

        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 20,
        trim: true

    },

    role: {

        type: String,
        default: 'admin',
        trim: true,
        required: true,
        validate: {

            validator: (role) => {

                let roles = ['admin', 'designer', 'manager'];
                if (roles.includes(role)) {
                    return true;
                }
                else {
                    return false;
                }

            },

            message: '{VALUE} role is not a valid role'

        }

    },

    tokens: [

        {

            access: {

                type: String,
                required: true

            },


            token: {

                type: String,
                required: true

            },

            _id: false

        }

    ]

});




// Making use of 'mongoose-unique-validator' here
UserSchema.plugin(uniqueValidator);



// Making a static function findDocByToken
UserSchema.statics.findDocByToken = function (decodedTokenValue, token) {

    return this.findOne({
        
        '_id': decodedTokenValue.id,
        'tokens.access': decodedTokenValue.access,
        'tokens.token': token

    }).then((foundDoc) => {

        return foundDoc;

    })

    .catch ((CatchedError) => {

        return new Promise ((resolve, reject) => {

            reject (CatchedError);

        })

    })

}



// Making the static function VaidateUserData returns 'true' if validation succeed otherwise 'false'
UserSchema.statics.ValidateUserData = function (UserBody) {

    // Making a result variable and a new user 
    const newUser = new this (UserBody);
    let result;

    return new Promise ((resolve, reject) => {

        newUser.validate ((CatchedError) => {

            if (CatchedError) {
                reject (CatchedError);
            }

            else {
                resolve (true);
            }

        })

    })
}




// Making the static function for Inserting JWT tokens in a document of specified ID
UserSchema.statics.findByIdAndUpdateToken = function (id) {


    // Make required token and access variables

    let access = 'auth';
    let token = jwt.sign({

        id,
        access


    }, Config.SECRET);


    return this.findByIdAndUpdate (id, {

        $push: {

            tokens: {access, token}

        }

    }, { new: true })

    .then ((updatedDoc) => {


        return updatedDoc;

    })

    .catch ((CatchedError) => {

        return new Promise ((resolve, reject) => {

            reject (CatchedError);
            
        })

    })

}




// Making the UserModel
const UserModel = mongoose.model ('user', UserSchema);




// Exporting the UserModel
module.exports = {

    UserModel

}