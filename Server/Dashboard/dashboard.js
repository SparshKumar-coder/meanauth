

// Importing all the required Modules


const DashboardRouter = require ('express').Router ();



// Defining the /dashboard endpoint

DashboardRouter.get ('/', (req, res) => {

 
    return res.status (200).send ({

        status: 'Success',
        foundDoc: req.foundDoc

    })

})



// Exporting the DashboardRouter Object

module.exports = {

    DashboardRouter

}
