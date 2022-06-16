import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SERVER_EMAIL,
        pass: process.env.SERVER_PASSWORD
    }
})

export const mandarEmail =(email, attachments )=> {
    transporter.sendMail({
        from: process.env.SERVER_EMAIL,
        to: email,
        subject: `Entradas del evento`,
        attachments 
    })
}