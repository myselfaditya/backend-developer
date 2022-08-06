const today = new Date ();

let currentdate=today.getDate()+"-"+(today.getMonth()+1)+"-"+ today.getFullYear()

const monthNames = ["January","February","March","April","May","June","July","August",
"September","October","November","December"];

const d = new Date();
let currentMonth=monthNames[d.getMonth()];

const  batchName= "Plutonium"
const  week = "W3"
const day = "d5"

let getBatchInfo = function (){
    console.log(batchName+","+(week+day)+","+"the topic for today NodeJs module system");
}
module.exports.getBatchInfo=getBatchInfo
module.exports.currentdate=currentdate
module.exports.currentMonth=currentMonth

