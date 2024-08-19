import User from '@/model/userModel';
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'

export const sendEmail = async ({email, emailType, userId}:any) => {
    try {

        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,
                {$set: {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000} }
            )
        } else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId,
               {$set: { forgotPasswordToken: hashedToken, forgotTokenExpiry: Date.now() + 3600000} }
            )
        }

        const  transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "16d575a9719c7e",
              pass: "f10177767b70fb"
            }
          });


        const mailOptions = {
        from: 'shivam@shivam.ai', // sender address
        to: email, // list of receivers
        subject: emailType === 'VERIFY' ? "Verify your email": "Reset your password" , // Subject line
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transporter.sendMail(mailOptions)

        return mailResponse

    } catch (error:any) {
        throw new Error(error.message)
    }
}