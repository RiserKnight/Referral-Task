const express = require('express');
const  bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const referMailFunct = require("./emailFunct.js");
const prisma = new PrismaClient();

require('dotenv').config();

const app = express();

app.set('port', process.env.PORT);

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res)=>{
res.send("Home");
});

function checkMissingFields(requestObject) {
    const requiredFields = ["yourName", "yourEmail", "friendsName", "friendsEmail", "courseID"];
    let missingFields = [];
  
    requiredFields.forEach(field => {
      if (!requestObject.hasOwnProperty(field) || requestObject[field] === '' || requestObject[field] === null || requestObject[field] === undefined) {
        missingFields.push(field);
      }
    });
  
    if (missingFields.length > 0) {
      return {
        status: false,
        missingFields: missingFields
      };
    } else {
      return {
        status: true,
        missingFields: []
      };
    }
  }

  function validateRequestData(requestObject) {
    let invalidFields = [];
  
    // Validate yourName
    if (typeof requestObject.yourName !== 'string' || requestObject.yourName.trim() === '') {
      invalidFields.push("yourName");
    }
  
    // Validate yourEmail
    if (!validateEmail(requestObject.yourEmail)) {
      invalidFields.push("yourEmail");
    }
  
    // Validate friendsName
    if (typeof requestObject.friendsName !== 'string' || requestObject.friendsName.trim() === '') {
      invalidFields.push("friendsName");
    }
  
    // Validate friendsEmail
    if (!validateEmail(requestObject.friendsEmail)) {
      invalidFields.push("friendsEmail");
    }
  
    // Validate courseID
    if (!validateCourseID(requestObject.courseID)) {
      invalidFields.push("courseID");
    }
  
    if (invalidFields.length > 0) {
      return {
        status: false,
        invalidFields: invalidFields
      };
    } else {
      return {
        status: true,
        invalidFields: []
      };
    }
  }
  
  // Helper function to validate email format
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Helper function to validate courseID
  function validateCourseID(courseID) {
    return Number.isInteger(courseID) && courseID > 0;
  }


app.post('/store',async(req,res)=>{
    let code="000",response={"status":"","msg":"","details":""};
    const data =req.body;
    try 
    {
        
        const resp1=checkMissingFields(data);

        if(!resp1.status)
            {
                code="400";
                response.status=code;
                response.msg="Missing fields";
                response.details=resp1.missingFields;
                throw new Error(response.msg);
            }
    
        const resp2=validateRequestData(data);
    
        if(!resp2.status)
            {
                code="400";
                response.status=code;
                response.msg="Invalid fields";
                response.details=resp2.invalidFields;
                throw new Error(response.msg);
            }

        const existingEnrollment = await prisma.enrollment.findFirst({
            where: {
              yourEmail: data.yourEmail,
              friendsEmail: data.friendsEmail,
              courseID: data.courseID,
            },
          });
        
        if(existingEnrollment !== null)
            {
                code="200"; 
                throw new Error("Already Reffered");
            }
            

        const newEnrollment = await prisma.enrollment.create({data});
        referMailFunct.mail(req,res,data)
        console.log(newEnrollment);
    } 
    catch (error) 
    {
        if (code === "000") {
            code = "500";
        }
        console.log(error);    
    }
    finally{
        if(code=="500"){res.json({"status":code,"msg":"Unknown Error Occured","details":error.message});}
        else if(code=="200"){res.json({"status":"403","msg":"Already Reffered","details":req.body});}
        else if(code=="400"){res.json(response);}
        else 
        {
            referMailFunct.mail(req,res,data)
            res.json({"status":"100","msg":"Referal Done Successfully","details":req.body});
        }
    }
    });

app.listen(app.get('port'), async()=> {
    console.log(`Server started on port ${app.get('port')}`);
});
