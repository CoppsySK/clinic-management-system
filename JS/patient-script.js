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

document.addEventListener('DOMContentLoaded', function() {
    const doctorSelect = document.getElementById('doctor');
    
    // Fetch doctors from Firebase and populate the select dropdown
    const doctorsRef = db.ref('doctors');
    doctorsRef.on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const doctor = childSnapshot.val();
            const option = document.createElement('option');
            option.value = doctor.name;
            option.textContent = doctor.name;
            doctorSelect.appendChild(option);
        });
    });

    const bookAppointmentForm = document.getElementById('book-appointment-form');
    bookAppointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const doctor = document.getElementById('doctor').value;
        const appointmentDate = document.getElementById('appointment-date').value;
        const appointmentTime = document.getElementById('appointment-time').value;

        const newAppointmentRef = db.ref('appointments').push();
        newAppointmentRef.set({
            doctor: doctor,
            date: appointmentDate,
            time: appointmentTime
        }).then(() => {
            alert('Appointment booked successfully!');
            bookAppointmentForm.reset();
        }).catch((error) => {
            console.error('Error booking appointment:', error);
        });
    });
});
