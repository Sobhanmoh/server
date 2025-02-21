require('dotenv').config();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const bycrypt = require('bcryptjs');

const School = require('../models/school.model');
const { mainModule } = require('process');


module.exports = {
    registerSchool: async (req, res) => {
        try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            const photo = files.image[0]
            let filepath = photo.filepath;
            let originalFilename = photo.originalFilename.replace("","_");
            let newpath = path.join(__dirname, process.env, SCHOOL_IMAGE_PATH, originalFilename);

            let photoData = fs.readFileSync(filepath);
            fs.writeFileSync(newpath, photoData);

            const salt = await bycrypt.genSalt(10);
            const hashedPassword = await bycrypt.hash(fields.password[0], salt);
            const newSchool = new School({
                school_name: fields.school_name[0],
                email: fields.email[0],
                owner_name: fields.owner_name[0],
                password: hashedPassword,
            });

            const savedSchool = await newSchool.save();
            res.status(200).json({success: true, Data : savedSchool, message: "School Registered Successfully"});
        });
        
    } catch (error) {
        res.status(500).json({success: false, message:"school registered filed."});
    }},


    loginSchool: async (req, res) => {

        try {
            const school = await School.findOne({email: req.body.email});
            if(school){
                const isAuth = await bycrypt.compare(req.body.password, school.password);
                if(isAuth){
                    // res.status(200).json({success: true, message: "Login Successfull"});

                }else{
                    // res.status(400).json({success: false, message: "Password is incorrect."});
                }

            }else{
                res.status(400).json({success: false, message: "Email is not registered."});
            }
        } catch (error) {
            
        }
     }    
}