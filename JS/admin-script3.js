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
const db = firebase.database(app);

// Function to handle adding a patient
function addPatient(e) {
    e.preventDefault();
    const patientName = document.getElementById('patient-name').value;
    const patientEmail = document.getElementById('patient-email').value;
    const patientPhone = document.getElementById('patient-phone').value;
    const patientDOB = document.getElementById('patient-dob').value;
    const patientCondition = document.getElementById('patient-condition').value;

    // Check if Firebase is connected
    if (navigator.onLine) {
        const newPatientRef = db.ref('patients').push();
        newPatientRef.set({
            name: patientName,
            email: patientEmail,
            phone: patientPhone,
            dob: patientDOB,
            condition: patientCondition
        }).then(() => {
            alert("Patient added successfully!");
            closeModal();
            document.getElementById('add-patient-form').reset();
        }).catch((error) => {
            console.error("Error adding patient: ", error);
            alert("Error adding patient: " + error.message);
        });
    } else {
        alert("You are currently offline. Please try again when you have an internet connection.");
    }
}

// Modal handling
const modal = document.getElementById("addPatientModal");
const btn = document.getElementById("add-patient");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function closeModal() {
    modal.style.display = "none";
}

// Add patient form submit event
document.getElementById('add-patient-form').addEventListener('submit', addPatient);

// Ensure Firebase connectivity
firebase.database().ref(".info/connected").on("value", function(snapshot) {
    if (snapshot.val() === true) {
        console.log("Connected to Firebase");
    } else {
        console.log("Not connected to Firebase");
    }
});
