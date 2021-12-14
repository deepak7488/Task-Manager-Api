const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const Task = require("../../src/models/task")
const User = require("../../src/models/user")
const userid = new mongoose.Types.ObjectId()
const userone = {
    _id: userid,
    "name": 'abhishek Kumar',
    email: "deepak.kmr@iiitg.ac.in",
    password: "Deepak@2001",
    age: 20,
    tokens: [{
        token: jwt.sign({ _id: userid }, process.env.JWT_SECRETS)
    }]
}
const usertwoid = new mongoose.Types.ObjectId()
const usertwo = {
    _id: usertwoid,
    "name": 'Deepak Kumar',
    email: "deepak.kumars@iiitg.ac.in",
    password: "Deepak@2001",
    age: 21,
    tokens: [{
        token: jwt.sign({ _id: usertwoid }, process.env.JWT_SECRETS)
    }]
}
const taskone = {
    _id: new mongoose.Types.ObjectId(),
    description: "First tasks",
    completed: false,
    owner: userid
}
const tasktwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "Second tasks",
    completed: true,
    owner: userid
}
const taskthird = {
    _id: new mongoose.Types.ObjectId(),
    description: "third tasks",
    completed: true,
    owner: usertwoid
}
const setupDatabase = async() => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userone).save()
    await new User(usertwo).save()
    await new Task(taskone).save()
    await new Task(tasktwo).save()
    await new Task(taskthird).save()
}
module.exports = {
    userid,
    userone,
    usertwo,
    usertwoid,
    taskone,
    tasktwo,
    taskthird,
    setupDatabase
}