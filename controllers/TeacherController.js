class TeacherController{

    static displayTeacher = async(req,res)=>{
        try{
            res.send('Display Teacher')
        }catch(error){
            console.log(error);
        }
    }
}
module.exports = TeacherController 
