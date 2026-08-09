// Firebase modules are loaded from Firebase's browser CDN.
// @ts-ignore - URL module declarations are not included with TypeScript.
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// @ts-ignore - URL module declarations are not included with TypeScript.
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
// @ts-ignore - URL module declarations are not included with TypeScript.
import { getAuth, reload, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
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
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const status = document.querySelector("#loginStatus");
const showPasswordButton = document.querySelector("#showPassword");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
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
    ...(emailInput && emailError ? [{ input: emailInput, outlineTarget: emailInput, error: emailError }] : []),
    ...(passwordInput && passwordError && passwordGroup ? [{ input: passwordInput, outlineTarget: passwordGroup, error: passwordError }] : [])
];
function validateField(field) {
    const isEmpty = !field.input.value.trim();
    const isInvalid = isEmpty || !field.input.checkValidity();
    field.outlineTarget.classList.toggle("input-missing", isInvalid);
    field.error.classList.toggle("d-none", !isInvalid);
    field.error.textContent = isEmpty ? "You didn't fill out this option." : "Please enter a valid value.";
    return !isInvalid;
}
requiredFields.forEach((field) => field.input.addEventListener("input", () => validateField(field)));
form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!status || !emailInput || !passwordInput)
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
    status.textContent = "Logging in...";
    try {
        const userCredential = await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
        await reload(userCredential.user);
        if (!userCredential.user.emailVerified) {
            await signOut(auth);
            status.className = "mt-3 mb-0 text-danger";
            status.textContent = "Your email is not verified. Please use the verification link sent to your email before logging in.";
            return;
        }
        status.className = "mt-3 mb-0 text-success";
        status.textContent = "You are logged in. Opening the main menu...";
        window.location.href = "./MainMenu.html";
    }
    catch (error) {
        status.className = "mt-3 mb-0 text-danger";
        status.textContent = error instanceof Error ? error.message : "Unable to log in. Please try again.";
    }
});
