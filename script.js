// Firebase setup
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

document.getElementById('login-btn').addEventListener('click', () => {
  const email = prompt("Enter email:");
  const password = prompt("Enter password:");
  auth.signInWithEmailAndPassword(email,password)
      .then(user => alert("Login successful"))
      .catch(err => alert(err.message));
});

// Simple cart functionality
let cartCount = 0;
document.querySelectorAll('.product-card button').forEach(btn => {
    btn.addEventListener('click', () => {
        cartCount++;
        document.getElementById('cart-btn').innerText = `Cart (${cartCount})`;
    });
});
