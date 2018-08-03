var express = require('express');
var router = express.Router();
var multer  = require('multer');
var multerS3 = require('multer-s3')
var AWS = require('aws-sdk');

const path = require('path'); 
const configPath = path.join(__dirname, '..', "config.json");
AWS.config.loadFromPath(configPath);
var s3 = new AWS.S3();

var image_upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'avenueproperty/images',
    acl: 'public-read',  
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

var video_upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'avenueproperty/videos',
    acl: 'public-read',  
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});
//var video_upload = multer({ dest: 'public/video_uploads/' });
//var brochure_upload = multer({ dest: 'public/brochure_uploads/' });


/* GET home page. */
router.post('/image_upload',image_upload.array('image_uploads',10), function (req, res, next) {
    res.send(req.files);
});

router.post('/video_upload',video_upload.array('video_uploads',10), function (req, res, next) {
    
    res.send(req.files);
});
router.post('/brochure_upload',image_upload.array('brochure_uploads',1), function (req, res, next) {
    
    res.send(req.files);
});


module.exports = router;
