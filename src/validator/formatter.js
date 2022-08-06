const a ="         My Name is Aditya Suhas Patil          "

let stringTrim= function(){
    let b=a.trim()
    console.log(b)
}

const changeToLowerCase = function(){
    let lowercase=a.toLowerCase()
    console.log(lowercase);
}

const changeToUpperCase = function(){
    let uppercase=a.toUpperCase()
    console.log(uppercase);
}
module.exports.changeToUpperCase=changeToUpperCase
module.exports.changeToLowerCase=changeToLowerCase
module.exports.stringTrim=stringTrim




