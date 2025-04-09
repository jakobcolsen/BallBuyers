const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/uploads");
    },
    filename: (req, file, cb) => {
        const suffix = Date.now() + "-" + (Math.random() * 1E9);
        cb(null, suffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const mimeTypes = ["image/jpeg", "image/png"];
    if (mimeTypes.includes(file.mimetype)) return cb(null, true);
    cb(new Error("Invalid file type: only .jpg, .png are allowed"));
};

exports.upload = multer({storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 }}).single("image");