class Users {
  constructor() {}

  async signUp(req, res, next) {
    try {
      const { body } = req;
      res.send("SignUp");
    } catch (err) {
      res.send(err);
    }
  }

  async signIn(req, res, next) {
    try {
      const { body } = req;
      res.send("SignIn");
    } catch (err) {
      res.send(err);
    }
  }
}

module.exports = new Users();
