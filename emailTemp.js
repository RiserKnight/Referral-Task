const emailTemplate = (frndName,yourName) => {
    return `<html>
    <head>
        <style>
            /* Add any custom styles for your email here */
        </style>
    </head>
    <body>
        <h2>Dear ${frndName},</h2>

        <p>You have been referred by [Employee Name] as a potential candidate for our open role(s):</p>

        <h3>Software Development Engineer</h3>

        <p>We invite you to take a few moments to apply using the link(s) provided above. We look forward to reviewing your background and experiences.</p>

        <p>We appreciate every referral and review all of them diligently. While we may not be able to respond to everyone, we will be in touch if your experiences match this role.</p>

        <p>Best Regards</p>

        <h4>${yourName}</h4>

    </body>
    </html>`
}

module.exports = emailTemplate;