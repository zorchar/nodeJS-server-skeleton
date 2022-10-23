const jwt = require("jsonwebtoken");

const Professor = require("../models/professorModel");

const authProfessor = async (req, res, next) => {
  try {
    const token = req.get("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.SECRET);

    const professor = await Professor.findOne({
      _id: data._id,
      "tokens.token": token,
    });

    if (!professor) {
      const err = new Error("Unable to login");
      err.status = 401;
      throw err;
    }

    req.token = token;
    req.professor = professor;
    next();
  } catch (error) {
    error.status = 401;
    error.message = "no authentication";
    next(error);
  }
};

module.exports = authProfessor;
