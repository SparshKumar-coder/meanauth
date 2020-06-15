

// Importing all the modules

const mongoose = require ('mongoose');



// Defining the UserCompanySchema

const UserCompanySchema = new mongoose.Schema ({


    UserId: {

        type: mongoose.Schema.ObjectId,
        required: true

    },

    CompanyId: {

        type:  mongoose.Schema.ObjectId,
        required: true

    }

})


// Making the UserCompanyModel

const UserCompanyModel = mongoose.model ('userCompany', UserCompanySchema);



// Exporting the UserCompanyModel for Operations

module.exports = {

    UserCompanyModel

}