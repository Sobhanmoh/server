require('dotenv').config();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
                    const token = jwt.sign(
                        {id: school._id,
                        school_id: school._id,
                        school_name: school.school_name,
                        emage_url: school.email,
                        owner_name: school.owner_name,
                        role: "school",}
                        ,jwtSecret);

                    const jwtSecret = process.env.JWT_SECRET;

                    res.header("Authorization", token);
                    res.status(200).json({success: true, message: "Login Successfully",
                    user:{
                        id: school._id,
                        school_name: school.school_name,
                        emage_url: school.email,
                        owner_name: school.owner_name,
                        role: "school",
                    }
                });
                }else{
                     res.status(401).json({success: false, message: "Password is incorrect."});
                }

            }else{
                res.status(401).json({success: false, message: "Email is not registered."});
            }
        } catch (error) {
            res.status(500).json({success: false, message: "Internal server error {SCHOOL LOGIN!}."});
        }
     },
     getAllschools: async (req, res) => {
        try {
            const schools = await School.find().select(["-password, -email , -owner_name, -id, -createdAt"]);
            res.status(200).json({success: true, message: "Success in feching all schools", schools});
        } catch (error) {
            res.status(500).json({success: false, message: "Internal server error {SCHOOL DATA}."});
        } 
    },
    getSchoolOwnData: async (req, res) => {
        try {
            const id = "";
            const school = await School.findOne({_id: id});
            if(school){
                res.status(200).json({success: true, school});
            }else {
                res.status(404).json({success: false, message: "School not found!!!."});

            }
        } catch (error) {
            res.status(500).json({success: false, message: "Internal server error {OWN DATA}."});

        }
     },

     updateSchool: async (req, res) => {
        try {
        const id = "";
        form.parse(req, async (err, fields, files) => {

        const school = await School.findOne({_id: id});
        if(file.image){
            const photo = files.image[0];
            let filepath = photo.filepath;
            let originalFilename = photo.originalFilename.replace("","_");

            if(school.school_image){
                let oldImagePath = path.join(__dirname, process.env, SCHOOL_IMAGE_PATH, school.school_image);
                if(fs.existsSync(oldImagePath)){
                    fs.unlink(oldImagePath, (err) => {
                        if(err) Console.log("deleting old image");
                    })
                }
            }
            

            let newpath = path.join(__dirname, process.env, SCHOOL_IMAGE_PATH, originalFilename);
            let photoData = fs.readFileSync(filepath);
            fs.writeFileSync(newpath, photoData);

            Object.keys(fields).forEach(key => {
                school[field] = fields[field][0];
            })
            await school.save();
            res.status(200).json({success: true, message: "School updated successfully.", school});
        }
            
        });
        
    } catch (error) {
        res.status(500).json({success: false, message:"school registered filed."});
    }},
  }