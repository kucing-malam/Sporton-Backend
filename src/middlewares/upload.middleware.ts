import fs from "fs"
import path from "path"
import multer from "multer"

const uploadDir = path.join(__dirname, "../uploads")

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        const uniqueSufix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        cb(null, uniqueSufix + path.extname(file.originalname))
    },
})

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb(new Error("Only Image are allowed"))
    }
}

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {fileSize: 5 * 1024 * 1024}
})