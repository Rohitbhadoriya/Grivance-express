const AdminModel = require("../../models/Admin");
const ComplaintModel = require("../../models/Complaint")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AdminController{
    static dashboard = async(req,res)=>{
        try{
            //console.log(req.data1);
            const{name,email,role,image} = req.data1
            res.render('admin/dashboard',{n:name, role:role,img:image})
        }catch(error){
            console.log(error);
        }
    }
    static login = async (req,res)=>{
        try{
            res.render('admin/login')
        }catch(error){
            console.log(error)
        }
    }
    static register = async (req,res)=>{
        try{
            res.render ('admin/register')
        }catch(error){
            console.log(error)
        }
    }
    static admininsert = async (req,res)=>{
        try{
            const {name,email,password}=req.body
            const hashpassword = await bcrypt.hash(password,10)
           const r  = new AdminModel({
            name:name,
            email:email,
            password:hashpassword
           })
             await r.save()
             res.redirect('/admin/login')
        //    console.log(r)
        }catch(error){  
            console.log(error)
        }
    }
    // static verifylogin = async (req,res)=>{
    //     try{
    //         console.log(req.body);
    //         console.log('Hello');
    //         const{email,password}=req.body
    //         if (email && password) {
    //             const admin = await AdminModel.findOne({email:email})
    //             // console.log(admin)
    //             // password check 
    //             if (admin !=null) {
    //                const ismatched = await bcrypt.compare(password,admin.password) 
    //                if (ismatched) {
    //                 const token = jwt.sign({ ID: admin._id }, 'rohit123456789singh');
    //                   console.log(token)
    //                     // For cookies 
    //                     res.cookie('token',token)
    //                     res.redirect('/dashboard')
    //                }else{
    //                 res.redirect('/admin/login')
    //                }
    //             }else{
    //                 res.redirect('/admin/login')
    //             }
            
    //         }else{
    //             res.redirect('/admin/login')
    //         }
            
    //         // console.log(req.body)
    //     }catch(error){
    //         console.log(error)
    //     }
    // }
     static displaycomplaint = async(req,res)=>{
        try{
            const{name,email,role,image} = req.data1
            const cdata = await ComplaintModel.find()
            res.render('admin/displaycomplaint',{n:name, role:role,img:image,c:cdata})
        }catch (error){
            console.log(error)
        }
     }
     
    
}
module.exports = AdminController