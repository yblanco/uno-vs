

module.exports = async (req, res, next) => {
  try{
    const noAuth = ['/', '/status', '/auth/app_id'];
    const { originalUrl, secret_request:secret, body, jwt, logger } = req;
    const { info = false } = body;
    if(noAuth.indexOf(originalUrl) === -1 && info !== false){
    await jwt.decode(info)
    .then(data => {
      req.decode = data;
    })
    .catch(err => {
      const error = new Error('Unathorized');
      error.status = 403;
      logger.error(`Decode failed on ${originalUrl} for string ${info}`);
      throw error;
    });
  }
  } catch(err) {
    return next(err);
  }
  next();
}
