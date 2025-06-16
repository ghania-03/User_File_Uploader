const fs = require('fs');
const path = require('path');
const multer = require('multer');

const upload = multer({ dest: path.join(__dirname, '../uploads/') });

const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../users.json'), 'utf-8'));

let currentUser = null;

function loginUser(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  return user ? { success: true, user } : { success: false };
}

function uploadFile(req, res) {
  const username = req.query.username;
  if (!username) return res.status(400).send('Username is required');
  if (!req.file) return res.status(400).send('No file uploaded');

  const userDir = path.join(__dirname, '../uploads', username);
  if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });

  const oldPath = req.file.path;
  const newPath = path.join(userDir, req.file.originalname);

  fs.rename(oldPath, newPath, err => {
    if (err) return res.status(500).send('Error saving file');
    res.send('File uploaded successfully');
  });
}

function getFiles(req, res) {
  const username = currentUser.username;
  const role = currentUser.role;

  if (role === 'admin') {
    const allUsers = fs.readdirSync(path.join(__dirname, '../uploads'));
    const allFiles = {};
    allUsers.forEach(user => {
      const userPath = path.join(__dirname, '../uploads', user);
      allFiles[user] = fs.existsSync(userPath)
        ? fs.readdirSync(userPath)
        : [];
    });
    res.json(allFiles);
  } else {
    const userPath = path.join(__dirname, '../uploads', username);
    const files = fs.existsSync(userPath) ? fs.readdirSync(userPath) : [];
    res.json(files);
  }
}

function deleteFile(req, res) {
  const filename = req.params.filename;
  const username = currentUser.username;
  const role = currentUser.role;

  const filePath = path.join(__dirname, '../uploads', username, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(403).send('You can only delete your own files');
  }

  fs.unlink(filePath, err => {
    if (err) return res.status(500).send('Error deleting');
    res.send('Deleted successfully');
  });
}

function setCurrentUser(user) {
  currentUser = user;
}

module.exports = { upload, loginUser, uploadFile, getFiles, deleteFile, setCurrentUser };