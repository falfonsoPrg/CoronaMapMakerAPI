const mysql = require("mysql")

var connection;

function handleDisconnect(){
    connection = mysql.createConnection({
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE
    });

    connection.connect((err) => {
        if(err){
            console.log("Error connecting to the database " + "err.stack")
            setTimeout(handleDisconnect, 2000); 
        }
        console.log("Connection to server ON, connected as id " + connection.threadId)
    })

    connection.on('error', (err) => {
        console.log("DB error",err)
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            handleDisconnect();
        }else{
            throw err
        }
    })
}

handleDisconnect();

let db = {}

db.registerUser = (user) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO USERS SET ?', user, (error, results, fields) => {
            if(error){
                return reject(error)
            }
            return resolve(results)
        })
    })
};

db.findAllUsers = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM USERS', (error, results, fields) => {
            if(error){
                return reject(error)
            }
            return resolve(results)
        })
    })
}

db.findUserById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM USERS WHERE id_user = ?', id, (error, results, fields) => {
            if(error){
                return reject(error)
            }
            return resolve(results)
        })
    })
}

db.editUser = (user) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE USERS SET first_name = ?, last_name = ?, password = ? WHERE id_user = ?', [user.first_name,user.last_name,user.password,user.id_user], (error, results, fields) => {
            if(error){
                return reject(error)
            }
            return resolve(results)
        })
    })
}


db.findAllSymptoms = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM SYMPTOMS', (error, results, fields) => {
            if(error){
                return reject(error)
            }
            return resolve(results)
        })
    })
}

db.findSymptomById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM SYMPTOMS WHERE cod_symptom = ?', id, (error, results, fields) => {
            if(error){
                return reject(error)
            }
            return resolve(results)
        })
    })
}

db.addSymptomToUser = (obj) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO USER_SYMPTOM SET ?',obj, (error, results, fields) => {
            if(error){
                return reject(error)
            }
            return resolve(results)
        })
    })
}

db.findSymptomsOfUserById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT SYMPTOMS.cod_symptom,nom_symptom FROM USER_SYMPTOM,SYMPTOMS WHERE id_user = ? and SYMPTOMS.cod_symptom=USER_SYMPTOM.cod_symptom',id, (error, results, fields) => {
            if(error){
                return reject(error)
            }
            return resolve(results)
        })
    })
}

db.deleteSymptomFromUser = (obj) => {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM USER_SYMPTOM WHERE id_user = ? and cod_symptom = ?',[obj.id_user,obj.cod_symptom], (error, results, fields) => {
            if(error){
                return reject(error)
            }
            return resolve(results)
        })
    })
}

db.registerPlace = (place) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO PLACES SET ?', place, (error, results, fields) => {
            if(error){
                return reject(error)
            }
            return resolve(results)
        })
    })
};

db.findPlaceById = (id) =>{
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM PLACES WHERE cod_place = ?',id, (error, results, fields) => {
            if(error){
                return reject(error)
            }
            return resolve(results)
        })
    })
}

db.findPlaceByLatAndLong = (obj) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM PLACES WHERE latitude_place = CAST(? AS FLOAT) AND longitude_place = CAST(? AS FLOAT)',[obj.lat,obj.long], (error, results, fields) => {
            if(error){
                return reject(error)
            }
            return resolve(results)
        })
    })
};

db.addDestinationToUser = (obj) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO DESTINATIONS SET ?',obj, (error, results, fields) => {
            if(error){
                return reject(error)
            }
            return resolve(results)
        })
    })
}

db.findDestinationsOfUserById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT PLACES.cod_place,place_name,latitude_place,longitude_place,time_destination FROM DESTINATIONS,PLACES WHERE id_user = ? and PLACES.cod_place=DESTINATIONS.cod_place',id, (error, results, fields) => {
            if(error){
                return reject(error)
            }
            return resolve(results)
        })
    })
}

db.findAllPlaces = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM PLACES', (error, results, fields) => {
            if(error){
                return reject(error)
            }
            return resolve(results)
        })
    })
}

module.exports = db;