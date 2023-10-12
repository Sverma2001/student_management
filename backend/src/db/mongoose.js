const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://sverma:Sachin2001@cluster0.zj1nipu.mongodb.net', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true, // Enable SSL  
})

.then(()=>{
    console.log("MongoDb connected successfully")
}).catch((err)=>{
    console.log(err)
})