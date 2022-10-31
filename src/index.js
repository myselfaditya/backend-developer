const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

const moment = require('moment')
const time = moment()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    function(req,res,next){
        console.log('Global middleware is On')
        console.log(time.format('YYYY,MM,DD'))
        console.log(time.format('h:mm:ss'))
        console.log(req.ip)
        console.log(req.originalUrl)
        next()
    }
)

//create a middleware using app.use(functionName) so that this piece of code gets called everytime any api is called
 
// const assignmentMW= function (req, res, next) {
//     var currentdate = new Date(); 
//     var datetime =  currentdate.getDate() + " "
//                     + (currentdate.getMonth()+1)  + " " 
//                     + currentdate.getFullYear() + "  "  
//                     + currentdate.getHours() + ":"  
//                     + currentdate.getMinutes() + ":" 
//                     + currentdate.getSeconds();
 
//     let ip= req.ip
//     let url= req.originalUrl
//     console.log(`${datetime}  ${ip}  ${url}`)
//     next()    
// }
 
// app.use( assignmentMW )


mongoose.connect("mongodb+srv://iamaditya:gbCsJkKLQc8U2oyp@cluster0.brptf5o.mongodb.net/Middleware_DB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use('/', route);

app.use (
    function (req, res, next) {
        console.log ("inside GLOBAL MW");
        res.send({msg:"done"})
  }
  );


app.listen(process.env.PORT || 8000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 8000))
});
