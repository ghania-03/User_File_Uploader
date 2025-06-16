const username = new URLSearchParams(window.location.search).get('username');
document.getElementById('dashboardHeader').innerText = `WELCOME! ${username}`;
document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]');
    formData.append('file', fileInput.files[0]);

    fetch(`/upload?username=${username}`, {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then(msg => {
            alert(msg);
            window.location.reload();
        });
});

fetch('/files')
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById('fileList');
        list.innerHTML = '';

        if (Array.isArray(data)) {
            // Normal user
            const group = document.createElement('div');
            group.className = 'user-image-group';

            const grid = document.createElement('div');
            grid.className = 'image-grid';

            data.forEach(file => {
                grid.innerHTML += `
          <div class="image-item">
            <img src="/uploads/${username}/${file}" />
            <p>${file}</p>
            <button onclick="deleteFile('${file}')">Delete</button>
          </div>`;
            });

            group.appendChild(grid);
            list.appendChild(group);
        } else {
            // Admin view
            for (let user in data) {
                const group = document.createElement('div');
                group.className = 'user-image-group';
                group.innerHTML = `<h3>${user}</h3>`;

                const grid = document.createElement('div');
                grid.className = 'image-grid';

                data[user].forEach(file => {
                    const isAdminFile = user === username;
                    grid.innerHTML += `
            <div class="image-item">
              <img src="/uploads/${user}/${file}" />
              <p>${file}</p>
              ${isAdminFile ? `<button onclick="deleteFile('${file}')">Delete</button>` : ''}
            </div>`;
                });

                group.appendChild(grid);
                list.appendChild(group);
            }
        }
    });


function deleteFile(file) {
    fetch(`/delete/${file}`, { method: 'DELETE' })
        .then(res => res.text())
        .then(msg => {
            alert(msg);
            window.location.reload();
        });
}

document.getElementById('signoutBtn').addEventListener('click', function () {
    window.location.href = 'index.html'; // or wherever your login page is
});
