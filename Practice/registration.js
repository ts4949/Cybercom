function registerAdmin() {
    e.preventDefault();

    if (localStorage.getItem("admin")) {
        message.innerHTML = "Admin already registered!";
        return;
    }

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (name === "" || email === "" || password === "") {
        message.innerHTML = "Please fill all the fields";
        return;
    }

    let hashedPassword = btoa(password);

    let admin = { name, email, password: hashedPassword };
    localStorage.setItem("admin", JSON.stringify(admin));

    form.reset();

    message.innerHTML = "Admin registration successful";
    message.style.color = "green";

    document.querySelector("button[type='submit']").style.display = "none";

    setTimeout(function () {
        window.location.href = "login.html";
    }, 2000);
}