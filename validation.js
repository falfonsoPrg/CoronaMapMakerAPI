const Joi = require('@hapi/joi')

const registerValidation = (data) => {
    const schema = Joi.object({
        id_user: Joi.number().min(2).required(),
        first_name: Joi.string().min(2).required(),
        last_name: Joi.string().min(2).required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        id_user: Joi.number().min(2).required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

const placeValidation = (data) => {
    const schema = Joi.object({
        cod_place: Joi.number().required(),
        place_name: Joi.string().min(1).required(),
        latitude_place: Joi.number().required(),
        longitude_place: Joi.number().required()
    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.placeValidation = placeValidation
