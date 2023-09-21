const mongoose = require ('mongoose')

const StudentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        reuired:true,

    },
    password:{
        type:String,
        reuired:true,

    },
    phone:{
        type : String ,
    },
    city:{
        type:String,
    },
    address:{
        type:String,
        
    },
    course:{
        type:String,
    },
    role:{
        type:String,
        default:'student'
    },
    image: {
        public_id: {
            type: String,
        },
        url: {
            type: String
        }
    },


})
const StudentModel= mongoose.model('student',StudentSchema)
module.exports= StudentModel