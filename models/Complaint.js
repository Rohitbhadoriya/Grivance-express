const mongoose = require ('mongoose')

const ComplaintSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        reuired:true,

    },
    ctype:{
        type:String,
        reuired:true,

    },
    semester:{
        type : String ,
        reuired:true,
    },
    subject:{
        type:String,
        required: true
    },
    cdetail:{
        type:String,
        reuired:true,
    },
    status:{
        type:String,
        default:'pending',
        },
        comment:{
            type:String,
            },
    user_id:{
        type:String,
        reuired:true,
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
const ComplaintModel= mongoose.model('complaint',ComplaintSchema)
module.exports= ComplaintModel