const CourseModel = require("../../models/Course");

class CourseController{

    static addcourse = async(req,res)=>{
        try{
            const { name, email, image, role, } = req.data1
            const odata = await CourseModel.find()
            res.render('admin/course/addcourse',{n: name, img: image, role:role, o:odata})
        }catch(error){
            console.log(error);
        }
    }
    static courseinsert = async(req,res)=>{
        try{
            const{cname} = req.body
            const result = new CourseModel({
                cname:cname,
            })
            await result.save()
            // console.log(result);
            res.redirect('/admin/addcourse')
        }catch (error){
            console.log(error);
        }
    }
    static courseview = async(req,res)=>{
        try{
            // console.log(req.params.id);
            const { name, email, image, role, } = req.data1
            const odata = await CourseModel.findById(req.params.id)
            console.log(odata);
            res.render('admin/course/view',{n: name, img: image, role:role, o:odata})
        }catch(error){
            console.log(error);
        }
    }
    static courseedit = async(req,res)=>{
        try{
            const { name, email, image, role, } = req.data1
            const odata = await CourseModel.findById(req.params.id) 
            res.render('admin/course/edit',{o:odata, n:name, role:role, img:image})
        }catch(errror){
            console.log(error);
        }
    }
    static courseupdate = async(req,res)=>{
        try{
            const{cname}= req.body
            const update = await CourseModel.findByIdAndUpdate(req.params.id,{
                cname:cname,
            })
            // console.log(update);
            res.redirect('/admin/addcourse')
        }catch(error){
            console.log(error);
        }
    }
    static coursedelete = async(req,res)=>{
        try{
            await CourseModel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/addcourse')
        }catch(error){
            console.log(error);
        }
    }
}



module.exports = CourseController