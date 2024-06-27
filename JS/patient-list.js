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

// Function to load patients
function loadPatients() {
    const patientsRef = ref(db, 'patients/');
    get(patientsRef).then((snapshot) => {
        const patientsContainer = document.getElementById('patients');
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const patient = childSnapshot.val();
                const patientDiv = document.createElement('div');
                patientDiv.className = 'patient';
                patientDiv.innerHTML = `
                    <div class="patient-header">
                        <div><strong>Name:</strong> ${patient.fullname}</div>
                        <div>
                            <button class="btn-view" onclick="viewPatient('${childSnapshot.key}')">View</button>
                            <button class="btn-update" onclick="updatePatient('${childSnapshot.key}')">Update</button>
                        </div>
                    </div>
                    <div class="patient-details">
                        <div><strong>DOB:</strong> ${patient.dob}</div>
                        <div><strong>Gender:</strong> ${patient.gender}</div>
                        <div><strong>Blood Group:</strong> ${patient.bloodgroup}</div>
                        <div><strong>Email:</strong> ${patient.email}</div>
                        <div><strong>Address:</strong> ${patient.address}</div>
                        <div><strong>Phone Number:</strong> ${patient.phonenumber}</div>
                    </div>
                `;
                patientsContainer.appendChild(patientDiv);
            });
        } else {
            patientsContainer.innerHTML = '<p>No patients available.</p>';
        }
    }).catch((error) => {
        console.error("Error fetching patients:", error);
    });
}

// Functions to handle patient actions
function viewPatient(patientId) {
    alert(`View details for patient ID: ${patientId}`);
}

function updatePatient(patientId) {
    alert(`Update information for patient ID: ${patientId}`);
}

// Load patients when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadPatients();
});
