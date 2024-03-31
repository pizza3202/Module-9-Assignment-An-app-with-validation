const form = document.getElementById("registration");
form.addEventListener("submit", validateForm);
function validateForm(event) {
    event.preventDefault(); 
    let isValid = true; 
    clearErrorMessages();
    isValid = isValid && validateName();
    isValid = isValid && validateYearOfBirth();
    isValid = isValid && validateZipcode();
    isValid = isValid && validatePassword();
    isValid = isValid && validatePizzaPreference();
    if (isValid) {
        displaySuccess();
    }
}
function validateName() {
    const name = document.getElementById("input-name").value.trim();
    if (name.length < 3) {
        displayError("input-name", "Name is required and must be at least three characters.");
        return false;
    }
    return true;
}
function validateYearOfBirth() {
    const yearOfBirth = document.getElementById("input-yearofbirth").value.trim();
    const year = parseInt(yearOfBirth, 10);
    if (isNaN(year) || year <= 1900 || year >= 2100) {
        displayError("input-yearofbirth", "Year of birth must be between 1901 and 2099.");
        return false;
    }
    return true;
}

function validateZipcode() {
    const isUsResident = document.getElementById("usResidentCheckbox").checked;
    const zipcode = document.getElementById("input-zipcode").value.trim();
    if (isUsResident && (zipcode.length !== 5 || isNaN(parseInt(zipcode, 10)))) {
        displayError("input-zipcode", "Zipcode must be a 5-digit number.");
        return false;
    }
    return true;
}

function validatePassword() {
    const password = document.getElementById("input-password").value;
    if (password.length < 8) {
        displayError("input-password", "Password must be at least 8 characters long.");
        return false;
    }
    return true;
}

function validatePizzaPreference() {
    const pizzaPreference = document.querySelector('input[name="pizzaPreference"]:checked');
    if (!pizzaPreference) {
        displayError("pizza-preference-container", "Please select your preferred type of pizza.");
        return false;
    }
    return true;
}
function clearMessages() {
    const container = document.querySelector('.container');
    const messages = container.querySelectorAll('.success-message, .error-message');
    messages.forEach(msg => container.removeChild(msg));
}

function displayError(elementId, message) {
    const element = document.getElementById(elementId);
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = message;
    if (element) {
        element.parentNode.insertBefore(errorMessage, element.nextSibling);
    } else {
        const container = document.querySelector("#" + elementId);
        if (container) {
            container.appendChild(errorMessage);
        }
    }
}

function clearErrorMessages() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(msg => msg.remove());
}

function displaySuccess() {
    const container = document.querySelector('.container');
    const existingSuccessMessage = container.querySelector('.success-message');
    if (existingSuccessMessage) {
        container.removeChild(existingSuccessMessage);
    }
    const successMessage = document.createElement("div");
    successMessage.classList.add("success-message");
    successMessage.textContent = "Form Submitted Successfully!";
    container.appendChild(successMessage);
}

