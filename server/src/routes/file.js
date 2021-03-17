const { Router } = require('express');
const FileController = require('../controller/FileController');
const FileService = require('../services/FileService');
const S3DAO = require('../dao/S3DAO');
const UserDAO = require('../dao/UserDAO');
const FileDAO = require('../dao/FileDAO');
const User = require('../models/User');
const File = require('../models/File');
const S3 = require('../utils/S3Instance');
const router = Router();

//ADD DI
let fileController = new FileController(
  new FileService(new S3DAO(S3), new UserDAO(User), new FileDAO(File))
);

//  @desc Details
//  @route get /files/:id
router.get('/files/:id', fileController.getInfo);

//  @desc Upload
//  @route POST /files
router.post('/files/upload', fileController.upload);

//  @desc Download
//  @route get /files/download/:id
router.get('/files/:id/download', fileController.download);

//  @desc Get All files
//  @route get /files
router.get('/files', fileController.getList);

//  @desc Delete
//  @route delete /files/:id
router.delete('/files/:id', fileController.delete);

//  @desc Public URL
//  @route get /files/:id/public
router.get('/files/:id/public', fileController.getPublicLink);

module.exports = router;
