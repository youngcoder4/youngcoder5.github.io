// @ts-ignore - URL module declarations are not included with TypeScript.
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// @ts-ignore - URL module declarations are not included with TypeScript.
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyCSK9Nldu6ReAWUhxMUaMS4buLbmuZxXSY",
    authDomain: "fir-eb725.firebaseapp.com",
    projectId: "fir-eb725",
    storageBucket: "fir-eb725.firebasestorage.app",
    messagingSenderId: "820917159382",
    appId: "1:820917159382:web:3fbcf25457b5027171d077",
    measurementId: "G-RME6LZEH95"
};
const auth = getAuth(initializeApp(firebaseConfig));
onAuthStateChanged(auth, async (user) => {
    if (!user || !user.emailVerified) {
        if (user)
            await signOut(auth);
        window.location.replace("./Login.html");
        return;
    }
    document.body.classList.remove("d-none");
});
