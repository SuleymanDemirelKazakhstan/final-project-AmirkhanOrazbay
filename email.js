var nodemailer = require('nodemailer');


// sendMailTo(2);

async function sendMailTo(user) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tbtofficialservice@gmail.com',
            pass: 'google29326769',
        }
    });

    let info = await transporter.sendMail({
        from: 'tbtofficialservice@gmail.com', // sender address
        to: user.email, // list of receivers
        subject: "TBT ✔", // Subject line
        text: "Sign up to TBT?", // plain text body
        html: `<b>Sign up to TBT</b><br>
                <b>Hello my dear ${user.name}</b><br>
                <b><a href='https://tbt-todo-tables.df.r.appspot.com/login'>Log in</a></b>`, // html body
    });

    console.log("Message sent: %s", info.auth);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports.sendMailTo = sendMailTo;