const router = require('express').Router();
const File = require('../models/file');


router.get('/:uuid', async (req, res) => {
    const file = await File.findOne({ uuid: req.params.uuid })


    // if file not present return error
    // in download section
    if (!file) {
        return res.render('download', { error: 'link has expired' })
    }

    // to download file we need filepath
    // if you check database you will find each file has mentioned file.path
    const filePath = `${__dirname}/../${file.path}`;

    // downloading in express just require res.download(filepath)
    res.download(filePath);

})

module.exports = router;