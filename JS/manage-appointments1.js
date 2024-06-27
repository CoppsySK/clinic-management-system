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
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to load appointments
function loadAppointments(doctorId) {
    const appointmentsRef = ref(db, `appointments/${doctorId}`);
    get(appointmentsRef).then((snapshot) => {
        const appointmentsContainer = document.getElementById('appointments');
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const appointment = childSnapshot.val();
                const appointmentDiv = document.createElement('div');
                appointmentDiv.className = 'appointment';
                appointmentDiv.innerHTML = `
                    <div class="appointment-header">
                        <div><strong>Patient:</strong> ${appointment.patientName}</div>
                        <div>
                            <button class="btn-view" onclick="viewAppointment('${childSnapshot.key}')">View</button>
                            <button class="btn-update" onclick="updateAppointment('${childSnapshot.key}')">Update</button>
                            <button class="btn-cancel" onclick="cancelAppointment('${childSnapshot.key}')">Cancel</button>
                        </div>
                    </div>
                    <div class="appointment-details">
                        <div><strong>Time:</strong> ${appointment.appointmentTime}</div>
                        <div><strong>Purpose:</strong> ${appointment.purpose}</div>
                    </div>
                `;
                appointmentsContainer.appendChild(appointmentDiv);
            });
        } else {
            appointmentsContainer.innerHTML = '<p>No appointments available.</p>';
        }
    }).catch((error) => {
        console.error("Error fetching appointments:", error);
    });
}

// Functions to handle appointment actions
function viewAppointment(appointmentId) {
    alert(`View details for appointment ID: ${appointmentId}`);
}

function updateAppointment(appointmentId) {
    alert(`Update status for appointment ID: ${appointmentId}`);
}

function cancelAppointment(appointmentId) {
    alert(`Cancel appointment ID: ${appointmentId}`);
}

// Load appointments when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const doctorId = "doctor123"; // Replace with actual doctor ID
    loadAppointments(doctorId);
});
