const token = localStorage.getItem("token");

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

async function upload() {
    const file = document.getElementById("fileInput").files[0];

    if (!file) {
        alert("Please select a file");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://127.0.0.1:5050/api/upload", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token
        },
        body: formData
    });

    const data = await res.json();
    alert(data.message);
    loadFiles();
}

async function loadFiles() {
    const res = await fetch("http://127.0.0.1:5050/api/my-files", {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const data = await res.json();
    const list = document.getElementById("files");
    list.innerHTML = "";

    data.forEach(file => {
        const li = document.createElement("li");
        li.innerHTML = `
      ${file.filename}
      <button onclick="deleteFile('${file._id}')">Delete</button>
    `;
        list.appendChild(li);
    });
}

async function deleteFile(id) {
    await fetch(`http://127.0.0.1:5050/api/files/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    loadFiles();
}