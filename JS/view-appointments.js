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

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database(app);

const appointmentsDiv = document.getElementById('appointments');

// Function to fetch and display appointments
function fetchAppointments() {
    // Assuming the patient is logged in and has a specific ID
    const patientId = 'patient123'; // Replace with actual patient ID

    const appointmentsRef = db.ref('appointments').orderByChild('patientId').equalTo(patientId);

    appointmentsRef.once('value', (snapshot) => {
        appointmentsDiv.innerHTML = ''; // Clear previous appointments

        snapshot.forEach((childSnapshot) => {
            const appointmentData = childSnapshot.val();
            const appointmentKey = childSnapshot.key;

            // Display each appointment
            const appointmentElement = document.createElement('div');
            appointmentElement.classList.add('appointment-item');
            appointmentElement.innerHTML = `
                <p><strong>Doctor Name:</strong> ${appointmentData.doctorName}</p>
                <p><strong>Date:</strong> ${appointmentData.date}</p>
                <p><strong>Time:</strong> ${appointmentData.time}</p>
            `;
            appointmentsDiv.appendChild(appointmentElement);
        });
    }, (error) => {
        console.error('Error fetching appointments:', error);
    });
}

// Fetch appointments on page load
fetchAppointments();
