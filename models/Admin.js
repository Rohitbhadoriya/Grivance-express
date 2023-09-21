const mongoose = require ('mongoose')

const AdminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        reuired:true

    },
    password:{
        type:String,
        reuired:true

    },
},{timestamps:true})
const AdminModel= mongoose.model('admin',AdminSchema)
module.exports= AdminModel