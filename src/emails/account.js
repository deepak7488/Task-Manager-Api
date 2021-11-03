const sgmail = require('@sendgrid/mail')
    //const sendgridAPIKey = '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'
sgmail.setApiKey(process.env.SENDGRID_API_KEY)
    // sgmail.send({
    //     to: "deepak.kumar@iiitg.ac.in",
    //     from: "lollipoplagelu19@gmail.com",
    //     subject: "This is my first creation",
    //     text: "Hello baby how are you"
    // })
const sendWelcomemail = (email, name) => {
    sgmail.send({
        to: email,
        from: "lollipoplagelu19@gmail.com",
        subject: "Thankyou for chosing our app",
        text: `Hey ${name},Thank you for chosing our app,Hope you like it`
    })
}
const sendCancelemail = (email, name) => {
    sgmail.send({
        to: email,
        from: "lollipoplagelu19@gmail.com",
        subject: "Sorry to see you go!",
        text: `Goodbye, ${name},I hope to see you back sometime soon.`
    })
}
module.exports = { sendWelcomemail, sendCancelemail }