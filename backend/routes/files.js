const router = require('express').Router();
const multer = require('multer');

// path gives extension of the uploaded file
const path = require('path');
const File = require('../models/file');

// stores unique uuid for file to store in db

// WHY UUID: cz its so unique that no one with one download link
// would be able to change the id and download other previous documents
// if it was just 1,2,3.. others could be able to download by entering previous index
const { v4: uuidv4 } = require('uuid');


// diskStorage Returns a StorageEngine implementation configured
// to store files on the local file system.
let storage = multer.diskStorage({

    // destination stores file at given folder
    destination: (req, file, cb) => cb(null, 'uploads/'),
    // gives filename
    filename: (req, file, cb) => {

        // create a unique file name
        // path.extname takes extension name from file and saves it as same
        // 38974612841-129834729432.png
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName)
    },
});

// handle uploading of file and store it in uploads section with multer

// middleware for handling form-data, ie used for uploading files

// storage returns multer instance providing
// methods for generating middleware that process uploaded files
// storage: storage,
let upload = multer({ storage, limits: { fileSize: 1000000000 * 100 }, }).single('myfile'); //100mb

router.post('/', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        const file = new File({
            filename: req.file.filename,
            // gets unique uuid 

            uuid: uuidv4(),

            // gets path from destination + filename recieved from multer
            path: req.file.path,
            size: req.file.size
        });

        // response will give download link

        // save this with await while upload is async
        const response = await file.save();
        res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
        // download link will look like
        // http://localhost:3000/files/234dfhsebrg-2342dvsdvsdk

    });
});
module.exports = router;