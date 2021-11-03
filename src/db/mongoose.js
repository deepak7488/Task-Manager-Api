const mongoose = require('mongoose')
    // const validator = require('validator')
mongoose.connect(process.env.MONGODB_URL, {

    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
})

// const me = new User({
//     name: "Deepak Kumar      ",
//     age: 19,
//     email: "dEEpak.kumar@iiitg.ac.in",
//     password: 'Deepak@2001'
// })
// const task1 = new Task({
//         description: "Drink tea",
//         // completed: true
//     })
// me.save().then(result => {
//         console.log("Success ", result);
//     }).catch(error => {
//         console.log("Error! ", error)
//     })
// task1.save().then(() => {
//     console.log("Succsess", task1);
// }).catch(error => {
//     console.log("Error! ", error);
// })