import Joi from 'joi';

export const postValidate = (data) => {
  const schema = Joi.object().keys({
    title: Joi.string().min(5).required(),
    subTitle: Joi.string().min(5).required(),
    postBody: Joi.string().min(20).required(),
    imageUrl: Joi.string().min(10).required(),
  });

  const value = schema.validate(data, { abortEarly: false });
  return value;
};

export const messageValidate = (data) => {
  const schema = Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().required().email(),
    message: Joi.string().min(20).required(),
  });

  const value = schema.validate(data, { abortEarly: false });
  return value;
};

export const updateMessageValidate = (data) => {
  const schema = Joi.object().keys({
    message: Joi.string().min(20).required(),
  });
  const value = schema.validate(data, { abortEarly: false });
  return value;
};
