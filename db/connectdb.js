const mongoose = require ('mongoose')
const Db_liveurl = 'mongodb+srv://rohitbhadauriya575:Rohit1997@cluster0.jpqreof.mongodb.net/grevianceportal?retryWrites=true&w=majority'
const local_url = 'mongodb://127.0.0.1:27017/grevianceportal'
const connectDb =()=>{
    return mongoose.connect(Db_liveurl)
    .then(()=>{
        console.log('connection successfully')
    }).catch((error)=>{
        console.log(error)
    })
}
module.exports= connectDb