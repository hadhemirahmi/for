import multer from "multer";
import path from "path";

// creation un mecanisme de stockage !
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
    //176454545454.jpg
  },
});
let upload = multer({ storage });

export default upload;
