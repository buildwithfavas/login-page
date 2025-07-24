function validateForm() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error-msg");

    // const usernameRegex = /^[a-zA-Z0-9]{4,12}$/;
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!username || !password) {
        errorMsg.textContent = "Username and password cannot be empty.";
        return false;
    }

    // if (!usernameRegex.test(username)) {
    //     errorMsg.textContent = "Username must be 4–12 characters and alphanumeric.";
    //     return false;
    // }

    // if (!passwordRegex.test(password)) {
    //     errorMsg.textContent = "Password must be at least 6 characters, with letters and numbers.";
    //     return false;
    // }

    return true;
}