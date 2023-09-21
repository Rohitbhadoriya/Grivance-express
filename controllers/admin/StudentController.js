const StudentModel = require('../../models/Student')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dvhcd5oaz',
    api_key: '377969336692132',
    api_secret: 'ck52LMl4pM1JvZikeMw0cZNtx00'
})




class StudentController {
    static addstudent = async (req, res) => {
        try {
            const { name, email, role, image } = req.data1
            const data = await StudentModel.find().sort({ _id: -1 })
            // console.log(data)
            res.render('admin/student/addstudent', { d: data, n: name, role: role,img:image, msg: req.flash('success'), msg1: req.flash('error') })
        } catch (error) {
            console.log(error);
        }
    }
    static studentinsert = async (req, res) => {
        try {
            // console.log(req.files.image)
            //  console.log(req.body)
            const file = req.files.image
            // image upload code
            const image_upload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'Profile Image'
            })
            //console.log(image_upload)
            const { name, email, password, course } = req.body
            const student = await StudentModel.findOne({ email: email })
            if (student) {
                req.flash('error', 'email already exists')
                res.redirect('/admin/addstudent')
            } else {
                if (name && email && password) {
                    const hashpassword = await bcrypt.hash(password, 10)
                    const r = new StudentModel({
                        name: name,
                        email: email,
                        password: hashpassword,
                        course:course,
                        image: {
                            public_id: image_upload.public_id,
                            url: image_upload.secure_url,
                        }
                    })
                    await r.save()
                    req.flash('success', 'add student successfully')
                    res.redirect('/admin/addstudent')
                } else {
                    res.flash('error', 'all field are required')
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    static viewstudent = async (req, res) => {
        try {
            const { name, email, role, image } = req.data1
            // console.log(req.params.id)
            const data = await StudentModel.findById(req.params.id)
            //console.log(data);
            res.render('admin/student/view', { d: data, n: name, role: role, img:image })
        } catch (error) {
            console.log(error)
        }
    }
    static editstudent = async (req, res) => {
        try {
            const { name, email, role, image } = req.data1
            //console.log(req.params.id)
            const data = await StudentModel.findById(req.params.id)
            // console.log(data);
            res.render('admin/student/edit', { d: data, n: name, role: role, img:image })
        } catch (error) {
            console.log(error)
        }
    }

    static updatestudent = async (req, res) => {
        try {

            //console.log(req.body);
            // console.log(req.files.image)
            const { name, email, password } = req.body
            const hashpassword = await bcrypt.hash(password, 10)
            if (req.files) {
                // image delete code 
                const student = await StudentModel.findById(req.params.id)
                const imageid = student.image.public_id
                // console.log(imageid)
                await cloudinary.uploader.destroy(imageid)
                // 2image update
                const file = req.files.image
                // image upload code
                const image_upload = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'Profile Image'
                })
                var data = {
                    name: name,
                    email: email,
                    password: hashpassword,
                    image: {
                        public_id: image_upload.public_id,
                        url: image_upload.secure_url,
                    }
                }
            } else {
                var data = {
                    name: name,
                    email: email,
                    password: hashpassword,
                }
            }
            const id = req.params.id
            await StudentModel.findByIdAndUpdate(id, data)
            req.flash('success', 'update successfully')
            res.redirect('/admin/addstudent')
        } catch (error) {
            console.log(error);
        }
    }
    static studentdelete = async (req, res) => {
        try {
            // const{name,email,role} = req.data1
            await StudentModel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/addstudent')
        } catch (error) {
            console.log(error);
        }
    }
    static verifylogin = async (req, res) => {
        try {
            const { email, password } = req.body
            if (email && password) {
                const user = await StudentModel.findOne({ email: email })
                //console.log(student);
                if (user != null) {
                    const ismatched = await bcrypt.compare(password, user.password)
                    // const ismatched = true
                    if (ismatched) {
                        if (user.role == 'admin') {
                            const token = jwt.sign({ ID: user._id }, 'rohit123456789singh');
                            // console.log(token)
                            // For cookies 
                            res.cookie('token', token)
                            res.redirect('/dashboard')
                        }
                        if (user.role == 'student') {
                            const token = jwt.sign({ ID: user._id }, 'rohit123456789singh');
                            // console.log(token)
                            // For cookies 
                            res.cookie('token', token)
                            res.redirect('/dashboard')
                        }
                        // Genrate token for login security

                    } else {
                        req.flash('error', 'email or password is incorrect')
                        res.redirect('/')
                    }
                } else {
                    req.flash('error', 'user not register user')
                    res.redirect('/')
                }
            } else {
                req.flash('error', 'email and password required')
                res.redirect('/')
            }
            // console.log(req.body);
        } catch (error) {
            console.log(error);
        }
    }
    static profile = async (req, res) => {
        try {
            // For Name On Dash
            const { name, email, phone, city, address, image, role, course } = req.data1
            res.render('admin/student/profile', { n: name, e: email, p: phone, c: city, a: address, img: image, role: role, co:course })
        } catch (error) {
            console.log(error)
        }
    }
    static updateprofile = async (req, res) => {
        try {
            // For Name On Dash
            const { name, email, id,image } = req.data1
            // //    console.log(req.body)
            // console.log(req.files.image) 
            if (req.files) {
                // first find and destroy old image public id
                const student = await StudentModel.findById(id)
                const imageid = student.image.public_id
                // console.log(imageid)
                await cloudinary.uploader.destroy(imageid)
                const file = req.files.image
                const image_upload = await cloudinary.uploader.upload(file.tempFilePath, ({
                    folder: 'Profile Image'
                }))
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    city: req.body.city,
                    address: req.body.address,
                    image: {
                        public_id: image_upload.public_id,
                        url: image_upload.secure_url
                    }
                }
            } else {
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    city: req.body.city,
                    address: req.body.address
                }
            }

