const router = require('express').Router()
const db = require("../db/db")
const verify = require('./verifyToken')
const bcrypt = require('bcryptjs')

const {registerValidation,placeValidation} = require('../validation')

router.post('/newPlace',verify,async (req,res)=>{
    res.send({status:200})
})

router.put('/editUser',verify, async (req,res)=>{
    //Validation
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Check if the id do not exist
    const id = await db.findUserById(req.body.id_user)
    if(!id[0]) return res.status(400).send('The id is not registered in the database')

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
        //update a user in the database
        const results = await db.editUser(user);
        res.send({savedUser:user,result:results})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/allUsers',verify, async (req,res) => {
    try {
        const results = await db.findAllUsers();
        res.send(results)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/allSymptoms',verify, async (req,res) => {
    try {
        const results = await db.findAllSymptoms();
        if(!results[0]) return res.status(400).send('There are not Symptoms registered')
        res.send(results)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/addSymptomToUser',verify, async (req,res) => {
    //Check if the id of the user do not exist
    const idUser = await db.findUserById(req.body.id_user)
    if(!idUser[0]) return res.status(400).send('The id of the user is not registered in the database')

    //Check if the id of the symptom do not exist
    const idSymptom = await db.findSymptomById(req.body.cod_symptom)
    if(!idSymptom[0]) return res.status(400).send('The id of the symptom does not exist')

    try {
        const results = await db.addSymptomToUser(req.body);
        res.send({results:results,user:idUser[0],symptom:idSymptom[0]})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/deleteSymtomFromUser/:id_user/:cod_symptom',verify, async (req,res) => {
    //Check if the id of the user do not exist
    const idUser = await db.findUserById(req.params.id_user)
    if(!idUser[0]) return res.status(400).send('The id of the user is not registered in the database')

    //Check if the id of the symptom do not exist
    const idSymptom = await db.findSymptomById(req.params.cod_symptom)
    if(!idSymptom[0]) return res.status(400).send('The id of the symptom does not exist')

    const deleted = {
        id_user : req.params.id_user,
        cod_symptom: req.params.cod_symptom
    }
    try {
        const results = await db.deleteSymptomFromUser(deleted);
        res.send({results:results,user:idUser[0],symptom:idSymptom[0]})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/allSymptomsOfUser/:id_user',verify, async (req,res) => {
    //Check if the id of the user do not exist
    const idUser = await db.findUserById(req.params.id_user)
    if(!idUser[0]) return res.status(400).send('The id of the user is not registered in the database')

    try {
        const results = await db.findSymptomsOfUserById(req.params.id_user);
        res.send(results)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/registerPlace',verify, async (req,res) => {
    //Validation
    const {error} = placeValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Check if the exact position exist in the database, latitude and longitude
    const exist = await db.findPlaceByLatAndLong({lat:req.body.latitude_place,long:req.body.longitude_place})
    if(exist[0]) return res.status(400).send('The exact latitude and longitude exist in the database')
    console.log(exist[0])
    const place = {
        cod_place: req.body.cod_place,
        place_name: req.body.place_name,
        latitude_place: req.body.latitude_place,
        longitude_place: req.body.longitude_place
    }

    try {
        const results = await db.registerPlace(place);
        res.send({savedPlace:place,results:results})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/addDestinationToUser',verify, async (req,res) => {
    //Check if the id of the user do not exist
    const idUser = await db.findUserById(req.body.id_user)
    if(!idUser[0]) return res.status(400).send('The id of the user is not registered in the database')
    //Check if the id of the place do not exist
    const idPlace = await db.findPlaceById(req.body.cod_place)
    if(!idPlace[0]) return res.status(400).send('The id of the place does not exist')

    const destination = {
        id_user: req.body.id_user,
        cod_place: req.body.cod_place,
        time_destination: new Date(req.body.time_destination)
    }

    try {
        const results = await db.addDestinationToUser(destination);
        res.send({results:results,user:idUser[0],place:idPlace[0]})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/allDestinationsOfUser/:id_user',verify, async (req,res) => {
    //Check if the id of the user do not exist
    const idUser = await db.findUserById(req.params.id_user)
    if(!idUser[0]) return res.status(400).send('The id of the user is not registered in the database')

    try {
        const results = await db.findDestinationsOfUserById(req.params.id_user);
        res.send(results)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/findUserById/:id_user',verify,async (req,res) => {
    try {
        const results = await db.findUserById(req.params.id_user);
        if(!results[0]) return res.status(400).send('The id of the user is not registered in the database')
        res.send(results)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.get('/findAllPlaces',verify,async (req,res) => {
    try {
        const results = await db.findAllPlaces();
        if(!results[0]) return res.status(400).send('There are not places')
        res.send(results)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;