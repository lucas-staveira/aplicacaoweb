var express = require('express')
const res = require('express/lib/response')
var router = express.Router()

/*GET NEW USER PAGE */
router.get('user', (req, res) => {
  res.render('user', {title: 'Cadastro de Usuário'})
})

/* GET home page. */
router.get('/', async (req, res) => {
  const db = require("../db");
  const Users = db.Mongoose.model('users', db.UserSchema, 'users');
 
  const docs = await Users.find({}).lean().exec();
  res.render('index', { docs });
});

/*GET Nova página de usuário*/

router.get('/user', (req, res) => {
  res.render('user', {title: 'Cadastro de Usuário'})
})

/*POST NOVO USUARIO */
router.post('/user', async(req,res) => {
  const username = req.body.username;
  const email=req.body.email;

  const db = require("../db")
  const Users = db.Mongoose.model('users', db.UserSchema, 'users')
  const user = new Users({username, email})

  try {
    await user.save()
    res.redirect("/")
  } catch (err) {
    next(err)
  }
})

module.exports = router;
