const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userid, setupDatabase, userone, usertwoid, usertwo, taskone, tasktwo, taskthird } = require('./fixtures/db')

beforeEach(setupDatabase)
    // afterEach(() => {
    //     console.log("Hello after")
    // })
test('Should signup a new user', async() => {
    const response = await request(app).post('/users').send({
        "name": "Deepak Kumar",
        "email": "deepak.kmar@iiitg.ac.in",
        "password": "Deepak@2001",
        "age": 20
    }).expect(201)
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    expect(response.body.user.name).toBe("Deepak Kumar")
    expect(response.body).toMatchObject({
        user: {
            "name": "Deepak Kumar",
            "email": "deepak.kmar@iiitg.ac.in"
        }, //,

        token: user.tokens[0].token

    })
    expect(user.password).not.toBe("Deepak@2001")

})
test("Should login existing user", async() => {
    const response = await request(app).post('/users/login').send({
        email: userone.email,
        password: userone.password
    }).expect(200)
    const user = await User.findById(response.body.user._id)
    expect(user.tokens[1].token).toBe(response.body.token);
})
test("Should not login non-existing user", async() => {
    await request(app).post('/users/login').send({
        email: 'deepak.kumar@iiitg.ac.in',
        password: userone.password
    }).expect(400)
})
test("Should get Profile For User", async() => {
    const response = await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userone.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(response.body.user._id)
        // const user = await User.findById(userid)
    expect(user).not.toBeNull()
})
test("Should not  get Profile For Unauthorization User", async() => {
    await request(app)
        .get('/users/me')
        // .set('Authorization', `Bearer ${userone.tokens[0].token}`)
        .send()
        .expect(401)
})
test("Should delete Profile For User", async() => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userone.tokens[0].token}`)
        .send()
        .expect(200)
        // const user = await User.findById(response.body.user._id)
    const user = await User.findById(userid)
    expect(user).toBeNull()
})
test("Should not delete Profile For Unauth User", async() => {
    await request(app)
        .delete('/users/me')
        //.set('Authorization', `Bearer ${userone.tokens[0].token}`)
        .send()
        .expect(401)
})
test('Should upload avatar image', async() => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userone.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(userid)
    expect(user.avatar).toEqual(expect.any(Buffer))
})
test("Should update valid user feilds", async() => {
    await request(app).
    patch('/users/me')
        .set('Authorization', `Bearer ${userone.tokens[0].token}`).
    send({
        name: "abhi"
    }).expect(200)
    const user = await User.findById(userid)
    expect(user.name).toEqual("abhi")
})
test("Should not update invalid user feilds", async() => {
    await request(app).
    patch('/users/me')
        .set('Authorization', `Bearer ${userone.tokens[0].token}`).
    send({
            address: "abhi"
        }).expect(400)
        // const user = await User.findById(userid)
        // expect(user.name).toBe("abhik")
})