            const update = await StudentModel.findByIdAndUpdate(id, data)
            res.redirect('/profile')
            // const update = await StudentModel.findByIdAndUpdate(id, {
            //     name: req.body.name,
            //     email: req.body.email,
            //     password: req.body.password,
            //     phone: req.body.phone,
            //     city: req.body.city,
            //     address: req.body.address
            // })
            // res.redirect('/profile')

        } catch (error) {
            console.log(error)
        }

    }
    static changepassword = async (req, res) => {
        try {
            // For Name On Dash
            const { name, email, role, image } = req.data1
            res.render('admin/student/changepassword', { n: name, role: role, img:image, msg: req.flash('error'), msg1: req.flash('success') })
        } catch (error) {
            console.log(error)
        }
    }
    static updatepassword = async (req, res) => {
        try {
            // console.log(req.body)
            const { name, email, id } = req.data1
            // for passcheck
            const { oldpassword, newpassword, cpassword } = req.body
            if (oldpassword && newpassword && cpassword) {
                const user = await StudentModel.findById(id)
                //console.log(user)
                // for password compare 
                const ismatched = await bcrypt.compare(oldpassword, user.password)
                if (!ismatched) {
                    req.flash('error', 'Old Password is incorrect') // for msg
                    res.redirect('/changepassword')
                } else {
                    if (newpassword != cpassword) {
                        req.flash('error', 'newpssword and confirmpassword does not matched ') // for msg
                        res.redirect('/changepassword')
                    } else {
                        const newhashpassword = await bcrypt.hash(newpassword, 10)
                        const r = await StudentModel.findByIdAndUpdate(id, {
                            password: newhashpassword,

                        })
                        req.flash('success', 'Password update sucessfully ') // for msg
                        res.redirect('/changepassword')

                    }
                }
            } else {
                req.flash('error', 'All Fields Are Required') // For msg 
                res.redirect('/changepassword')
            }
        } catch (error) {
            console.log(error)
        }
    }
    static logout = async (req, res) => {
        try {
            res.clearCookie("token")
            res.redirect('/')

        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = StudentController;