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

// Function to handle adding a doctor
function addDoctor(e) {
    e.preventDefault();
    const doctorName = document.getElementById('doctor-name').value;
    const doctorEmail = document.getElementById('doctor-email').value;
    const doctorPhone = document.getElementById('doctor-phone').value;
    const doctorDOB = document.getElementById('doctor-dob').value;
    const doctorSpecialty = document.getElementById('doctor-specialty').value;

    // Check if Firebase is connected
    if (navigator.onLine) {
        const newDoctorRef = db.ref('doctors').push();
        newDoctorRef.set({
            name: doctorName,
            email: doctorEmail,
            phone: doctorPhone,
            dob: doctorDOB,
            specialty: doctorSpecialty
        }).then(() => {
            alert("Doctor added successfully!");
            closeModal();
            document.getElementById('add-doctor-form').reset();
        }).catch((error) => {
            console.error("Error adding doctor: ", error);
            alert("Error adding doctor: " + error.message);
        });
    } else {
        alert("You are currently offline. Please try again when you have an internet connection.");
    }
}

// Modal handling
const modal = document.getElementById("addDoctorModal");
const btn = document.getElementById("add-doctor");
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

// Add doctor form submit event
document.getElementById('add-doctor-form').addEventListener('submit', addDoctor);

// Ensure Firebase connectivity
firebase.database().ref(".info/connected").on("value", function(snapshot) {
    if (snapshot.val() === true) {
        console.log("Connected to Firebase");
    } else {
        console.log("Not connected to Firebase");
    }
});
