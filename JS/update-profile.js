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

// Function to update doctor profile
document.getElementById('update-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const doctorId = "DOCTOR_ID"; // Replace with the actual doctor ID
    const name = document.getElementById('doctor-name').value;
    const email = document.getElementById('doctor-email').value;
    const phone = document.getElementById('doctor-phone').value;
    const dob = document.getElementById('doctor-dob').value;
    const specialty = document.getElementById('doctor-specialty').value;

    db.ref('doctors/' + doctorId).set({
        name: name,
        email: email,
        phone: phone,
        dob: dob,
        specialty: specialty
    }).then(() => {
        alert('Profile updated successfully.');
    }).catch((error) => {
        console.error('Error updating profile:', error);
    });
});
