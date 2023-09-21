const express = require ('express');
const FrontController = require('../controllers/FrontController');
const TeacherController = require('../controllers/TeacherController');
const AdminController = require('../controllers/admin/AdminController');
const StudentController = require('../controllers/admin/StudentController');
const route = express.Router();
const checkauth = require('../middleware/auth');
const ComplaintController = require('../controllers/ComplaintController');
const CourseController = require('../controllers/admin/CourseController');

//routing
route.get('/',FrontController.home)
route.get('/about',FrontController.about)
route.get('/grs',FrontController.grs)
route.get('/benefits',FrontController.benefits)
route.get('/features',FrontController.features)
route.get('/help',FrontController.help)
route.get('/login',FrontController.login)
route.get('/studentlogin',FrontController.studentlogin)
route.get('/deanlogin',FrontController.deanlogin)
route.get('/adminlogin',FrontController.adminlogin)


//TeacherController
route.get('/teacher/display',TeacherController.displayTeacher)

//AdminController
route.get('/dashboard',checkauth,AdminController.dashboard)
route.get('/admin/login',AdminController.login)
route.get('/admin/register',AdminController.register)
route.post('/admininsert',AdminController.admininsert)
// route.post('/admin/verifylogin',AdminController.verifylogin)
route.get('/displaycomplaint',checkauth,AdminController.displaycomplaint)


// Admin Student Controller

route.get('/admin/addstudent',checkauth,StudentController.addstudent)
route.post('/studentinsert',checkauth,StudentController.studentinsert)
route.get('/admin/studentview/:id',checkauth,StudentController.viewstudent)
route.get('/admin/studentedit/:id',checkauth,StudentController.editstudent)
route.post('/admin/studentupdate/:id',checkauth,StudentController.updatestudent)
route.get('/admin/studentdelete/:id',checkauth,StudentController.studentdelete)
route.post('/verifylogin',StudentController.verifylogin)
route.get('/logout',StudentController.logout)
route.get('/changepassword',checkauth,StudentController.changepassword)
route.get('/profile',checkauth,StudentController.profile)
route.post('/updateprofile',checkauth,StudentController.updateprofile)
route.post('/updatepassword',checkauth,StudentController.updatepassword)


// Complaint Controller
route.get('/addcomplaint',checkauth,ComplaintController.addcomplaint)
route.post('/complaintinsert',checkauth,ComplaintController.complaintinsert)
route.get('/complaint/complaintview/:id',checkauth,ComplaintController.viewcomplaint)
route.get('/complaint/complaintedit/:id',checkauth,ComplaintController.complaintedit)
route.post('/complaintupdate/:id',checkauth,ComplaintController.complaintupdate)
route.get('/complaint/complaintdelete/:id',checkauth,ComplaintController.complaintdelete)
route.post('/updatestatus/:id',checkauth,ComplaintController.updatestatus)




// admin CourseController
route.get('/admin/addcourse',checkauth,CourseController.addcourse)
route.post('/courseinsert',checkauth,CourseController.courseinsert)
route.get('/admin/courseview/:id',checkauth,CourseController.courseview )
route.get('/admin/courseedit/:id',checkauth,CourseController.courseedit)
route.post('/admin/courseupdate/:id',checkauth,CourseController.courseupdate)
route.get('/admin/coursedelete/:id',checkauth,CourseController.coursedelete)


module.exports =route;