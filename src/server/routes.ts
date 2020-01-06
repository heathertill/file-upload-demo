import * as express from 'express';
import * as multer from 'multer';
import * as aws from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import config from '../server/config';



// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {

//         cb(null, `${Date.now()}-${file.originalname}`)
//     }
// });

// const upload = multer({ storage })

aws.config.update({
    secretAccessKey: config.multer.secretAccessKey,
    accessKeyId: config.multer.accessKeyId,
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'heathers-projects',
        key: (req, file, cb) => {
            cb(null, `fileUploadDemo-${file.originalname}`);
        },
        acl: 'public-read',
    })
});

const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});

router.post('/api/blogs', upload.single('blogImage'), (req, res) => {

    console.log('req.file.location', req.file.location);
    console.log('req.body', req.body);
    console.log(req.file.filename)
    console.log(req.file.destination)


    res.json('done');

});

export default router;