const { Router } = require('express');
const FileController = require('../controller/FileController');
const router = Router();

//ADD DI
let fileController = new FileController();

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
