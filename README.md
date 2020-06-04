# CoronaMapMakerAPI
This is the backend for the CoronaMapMaker

#Method POST


/api/register
@Params
body: {
    "id_user": "number > 2 digits",
    "first_name": "string > 2 digits",
    "last_name": "string > 2 digits",
    "password": "string > 6 digits"
}
Content-Type: application/json
@Errors
Validation Error: Status 400
Id already exist in the database: Status 400
Database error: Status 400
@Returns
when success: Status 200
{
    savedUser: {user},
    results: {resuls of database}
}


/api/login
@Params
body: {
    "id_user": "number",
    "password": "string"
}
Content-Type: application/json
@Error
Validation error: Status 400
The id is not registered in the database: Status 400
Invalid password: Status 400
@Returns
JSON  Web Token as response, it expires in 1H: Status 200


/user/addSymptomToUser
@Params
body: {
	"id_user":"number",
	"cod_symptom":"number"
}
header:
auth-token: JWToken
Content-Type: application/json
@Error
Validation error: Status 400
The id is not registered in the database: Status 400
The id of the symptom does not exist: Status 400
@Returns{
  results: Results of query,
  user: User added,
  symptom:Symptom added
}


/user/registerPlace
@Params
body: {
	"cod_place":"any number, it auto increment byself",
	"place_name": "string > 1 digit",
	"latitude_place": "float number",
	"longitude_place": "float number"
}
header:
auth-token: JWToken
Content-Type: application/json
@Error
Validation error: Status 400
The exact latitude and longitude exist in the database: Status 400
@Returns{
  savedPlace: Place added,
  results: Results of the query
}


/user/addDestinationToUser
@Params
body: {
	"id_user": "number > 2 digits",
	"cod_place": "number",
	"time_destination":"date in format YYYY-MM-dd hh-mm-ss"
}
header:
auth-token: JWToken
Content-Type: application/json
@Error
Validation error: Status 400
The id of the user is not registered in the database: Status 400
The id of the place does not exist: Status 400
@Returns{
  results: Results of the query,
  user: User added,
  place: Place added
}

#Method GET

/user/findUserById
@Params
body:{
	"id_user":"number"
}
header:
auth-token: JWToken
Content-Type: application/json
@Error
The id of the user is not registered in the database: Status 400
@Returns
[
{user}
]


/user/allUsers
header:
auth-token: JWToken
@Returns
[
{user_1},{user_2},{user_n},
]


/user/allSymptoms
header:
auth-token: JWToken
@Error
There are not Symptoms registered: Status 400
@Returns
[
{symptom_1},{symptom_2},{symptom_n},
]


/user/allSymptomsOfUser
@Params
body: {
	"id_user": "number",
}
header:
auth-token: JWToken
Content-Type: application/json
@Error
Validation error: Status 400
The id of the user is not registered in the database: Status 400
@Returns
[
{symptomOfUser_1},{symptomOfUser},{symptomOfUser_n},
]


/user/allDestinationsOfUser
@Params
body: {
	"id_user": "number",
}
header:
auth-token: JWToken
Content-Type: application/json
@Error
Validation error: Status 400
The id of the user is not registered in the database: Status 400
@Returns
[
{destinationOfUser_1},{destinationOfUser},{destinationOfUser_n},
]


/user/findAllPlaces
header:
auth-token: JWToken
@Returns
[
{place_1},{place_2},{place_n},
]

#Method PUT

/user/editUser
@Params
body: {
    "id_user": "number > 2 digits",
    "first_name": "string > 2 digits",
    "last_name": "string > 2 digits",
    "password": "string > 6 digits"
}
header:
Content-Type: application/json
auth-token: JWToken
@Errors
Validation Error: Status 400
Id already exist in the database: Status 400
Database error: Status 400
@Returns
when success: Status 200
{
    savedUser: {user},
    results: {resuls of database}
}

#Method DELETE

/user/deleteSymtomFromUser
@Params
body: {
	"id_user":"number",
	"cod_symptom":"number"
}
header:
Content-Type: application/json
auth-token: JWToken
@Errors
The id of the user is not registered in the database: Status 400
The id of the symptom does not exist: Status 400
@Returns
when success: Status 200
{
    results: {resuls of database},
    user: {user},
    symptom: {symptom}
    
}
