const registerForm = document.querySelector("form#registrationForm")

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userEmail = document.querySelector("#email").value.trim();
    const userPassword = document.querySelector("#password").value;
    const checkPassword = document.querySelector("#password2").value;
    const userFullName = document.querySelector("#fullName").value.trim();

    if (userPassword != checkPassword) {
        alert("Passwords do not match.");
    }
    else {

        try {
            const response = await fetch("http://localhost:5001/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail, password: userPassword, fullName: userFullName })

            })

            const authData = await response.json();

            if (!response.ok || response.status >= 400) {
                return alert(authData?.error || response.statusText)
            };

            location.replace('./login.html');

        } catch (error) {
            return console.error(error);
        }
    }
})