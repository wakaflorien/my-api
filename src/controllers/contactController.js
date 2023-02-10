import { response } from '../helpers/response';
import Contact from '../models/Contact';
import { messageValidate, updateMessageValidate } from '../validation/postValidSchema';

export const getAllMessage = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ dateCreated: -1 });
    response(res, 200, 'success', 'All messages', messages);
  } catch (error) {
    response(res, 400, 'fail', "Couldn't get messages");
  }
};

export const addMessage = async (req, res) => {
  try {
    const { fullName, email, message } = req.body;

    const { error } = messageValidate(req.body);
    if (error) {
      response(res, 400, 'fail', error.details[0].message);
    } else {
      const result = await Contact.create({
        fullName: fullName,
        email: email,
        message: message,
      });
      response(res, 201, 'success', 'message added', result);
    }
  } catch (error) {
    console.log(error);
    response(res, 500, 'fail', 'internal server error');
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Contact.findOne({ _id: id });

    if (!message) {
      response(res, 404, 'fail', 'message does not exist');
    } else {
      response(res, 200, 'success', 'message found', message);
    }
  } catch (error) {
    console.log(error);
    response(res, 500, 'fail', 'internal server error');
  }
};

export const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    const { error } = updateMessageValidate(req.body);
    if (error) {
      response(res, 400, 'fail', 'enter correct fields');
    }

    const getMessage = await Contact.findOne({ _id: id });
    if (!getMessage) {
      response(res, 404, 'fail', 'message does not exist');
    } else {
      getMessage.message = message;
      const result = await getMessage.save();

      response(res, 200, 'success', 'message updated', result);
    }
  } catch (error) {
    response(res, 500, 'fail', 'internal server error');
  }
};
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Contact.findByIdAndDelete({ _id: id });
    if (!message) response(res, 404, 'fail', 'message does not exist');
    response(res, 200, 'success', 'message deleted');
  } catch (error) {
    response(res, 500, 'fail', 'internal server error');
  }
};
