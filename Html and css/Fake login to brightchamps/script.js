async function LoginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");
    if (email === "" || password === "") {
        message.innerHTML = "Please enter email and password";
        return;
    }
    message.innerHTML = "Checking credentials...";
    try {
        const response = await fakeLoginApi(
            email, password
        );
        console.log("Api response: ", response);
        if (response.success) {
            message.innerHTML = "Login successful";
        }
        else {
            message.innerHTML = "Invalid email or password. ";
        }
    }
    catch (error) {
        message.innerHTML = "Server Error";
        console.log(error);
    }
}
function fakeLoginApi(email, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (email === "mysecureemail@gmail.com" && password === "my_secure_password") { resolve({ success: true, token: "abc123!!!", user: { email: email } }); }
            else {
                resolve({ success: false, message: "Wrong credentials." });
            }
        }, 2000);
    });
}