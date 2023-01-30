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
