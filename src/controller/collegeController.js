const collegeModel = require("../model/collegeModel.js")
const mongoose = require('mongoose')

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}
const regname = /^[a-zA-Z]+([_-]?[a-zA-Z])*$/
const regfname = /^[a-zA-Z,'.\s]{0,150}$/
let urlreg = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i

const createCollege = async function (req, res) {
    try {
        data = req.body;

        //checking for the empty data
        if ((Object.keys(data).length == 0)) { return res.status(400).send({ status: false, messege: "please provide some values" }) }

        //cheking the credentials to be true
        let { name, fullName, logoLink } = data


        if (!isValid(name)) return res.status(400).send({ status: false, messege: "Please provide name" })
        if (!regname.test(name.trim())) return res.status(400).send({ status: false, message: "plese provide the name without space" })
        let uniqueName = await collegeModel.findOne({ name })
        if (uniqueName) { return res.status(400).send({ status: false, messege: "This College already exist" }) }

        if (!isValid(fullName)) return res.status(400).send({ status: false, messege: "please provide fullName" })
        if (!regfname.test(fullName.trim())) return res.status(400).send({ status: false, message: "plese provide fullname, only single space allowed " })
        
        if (!isValid(logoLink)) return res.status(400).send({ status: false, messege: "please provide logoLink" })
        if (!urlreg.test(logoLink)) return res.status(400).send({ status: false, message: "plese provide logolink in a correct format" })

        let isDeleted = req.body.isDeleted
        if (isDeleted) { return res.status(400).send({ status: false, messege: "You cant delete data" }) }

        let saveCollege = await collegeModel.create(data);
        return res.status(201).send({ status: true, data: saveCollege });
    } catch (error) {
        return res.status(500).send({ status: false, messege: error.messege })
    }
}

module.exports.createCollege = createCollege;
