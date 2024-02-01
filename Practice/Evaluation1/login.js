let loginMessage = document.getElementById("loginMessage");

function loginAdmin() {
 
    e.preventDefault();

    let loginEmail = document.getElementById("login-email").value;
    let loginPassword = document.getElementById("login-password").value;

    if (loginEmail === "" || loginPassword === "") {
        loginMessage.innerHTML = "Please fill all the fields";
        return;
    }

let admin = JSON.parse(localStorage.getItem("admin"));

if (!admin || admin.email !== loginEmail) {
    loginMessage.innerHTML = "Admin not found";
    return;
}


    let hashedLoginPassword = btoa(loginPassword);
    if (hashedLoginPassword === admin.password) {
        loginMessage.innerHTML = "Login successful";
        loginMessage.style.color = "green";
        setTimeout(function () {
            window.location.href = "dashboard.html";
        }, 2000);
    } else {
        loginMessage.innerHTML = "Incorrect password";
    }
}

function register() {
    window.location.href = 'registration.html';
}