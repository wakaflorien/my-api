export const response = (res, statusCode, statusMessage, message, data) => {
  if (statusMessage == 'success' && data) {
    return res
      .status(statusCode)
      .json({ status: statusMessage, message: message, data: data });
  } else if (statusMessage == 'success') {
    return res
      .status(statusCode)
      .json({ status: statusMessage, message: message });
  } else {
    return res
      .status(statusCode)
      .json({ status: statusMessage, error: message });
  }
};
