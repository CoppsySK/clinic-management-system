// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0w5fc73WS6x-UrPsLcBrOZSBSFoA0whQ",
    authDomain: "intern2-6a933.firebaseapp.com",
    databaseURL: "https://intern2-6a933-default-rtdb.firebaseio.com",
    projectId: "intern2-6a933",
    storageBucket: "intern2-6a933.appspot.com",
    messagingSenderId: "949411148901",
    appId: "1:949411148901:web:f01530cb50ff72e759828c"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

document.addEventListener("DOMContentLoaded", function() {
    const doctorLoginForm = document.getElementById("doctor-login-form");
    const adminLoginForm = document.getElementById("admin-login-form");
    const doctorRegistrationForm = document.getElementById("doctor-registration-form");

    if (doctorLoginForm) {
        doctorLoginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            
            // Authenticate doctor
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Login successful
                    window.location.href = "doctor-dashboard.html";
                })
                .catch((error) => {
                    document.getElementById("error-message").textContent = error.message;
                });
        });
    }

    if (adminLoginForm) {
        adminLoginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            
            // Authenticate admin
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Login successful
                    window.location.href = "admin-dashboard.html";
                })
                .catch((error) => {
                    document.getElementById("error-message").textContent = error.message;
                });
        });
    }

    if (doctorRegistrationForm) {
        doctorRegistrationForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const fullname = e.target.fullname.value;
            const specialization = e.target.specialization.value;
            const email = e.target.email.value;
            const password = e.target.password.value;

            // Register doctor
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const doctorRef = db.ref('doctors/' + user.uid);
                    doctorRef.set({
                        fullname: fullname,
                        specialization: specialization,
                        email: email
                    });
                    // Registration successful
                    window.location.href = "admin-dashboard.html";
                })
                .catch((error) => {
                    document.getElementById("error-message").textContent = error.message;
                });
        });
    }
});
