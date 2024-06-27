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

const profileInfoDiv = document.getElementById('profile-info');
const updateFormDiv = document.getElementById('update-profile-form');
const updateForm = document.getElementById('update-form');
const editProfileBtn = document.getElementById('edit-profile-btn');

// Function to fetch and display admin profile information
function fetchAdminProfile() {
    const adminRef = db.ref('admin/profile');

    adminRef.get().then((snapshot) => {
        if (snapshot.exists()) {
            const profileData = snapshot.val();
            profileInfoDiv.innerHTML = `
                <p><strong>Full Name:</strong> ${profileData.fullname}</p>
                <p><strong>Email:</strong> ${profileData.email}</p>
                <p><strong>Phone Number:</strong> ${profileData.phone}</p>
            `;
        } else {
            profileInfoDiv.innerHTML = '<p>No profile data available</p>';
        }
    }).catch((error) => {
        console.error('Error fetching profile data:', error);
    });
}

// Function to update admin profile information
function updateAdminProfile(event) {
    event.preventDefault();

    const fullname = updateForm.fullname.value;
    const email = updateForm.email.value;
    const phone = updateForm.phone.value;

    const adminRef = db.ref('admin/profile');

    adminRef.set({
        fullname,
        email,
        phone
    }).then(() => {
        alert('Profile updated successfully');
        fetchAdminProfile();
        updateFormDiv.style.display = 'none';
    }).catch((error) => {
        console.error('Error updating profile:', error);
    });
}

// Event listener for the edit profile button
editProfileBtn.addEventListener('click', () => {
    updateFormDiv.style.display = 'block';
});

// Event listener for the update profile form
updateForm.addEventListener('submit', updateAdminProfile);

// Fetch admin profile data on page load
fetchAdminProfile();
