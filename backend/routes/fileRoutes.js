const express = require('express');
const router = express.Router();
const controller = require('../controllers/fileController');

// Login route
router.post('/login', (req, res) => {
  const result = controller.loginUser(req.body.username, req.body.password);
  if (result.success) {
    controller.setCurrentUser(result.user);
    res.redirect(`/dashboard.html?username=${result.user.username}`);
  } else {
    res.send('Invalid credentials');
  }
});

// File upload
router.post('/upload', controller.upload.single('file'), controller.uploadFile);

// Get files for user/admin
router.get('/files', controller.getFiles);

// Delete file 
router.delete('/delete/:filename', controller.deleteFile);

module.exports = router;
