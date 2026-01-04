import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
/*
data = {
email : password: username ;, course 

*/
async function registerService(data) {
  try {
    let existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error("email deja utilisé");
    }
    let hashedPassword = await bcrypt.hash(data.password, 10);
    let newUser = new User({ ...data, password: hashedPassword });
    await newUser.save();
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

async function loginService(data) {
  try {
    let user = await User.findOne({ email: data.email });
    if (!user) {
      throw new Error("email non existant");
    }
    let isMatch = await bcrypt.compare(data.password, user.password);
    if (isMatch == false) {
      throw new Error("mot de passe erroné");
    }
    if (user.account_status == "pending") {
      throw new Error("votre compte est non encore activé");
    }
    if (user.account_status == "disabled") {
      throw new Error("votre compte est suspendu");
    }
    //lazemni nrajja3 jeton d'acces lel frontend houni
    let token = jwt.sign({ user: user }, process.env.JWT_SECRET_KEY);

    return { user: user, msg: "connecté avec succes !", token: token };
  } catch (err) {
    throw new Error(err.message);
  }
}

export { loginService, registerService };
