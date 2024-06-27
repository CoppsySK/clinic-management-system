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

const updateProfileForm = document.getElementById('update-profile-form');

updateProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = updateProfileForm['fullname'].value;
    const email = updateProfileForm['email'].value;
    const phone = updateProfileForm['phone'].value;
    const dob = updateProfileForm['dob'].value;

    // Assuming the patient is logged in and has a specific ID
    const patientId = 'patient123'; // Replace with actual patient ID

    // Update patient's profile information in Firebase
    db.ref('patients/' + patientId).update({
        fullName: fullName,
        email: email,
        phone: phone,
        dob: dob
    }).then(() => {
        alert('Profile updated successfully!');
        // Optional: Redirect to another page or refresh current page
    }).catch((error) => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
    });
});
