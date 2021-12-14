const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
    // const { userid, setupDatabase, userone } = require('./fixtures/db')
const { userid, setupDatabase, userone, usertwoid, usertwo, taskone, tasktwo, taskthird } = require('./fixtures/db')
beforeEach(setupDatabase)
test("Should create task for a user", async() => {
    const response = await request(app)
        .post("/tasks")
        .set('Authorization', `Bearer ${userone.tokens[0].token}`)
        .send({
            description: "From My test"
        }).expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
    expect(task.description).toEqual("From My test")
})
test("Shuold get task of auth user ", async() => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userone.tokens[0].token}`)
        .expect(200)
    expect(response.body.length).toEqual(2);
})
test("Should not delete unauth task", async() => {
    await request(app).
    delete(`/tasks/${taskone._id}`)
        .set('Authorization', `Bearer ${usertwo.tokens[0].token}`)
        .expect(404)
    const task = await Task.findById(taskone._id)
        // console.log(task)
    expect(task).not.toBeNull();
})