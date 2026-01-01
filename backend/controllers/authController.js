import { registerService, loginService } from "../services/authServices.js";
const register = async (req, res) => {
  try {
    console.log(req.file, req.body);
    let user = await registerService({
      ...req.body,
      user_img: `/uploads/${req.file.filename}`,
    });
    res.status(201).json({ message: "user registred succesfully", user: user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    let { user, msg, token } = await loginService(req.body);
    res.status(200).json({ message: msg, user: user, token: token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { login, register };
