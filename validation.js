const Joi = require('joi');


const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
  });
  return schema.validate(data);
};


const validateProject = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500),
  });
  return schema.validate(data);
};

module.exports = { validateUser, validateProject };
