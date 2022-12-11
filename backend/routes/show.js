// router
const router = require('express').Router()
// model import
const File = require('../models/file')

// function to try and get data from database with dynamic parameter uuid
// and render download page else in catch return err
router.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid })

        // if file not present return error
        // in download section
        if (!file) {
            return res.render('download', { error: 'link has expired' })
        }

        // generate a download page with the details to download the file
        return res.render('download', {
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            // download link
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        })
    }
    catch (err) {
        return res.render('download', { err: 'something went wrong' })
    }
});

module.exports = router;
