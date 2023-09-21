const ComplaintModel = require('../models/Complaint')

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dvhcd5oaz',
    api_key: '377969336692132',
    api_secret: 'ck52LMl4pM1JvZikeMw0cZNtx00'
})

class ComplaintController {
    static addcomplaint = async (req, res) => {
        try {
            const { name, email, role, image, id } = req.data1
            const cdata = await ComplaintModel.find({user_id:id})
            res.render('complaint/addcomplaint', { n: name, role: role, img: image, user_id: id, c: cdata })
        } catch (error) {
            console.log(error)
        }
    }
    static complaintinsert = async (req, res) => {
        try {
            const { name, email, role, image, id } = req.data1
            // console.log(req.body)
            // console.log(req.files.image)
            const { ctype, semester, subject, cdetail, user_id } = req.body
            const complaint = await ComplaintModel.findById(id)
            const file = req.files.image
            const image_upload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'complaints image',
            })
            const r = new ComplaintModel({
                name: name,
                email: email,
                ctype: ctype,
                cdetail: cdetail,
                semester: semester,
                subject: subject,
                user_id: id,
                image: {
                    public_id: image_upload.public_id,
                    url: image_upload.secure_url
                }
            })
            await r.save()
            // console.log(r)
            res.redirect('/addcomplaint')


        } catch (error) {
            console.log(error)
        }
    }
    static viewcomplaint = async (req, res) => {
        try {
            // console.log(req.params.id);
            const { name, email, role, image, id } = req.data1
            //    console.log(req.params.id)
            const cdata = await ComplaintModel.findById(req.params.id)
            // console.log(cdata);
            res.render('complaint/view', { c: cdata, n: name, role: role, img: image, user_id: id })
        } catch (error) {
            console.log(error);
        }
    }
    static complaintedit = async (req, res) => {
        try {
            // console.log(req.params.id);
            const { name, email, role, image, id } = req.data1
            const cdata = await ComplaintModel.findById(req.params.id)
            // console.log(cdata);
            res.render('complaint/edit', { c: cdata, n: name, role: role, img: image, user_id: id })
        } catch (error) {
            console.log(error);
        }
    }
    static complaintupdate = async (req, res) => {
        try {
            // console.log(req.body);
            // console.log(req.files.image);
            const { name, email, role, image, id } = req.data1
            // const { ctype, semester, subject, cdetail, user_id} = req.body
            if (req.files) {
                const complaint = await ComplaintModel.findById(req.params.id)
                // console.log(id);
                const imageid = complaint.image.public_id
                // console.log(imageid);
                await cloudinary.uploader.destroy(imageid)
                const file = req.files.image
                const image_upload = await cloudinary.uploader.upload(file.tempFilePath, ({
                    folder: 'complaint Image'
                }))
                var cdata = {
                    ctype: req.body.ctype,
                    semester: req.body.semester,
                    subject: req.body.semester,
                    cdetail: req.body.cdetail,
                    image: {
                        public_id: image_upload.public_id,
                        url: image_upload.secure_url
                    }
                }
                // console.log(cdata);

            } else {
                var cdata = {
                    ctype: req.body.ctype,
                    semester: req.body.semester,
                    subject: req.body.semester, 
                    cdetail: req.body.cdetail,
                }
            }
            const user_id = req.params.id
            const update = await ComplaintModel.findByIdAndUpdate(user_id, cdata)
            // console.log(cdata);
            res.redirect('/addcomplaint')

        } catch (error) {
            console.log(error);
        }
    }
    static complaintdelete = async(req,res)=>{
        try{
            await ComplaintModel.findByIdAndDelete(req.params.id)
            res.redirect('/addcomplaint')
        }catch(error){
            console.log(error);
        }
    }
    static updatestatus = async(req,res)=>{
        try{
            const{name,email,comment,status} = req.body
            // console.log(req.body)
            await ComplaintModel.findByIdAndUpdate(req.params.id,{
                comment:comment,
                status:status
            })
            res.redirect('/displaycomplaint')
        }catch(error){
            console.log(error)
        }
     }
}
module.exports = ComplaintController