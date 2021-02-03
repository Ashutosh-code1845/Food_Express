const express=require('express');
const path=require('path')
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const app=express();
const port=80;
const hostname="127.0.0.1"

mongoose.connect('mongodb://localhost/food_express',{useNewUrlParser:true,useUnifiedTopology:true});
var  data=mongoose.connection;
data.on('error',console.error.bind,'Sorry,Can not get connected to database ')
data.once('open',function(){
    console.log("Yeah...We are now connected")
})

var contactSchema= new mongoose.Schema({
    myname:String,
    myemail:String,
    mynumber:String,
    myquery:String
})


app.use(express.urlencoded({ extended: true }))
app.use(express.urlencoded())
 var mymodel=mongoose.model('contact_details',contactSchema)

app.use('/static',express.static('static'))


app.get('/',(req,res) =>{
    res.status(200).sendFile(path.join(__dirname,'/views/FoodOrderPage.html'));
})
app.post('/', (req,res) => {


    console.log(req.body)
    // Method One
    // data.collection("contact_details").insertOne(req.body,function (err,obj){
    //     if(err) return console.error(err);
    //     else console.log("Details saved")
    // })
    // Method 2
    var db=new mymodel(req.body)
    db.save().then(()=>{
        console.log("Data Saved")
        res.status(200).sendFile(path.join(__dirname,'/views/submit.html'));
    }).catch(()=>{
        res.status(404).send("Sorry Can't Save")
    })



    //Below line will be commented for method 2 only but will be used in method 1
    // res.status(200).sendFile(path.join(__dirname,'/views/submit.html'));
})


app.listen(port,hostname,()=>{
    console.log("Listening on port 80")
})