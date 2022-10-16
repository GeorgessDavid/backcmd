const path = require('path')

const prestadoresController = {
    index: (req,res) => {
        res.render("prestadoresLogin")
    }
}

module.exports = prestadoresController;