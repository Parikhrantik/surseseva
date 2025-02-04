
const multer = require('multer');
const path = require('path');
const stream = require('stream');
const { Storage } = require('@google-cloud/storage');

const keyFilePath = path.resolve(__dirname, '../../googlekey.json');
// const keyFilePath = path.resolve(__dirname, './googlekey.json');
console.log('Key file path:', keyFilePath);
// Initialize Google Cloud Storage
const storage = new Storage({ keyFilename: '../../googlekey.json' });
// const storage = new Storage({ keyFilename: './googlekey.json' });
const bucketName = 'surseseva';
const bucket = storage.bucket(bucketName);


async function testAuth() {
    try {
        const [buckets] = await storage.getBuckets();
        console.log('Buckets:', buckets.map(bucket => bucket.name));
    } catch (err) {
        console.error('Authentication error:', err);
    }
}

testAuth();
// Custom Multer Storage Engine for GCP
const multerStorage = multer({
    storage: multer.memoryStorage(), // Use memoryStorage for multer
    limits: { fileSize: 100 * 1024 * 1024 }, // Limit file size to 100MB
    fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('audio/') || file.mimetype.startsWith('video/') || file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only audio and video files are allowed'));
        }
    },
});

// Stream the uploaded file directly to GCP bucket
const uploadToGCP = (file) =>
    new Promise((resolve, reject) => {
        const blob = bucket.file(Date.now() + path.extname(file.originalname)); // Unique filename
        const blobStream = blob.createWriteStream({
            resumable: false,
            metadata: {
                contentType: file.mimetype,
            },
        });

        blobStream
            .on('error', (err) => {
                console.error('Error uploading to GCP:', err);
                reject(err);
            })
            .on('finish', () => {
                // Make the file publicly accessible and resolve with URL
                blob.makePublic().then(() => {
                    const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
                    resolve(publicUrl);
                });
            })
            .end(file.buffer);
    });
// Middleware to handle file uploads and upload to GCP
const GCPuploader = (fieldName) => [
    multerStorage.single(fieldName), // Handle file upload for the given field
    async (req, res, next) => {
        try {
            // If no file is uploaded, skip GCP upload and proceed
            if (!req.file) {
                console.log('No file uploaded; skipping GCP upload.');
                return next();
            }

            // Upload file to GCP and get the URL
            const publicUrl = await uploadToGCP(req.file);
            console.log('File uploaded successfully:', publicUrl);

            // Attach the file URL to the request for downstream middlewares
            req.fileUrl = publicUrl;

            // Proceed to the next middleware
            next();
        } catch (err) {
            console.error('Upload error:', err);
            res.status(500).json({ message: 'Failed to upload file', error: err.message });
        }
    },
];

module.exports = GCPuploader;
