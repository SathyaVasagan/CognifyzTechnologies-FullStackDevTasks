document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("password").addEventListener("input", checkPasswordStrength);
});

// Function to check password strength
function checkPasswordStrength() {
    const password = document.getElementById("password").value;
    const strengthIndicator = document.getElementById("password-strength");

    let strength = "Weak";
    let color = "red";

    if (password.length > 8 && /[A-Z]/.test(password) && /\d/.test(password) && /\W/.test(password)) {
        strength = "Strong";
        color = "green";
    } else if (password.length > 6 && (/[A-Z]/.test(password) || /\d/.test(password))) {
        strength = "Medium";
        color = "orange";
    }

    strengthIndicator.innerText = `Password Strength: ${strength}`;
    strengthIndicator.style.color = color;
}

// Form validation before submission
function validateForm() {
    let isValid = true;
    
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let age = document.getElementById("age").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    document.getElementById("nameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("phoneError").innerText = "";
    document.getElementById("ageError").innerText = "";
    document.getElementById("confirmPasswordError").innerText = "";

    if (name.length < 3) {
        document.getElementById("nameError").innerText = "Name must be at least 3 characters.";
        isValid = false;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").innerText = "Invalid email format.";
        isValid = false;
    }

    let phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        document.getElementById("phoneError").innerText = "Phone must be 10 digits.";
        isValid = false;
    }

    if (age < 18 || age > 100) {
        document.getElementById("ageError").innerText = "Age must be between 18 and 100.";
        isValid = false;
    }

    if (password !== confirmPassword) {
        document.getElementById("confirmPasswordError").innerText = "Passwords do not match!";
        isValid = false;
    }

    return isValid;
}

// Function to navigate between pages dynamically
function navigateTo(page) {
    history.pushState(null, "", page);
    
    if (page === "success") {
        document.body.innerHTML = `
            <div class='container text-center mt-5'>
                <h2>✅ Success! Form Submitted.</h2>
                <button onclick="navigateTo('home')" class="btn btn-primary mt-3">Back</button>
            </div>`;
    } else {
        location.reload();
    }
}

// Handle browser back/forward button
window.onpopstate = function () {
    location.reload();
};
