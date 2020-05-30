const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require("../db/db")

const {registerValidation,loginValidation} = require('../validation')

router.post('/register', async (req,res)=>{
    //Validation
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Check if is already in the database
    const checkId = await db.findUserById(req.body.id_user)
    if(checkId[0]){
        if(checkId[0].id_user) return res.status(400).send('Id already exist in the database')
    }
    
    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Create a user
    const user ={
        id_user: req.body.id_user,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: hashedPassword,
    }
    try {
        //Save a user in the database
        const results = await db.registerUser(user);
        res.send({savedUser:user,result:results})
    } catch (error) {
        res.status(400).send(error)
    }
})

//Login
router.post('/login', async (req,res)=>{
    //Validation
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Check if the email exist
    const user = await db.findUserById(req.body.id_user)
    if(!user[0]) return res.status(400).send('The id is not registered in the database')

    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password,user[0].password)
    if(!validPass) return res.status(400).send('Invalid password')

    //Create and put a token
    const token = jwt.sign({id_user:user[0].id_user},process.env.JWTOKEN,{
        expiresIn: '1h'
    })
    res.header('auth-token',token).send(token)
})

module.exports = router;