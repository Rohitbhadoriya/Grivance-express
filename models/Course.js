const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    cname: {
        type: String,
        required: true,
    },
    
    

  
},{timestamps:true})
const CourseModel = mongoose.model('course',CourseSchema)
module.exports= CourseModel