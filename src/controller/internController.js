const collegeModel = require('../model/collegeModel')
const internModel = require("../model/internModel")
const mongoose = require('mongoose')

//--------------------------create Intern--------------------------//

const createIntern = async function (req, res) {
    try {
        data = req.body
        let { name, mobile, email, collegeName,isDeleted } = data

        if (!name) { return res.status(400).send({ status: false, msg: " intern name is mandatory" }) }

        if (!mobile) { return res.status(400).send({ status: false, msg: "mobile no. is mandatory" }) }

        if (!email) { return res.status(400).send({ status: false, msg: "email is mandatory" }) }


        //-------mobile validation-------------//
        let isValidMobile = function (mobile) { return /^(\()?\d{3}(\))?(|\s)?\d{3}(|\s)\d{4}$/.test(mobile) }
        if (!isValidMobile(mobile)) { return res.status(400).send({ status: false, messege: "invalid mobile no." }) }

        let uniqueMobile = await internModel.findOne({ mobile })
        if (uniqueMobile) { return res.status(400).send({ status: false, messege: "this mobile number already exist" }) }

        //-----------email validation----------------//

        const validEmail = function (email) { return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email) }
        if (!validEmail(email)) { return res.status(400).send({ status: false, message: "provide email in correct format e.g. xyz@abc.com " }) }

        const uniqueEmail = await internModel.findOne({ email })
        if (uniqueEmail) {
            return res.status(400).send({ staus: false, msg: "email already exist " })
        }
        let iscollegeId = await collegeModel.findOne({ name: collegeName }).select({ _id: 1 });
        if (!iscollegeId) {
            return res.status(400).send({ status: false, message: "college name is not exist" });
        }
        let id = iscollegeId._id.toString()
        console.log(id)
        data.collegeId = id
        if (isDeleted == true) {
            res.status(400).send({ status: false, message: "Cannot input isDeleted as true while registering" });
            return;
        }
        const createData = await internModel.create(data)
        return res.status(201).send({ status: true, data: createData });

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}
//========================getDetails===================================
const getIntership = async function (req, res) {
    try {
        const collegeName = req.query.collegeName
        if (!collegeName) return res.status(400).send({ status: false, messege: "please provide college Name" })
        const saveData = await collegeModel.findOne({ name: collegeName });

        if (!saveData) return res.status(400).send({ status: false, messege: "No college appears with this college name" });
        const saveInterns = await internModel.find({ collegeId: saveData._id }).select({ name: 1, email: 1, mobile: 1 })
        if (saveInterns.length == 0) {
            return res.status(400).send({ status: false, message: "No interns data availabe in college" })
        }
        const data = {
            name: saveData.name,
            fullName: saveData.fullName,
            logoLink: saveData.logoLink,
            interns: saveInterns
        }
        return res.status(200).send({ data: data });
    } catch (error) {
        res.status(500).send({ status: false, messege: error.message })
    }
}

module.exports = { createIntern }
module.exports.getIntership = getIntership