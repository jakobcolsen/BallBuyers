const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/uploads");
    },
    filename: (req, file, cb) => {
        const suffix = Date.now() + "-" + (Math.random() * 1E9);
        cb(null, suffix + path.extname(file.originalname));
    },
    onError: (err, next) => {
        if (err.message === "File too large") {
            err.message = "File too large: max size is 4MB";
            err.status = 400;
        }

        next(err);
    }
});

const fileFilter = (req, file, cb) => {
    const mimeTypes = ["image/jpeg", "image/png"];
    if (mimeTypes.includes(file.mimetype)) return cb(null, true);
    cb(new Error("Invalid file type: only .jpg, .png are allowed"));
};

exports.onError = (err, req, res, next) => {
    if (err.message === "File too large") {
        err.message = "File too large: max size is 2MB";
        err.status = 413;
    }

    next(err);
}

exports.upload = multer({storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 }}).single("image");