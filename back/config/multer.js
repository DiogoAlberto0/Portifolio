const multer = require('multer');
const crypto = require('crypto')

const path = require('path')

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', 'tmp', 'uploads'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err)

                file.key = `${hash.toString('hex')}-${file.originalname}`

                cb(null, file.key)
            })
        }
    })
}

const multerUploadConfig = {
    dest: path.resolve(__dirname, '..', 'tmp', 'uploads'),
    storage: storageTypes.local,
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const alowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/jpg',
            'image/png',
            'image/gif'
        ]

        if(alowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Invalid file type'))
        }
    }
}

module.exports = app => multer(multerUploadConfig).single('image')
