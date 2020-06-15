


// Making an Instance of the Router Object

const UserHandler = require('express').Router();
const _ = require('lodash');
const path = require ('path');
const validator = require ('validator');

const { UserModel } = require (path.resolve(__dirname, '..', 'Database', 'Models', 'UserModel'));
const { CompanyModel } = require (path.resolve(__dirname, '..', 'Database', 'Models', 'CompanyModel'));
const { UserCompanyModel } = require (path.resolve(__dirname, '..', 'Database', 'Models', 'UserCompanyModel'));





// Handling the /register Endpoint

UserHandler.post('/register', (req, res) => {


    // Take the User Email, Password, Role
    // TODO - Make 'Admin' role having default check on frontend
    
    try {

        if (!req.body.email || !req.body.password || !req.body.userName || !req.body.role || !req.body.CompanyName || !req.body.CompanySubDomainName) {
            throw new Error ('Email, Password, UserName, Role, CompanyName, subDomainName are required for registration');
        }

        
        const UserBody = _.pick (req.body, ['email', 'password', 'userName', 'role']);
        const CompanyBody = _.pick (req.body, ['CompanyName', 'CompanySubDomainName']);
        let isDataValid = {user: false, company: false};
        let UserCompanyObj = {};

        // Checking UserBody With UserSchema function 'ValidateUserData'
        // Checking CompanyBody With CompanySchema function 'ValidateCompanyData'

        UserModel.ValidateUserData(UserBody)
        .then ((isUserValid) => {

            isDataValid.user = isUserValid;
            return CompanyModel.ValidateCompanyData(CompanyBody)

        })

        .then ((isCompanyValid) => {

            isDataValid.company = isCompanyValid;
            return UserModel.create (UserBody);

        })

        .then((createdUser) => {

            UserCompanyObj.UserId = createdUser._id;
            return CompanyModel.create (CompanyBody);

        })

        .then ((createdCompany) => {

            UserCompanyObj.CompanyId = createdCompany._id;
            return UserCompanyModel.create (UserCompanyObj);

        })

        .then ((createdDoc) => {

            return res.status (200).send ({

                status: 'Success',
                createdDoc

            })

        })

        .catch ((CatchedError) => {


            return res.status(401).send ({

                status: 'Failure',
                message: CatchedError.message,
                isDataValid

            })

        })

    }

    // Handling Errors for try {} catch {} block
    catch (CatchedError) {

        return res.status(401).send({

            status: 'Failure',
            message: CatchedError.message


        })

    }


})



// Handling the /login Endpoint

UserHandler.post('/login', (req, res) => {


    // Making the try {} catch {} block for decent handling

    try {

        
        
        if (!req.body.email) {
            throw new Error ('Email is required for successfull login');
        }


        if (!req.body.password) {
            throw new Error ('Password is required for successfull login');
        }


        if (!validator.isEmail (req.body.email)) {
            throw new Error ('Email is not of proper format');
        }

        const body = _.pick (req.body, ['email', 'password']);


        // Find a User having specified creds

        UserModel.findOne(body).then ((foundDoc) => {

            if (!foundDoc) {

                throw new Error ('Invalid credentials');

            }

            else {
 
                if (foundDoc.tokens.length) {
                    throw new Error ('User is already logged in');
                }

                else {

                    let foundUserId = foundDoc._id;
                    return UserModel.findByIdAndUpdateToken (foundUserId);

                }

            }

        })

        .then ((updatedDoc) => {

            return res.header('x-auth', updatedDoc.tokens[0].token).status (200).send ({

                status: 'Success',
                updatedDoc

            })

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


})


// Exporting the User Handler

module.exports = {

    UserHandler

}