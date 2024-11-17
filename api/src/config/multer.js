import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const s3Client = new S3Client({
    region: process.env.AWS_DEFAULT_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, file.key);
            });
        }
    }),
    s3: multerS3({
        s3: s3Client,
        bucket: 'systembucketaws',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, fileName);
            });
        }
    })
};

const multerConfig = {
    storage: storageTypes["s3"],
    limits: {
        fileSize: 4 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png'
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type"));
        }
    }
};

export default multerConfig;