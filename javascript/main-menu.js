// Firebase modules are loaded from Firebase's browser CDN.
// @ts-ignore - URL module declarations are not included with TypeScript.
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// @ts-ignore - URL module declarations are not included with TypeScript.
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const auth = getAuth(initializeApp(firebaseConfig));
const logoutButton = document.querySelector("#logoutButton");

onAuthStateChanged(auth, async (user) => {
    if (!user || !user.emailVerified) {
        if (user) {
            await signOut(auth);
        }
        window.location.replace("./Login.html");
        return;
    }

    document.body.classList.remove("d-none");
});

logoutButton?.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "./Login.html";
});
