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

// Function to load today's schedule
function loadSchedule(doctorId) {
    const scheduleRef = ref(db, `appointments/${doctorId}`);
    get(scheduleRef).then((snapshot) => {
        const scheduleContainer = document.getElementById('schedule');
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const appointment = childSnapshot.val();
                const appointmentDiv = document.createElement('div');
                appointmentDiv.className = 'appointment';
                appointmentDiv.innerHTML = `
                    <div><strong>Patient:</strong> ${appointment.patientName}</div>
                    <div class="appointment-time"><strong>Time:</strong> ${appointment.appointmentTime}</div>
                    <div><strong>Purpose:</strong> ${appointment.purpose}</div>
                `;
                scheduleContainer.appendChild(appointmentDiv);
            });
        } else {
            scheduleContainer.innerHTML = '<p>No appointments for today.</p>';
        }
    }).catch((error) => {
        console.error("Error fetching schedule:", error);
    });
}

// Function to load notifications
function loadNotifications(doctorId) {
    const notificationsRef = ref(db, `notifications/${doctorId}`);
    get(notificationsRef).then((snapshot) => {
        const notificationsContainer = document.getElementById('notifications');
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const notification = childSnapshot.val();
                const notificationDiv = document.createElement('div');
                notificationDiv.className = 'notification';
                notificationDiv.innerHTML = `
                    <div>${notification.message}</div>
                    <div class="notification-time">${notification.time}</div>
                `;
                notificationsContainer.appendChild(notificationDiv);
            });
        } else {
            notificationsContainer.innerHTML = '<p>No new notifications.</p>';
        }
    }).catch((error) => {
        console.error("Error fetching notifications:", error);
    });
}

// Load data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const doctorId = "doctor123"; // Replace with actual doctor ID
    loadSchedule(doctorId);
    loadNotifications(doctorId);
});
