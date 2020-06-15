

// Importing the Modules
const mongoose = require ('mongoose');


// Defining the CompanySchema
const CompanySchema = new mongoose.Schema ({

    CompanyName: {

        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50

    },

    CompanySubDomainName: {

        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100

    }


});



// Making a static function to check companyData returns 'true' if valid return 'false' otherwise
CompanySchema.statics.ValidateCompanyData = function (CompanyData) {

    // Make a new Company instance and a variable 'result'
    const newCompany = new this (CompanyData);
    let result;

    return new Promise ((resolve, reject) => {

        newCompany.validate ((CatchedError) => {

            if (CatchedError) {
                reject (CatchedError);
            }

            else {
                resolve (true);
            }

        })

    })
}


// Making the CompanyModel
const CompanyModel = mongoose.model ('company', CompanySchema);



// Exporting the Model for Operations
module.exports = {

    CompanyModel

}