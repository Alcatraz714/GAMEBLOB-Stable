const joi = require("joi")

module.exports.gameSchema = joi.object({
    game : joi.object({
        name : joi.string().required(),
        desc : joi.string().required(),
        price : joi.number().required().min(0),
        dev : joi.string().required(),
        publisher : joi.string().required(),
        release : joi.date().required(),
        rating : joi.number().required(),
        sys_req : joi.string().required().pattern(/[$]+/),
        img : joi.object({
            high_res : joi.array().items(joi.string().required()).required(),
            title_img : joi.string().required(),
            logo : joi.string().allow("")
        }),
        critic : joi.object({
            name : joi.string().required(),
            review : joi.string().required()
        })
        
    }).required()
})