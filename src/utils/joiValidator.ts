import * as Joi from 'joi';



const userRegister = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),

});
const userLogin = Joi.object({

    email: Joi.string().email().required(),
    password: Joi.string().required(),

});







export { userRegister, userLogin }