const app = require('./app')
const port = process.env.PORT || 3000;
app.listen(port, () => {
        console.log('server is up on port ' + port + "!")
    })
    //  const { findByIdAndU pdate, findByIdAndDelete } = require('./models/user');
    //automaticaly changes to req to json
    //  app.use((req, res, next) => {
    //      if (req.method == 'GET') {
    //          res.send("GET Requests are disabled")
    //      }
    //      // res.send(req.method + " " + req.path + " ");
    //      next();
    //  })

//  const Task = require('./models/task')
//  const User = require('./models/user')

//  const main = async() => {
//      //  const task = await Task.findById('6166bc3eb0c50c10543627b4')
//      //  await task.populate('owner').execPopulate()
//      //  console.log(task.owner)
//      const user = await User.findById('6166bb0cd1dec324c064239e')
//      await user.populate('tasks').execPopulate()
//      console.log(user.tasks)
//  }
//  const multer = require('multer')
//  const upload = multer({
//      dest: 'images'
//  })
//  app.post('/upload', upload.single('upload'), async(req, res) => {
//          res.send()
//      })
//  main()

//  const pet = {
//      name: "hen"
//  }
//  pet.toJSON = function() {
//      return { name: "lol" }
//  }
//  console.log(JSON.stringify(pet)); //calls pet.toJOSN
//  const jwt = require('jsonwebtoken')
//  const myFunction = async() => {
//      const token = await jwt.sign({ _id: 'abc123' }, 'thisismynewtoken', { expiresIn: '7 days' })
//      console.log(token)
//      const data = await jwt.verify(token, 'thisismynewtoken')
//      console.log(data)
//  }
//  myFunction();
// const bcrypt = require('bcryptjs')
// const myFunction = async() => {
//     const password = "Deepak@2001";
//     const hashedPassword = await bcrypt.hash(password, 8);
//     console.log(password);
//     console.log(hashedPassword);
//     const isMatch = await bcrypt.compare("Deepak@2001", hashedPassword);
//     console.log(isMatch);
// }
// myFunction()
// const User = require('./models/user')
// const Task = require('./models/tasks.js');