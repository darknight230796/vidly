module.exports = (handler) => {
  return async (req, res, next) => {
    try {
      console.log("called");
      await handler(req, res);
    } catch (err) {
      next(err);
    }
  };
};
