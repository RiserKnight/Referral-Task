const emailTemplate  = require('./emailTemp');

require('dotenv').config();
const nodemailer = require('nodemailer');
// data is js object {"reg":"....","name":"...",}


module.exports.mail = (req,res,data)=>{

    const subject = "Referral Opportunity";

    let transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER, // replace with your email address
            pass: process.env.MAIL_PASS // replace with your email password
        }
    });

    let mailOptions = {
        from: '"Accredian Team" <205121094.somesh.harsule@gmail.com>', // sender address
        to: data.friendsEmail, 
        subject: subject, 
        html: emailTemplate(data.friendsName,data.yourName)
    };
    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (!error) {
                console.log(`Email sent to ${data.friendsEmail}`);
                res.status(200).json({ message: `Email sent succesfully` });
            } 
        });
    } catch (error) {
        console.log(error);
    }

   

}