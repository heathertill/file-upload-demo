import * as express from 'express';
import * as multer from 'multer';
import * as aws from 'aws-sdk';
import * as multerS3 from 'multer-s3';



// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {

//         cb(null, `${Date.now()}-${file.originalname}`)
//     }
// });

aws.config.update({
    secretAccessKey: '',
    accessKeyId: '',
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'heathers-projects',
        key: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
        acl: 'public-read'
    })
});

const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});

router.post('/api/blogs', upload.single('blogImage'), (req, res) => {
    console.log('req.file.location', req.file.location);
    console.log('req.body', req.body);
    res.json('Blogs Test');
});

export default router;