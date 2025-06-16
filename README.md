# User File Uploader

This is a simple user-based file upload web application built using Node.js, Express, and basic HTML, CSS, and JavaScript.

It includes:
- A login system with role-based access (admin and regular users)
- File upload functionality for each user
- File listing and deletion
- Admin access to view all users' uploaded files
- A basic frontend interface

---

## Features

- Login system with user roles defined in `users.json`
- Users can upload image files
- Users can view and delete only their own files
- Admin can view uploaded files of all users
- Uploaded files are stored in user-specific folders
- Frontend provides upload and file list interface

---

## Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- File Handling: multer, fs (file system module)
- Data Storage: JSON file for users

---

## Folder Structure

<pre>
project/
├── frontend/
│   ├── index.html
│   ├── dashboard.html
│   ├── styles.css
│   └── script.js
│
├── backend/
│   ├── controllers/
│   │ └── fileController.js
│   ├── routes/
│   │ └── fileRoutes.js
│   ├── uploads/   (auto-created to store uploaded files)
│   ├── users.json
│   └──server.js

</pre>
---

## Sample Users for Testing

| Username | Password  | Role   |
|----------|-----------|--------|
| admin    | admin123  | admin  |
| user1    | pass1     | user   |
| user2    | pass2     | user   |
| user3    | pass3     | user   |
| user4    | pass4     | user   |

---

## How to Run the Project

1. Clone the repository:
     -   git clone https://github.com/ghania-03/User_File_Uploader.git
     -   cd User_File_Uploader
3. Move to the backend folder and install dependencies:
     - cd backend
     - npm install
4. Start the server (through terminal):
     - node server.js
6. Open your browser and go to:
    - http://localhost:3000

---

## Notes

- The `uploads` folder will be automatically created when a user uploads a file.
- Each user's files are stored inside `uploads/{username}`.
- Only logged-in users can access upload and file management features.
- Admin has access to all users' uploads, while regular users can only manage their own.

---

## License

This project is intended for learning and demonstration purposes only.
