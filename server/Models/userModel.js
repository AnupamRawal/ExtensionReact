const mongoose = require('mongoose');

const DetailsSchema = new mongoose.Schema({
    userName :{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    }
})

const userDataModel = mongoose.model('userData', DetailsSchema)

module.exports = userDataModel