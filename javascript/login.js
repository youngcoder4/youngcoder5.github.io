// Firebase modules are loaded from Firebase's browser CDN.
// @ts-ignore - URL module declarations are not included with TypeScript.
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// @ts-ignore - URL module declarations are not included with TypeScript.
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
// @ts-ignore - URL module declarations are not included with TypeScript.
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyCSK9Nldu6ReAWUhxMUaMS4buLbmuZxXSY",
    authDomain: "fir-eb725.firebaseapp.com",
    projectId: "fir-eb725",
    storageBucket: "fir-eb725.firebasestorage.app",
    messagingSenderId: "820917159382",
    appId: "1:820917159382:web:3fbcf25457b5027171d077",
    measurementId: "G-RME6LZEH95"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
try {
    getAnalytics(app);
}
catch (error) {
    console.warn("Firebase Analytics is unavailable in this browser.", error);
}
const form = document.querySelector("#loginForm");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#exampleInputEmail1");
const passwordInput = document.querySelector("#exampleInputPassword1");
const fileInput = document.querySelector("#formFile");
const status = document.querySelector("#loginStatus");
const showPasswordButton = document.querySelector("#showPassword");
const usernameError = document.querySelector("#usernameError");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const fileError = document.querySelector("#fileError");
const passwordGroup = document.querySelector("#passwordGroup");
showPasswordButton?.addEventListener("click", () => {
    if (!passwordInput)
        return;
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    showPasswordButton.textContent = isHidden ? "🙈" : "👁";
    showPasswordButton.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
});
const requiredFields = [
    ...(usernameInput && usernameError ? [{ input: usernameInput, outlineTarget: usernameInput, error: usernameError }] : []),
    ...(emailInput && emailError ? [{ input: emailInput, outlineTarget: emailInput, error: emailError }] : []),
    ...(passwordInput && passwordError && passwordGroup ? [{ input: passwordInput, outlineTarget: passwordGroup, error: passwordError }] : []),
    ...(fileInput && fileError ? [{ input: fileInput, outlineTarget: fileInput, error: fileError }] : [])
];
function validateField(field) {
    const isEmpty = field.input.type === "file" ? !field.input.files?.length : !field.input.value.trim();
    const hasInvalidImage = field.input.type === "file" && !!field.input.files?.[0] && !field.input.files[0].type.startsWith("image/");
    const hasWeakPassword = field.input === passwordInput && !isValidPassword(field.input.value);
    const isInvalid = isEmpty || hasInvalidImage || hasWeakPassword || !field.input.checkValidity();
    field.outlineTarget.classList.toggle("input-missing", isInvalid);
    field.error.classList.toggle("d-none", !isInvalid);
    field.error.textContent = isEmpty
        ? "You didn't fill out this option."
        : hasInvalidImage
            ? "Please upload an image file."
            : hasWeakPassword
                ? "Password must be at least 13 characters and include an uppercase letter and a special character."
                : "Please enter a valid email address.";
    return !isInvalid;
}
function isValidPassword(password) {
    return password.length >= 13 && /[A-Z]/.test(password) && /[^A-Za-z0-9]/.test(password);
}
requiredFields.forEach((field) => {
    field.input.addEventListener(field.input.type === "file" ? "change" : "input", () => validateField(field));
});
form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!status || !usernameInput || !emailInput || !passwordInput)
        return;
    const firstInvalidField = requiredFields.find((field) => !validateField(field));
    if (firstInvalidField) {
        form?.classList.remove("shake");
        void form?.offsetWidth;
        form?.classList.add("shake");
        firstInvalidField.input.focus();
        firstInvalidField.input.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
    }
    status.className = "mt-3 mb-0 text-muted";
    status.textContent = "Creating your account...";
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
        await updateProfile(userCredential.user, { displayName: usernameInput.value });
        await sendEmailVerification(userCredential.user);
        window.location.href = `./VerifyEmail.html?email=${encodeURIComponent(userCredential.user.email || emailInput.value)}`;
    }
    catch (error) {
        status.className = "mt-3 mb-0 text-danger";
        status.textContent = error instanceof Error ? error.message : "Unable to create your account. Please try again.";
    }
});
