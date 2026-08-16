"use strict";
const emailElement = document.querySelector("#verificationEmail");
const email = new URLSearchParams(window.location.search).get("email");
if (emailElement) {
    emailElement.textContent = email || "your email address";
}
