import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQSx-_hYSNv4Q3o2tzg3SCei7FB3Xj9kM",
  authDomain: "create-blogs-5959e.firebaseapp.com",
  projectId: "create-blogs-5959e",
  storageBucket: "create-blogs-5959e.firebasestorage.app",
  messagingSenderId: "538886768958",
  appId: "1:538886768958:web:40c68aa806db23239e446f",
  measurementId: "G-NKZL02W59C",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// SignUp-Authentication //

let signUpBtn = document.getElementById("signUpBtn");

const onSignUp = async (e) => {
  e.preventDefault();
  let name = document.getElementById("userName");
  let verifyEmail = document.getElementById("signUpEmail");
  let verifyPassword = document.getElementById("signUpPassword");

  let inputsArray = [verifyEmail, verifyPassword];
  inputsArray.forEach(
    (inputField) => (inputField.style.border = "2px solid blue")
  );

  let fieldIsEmpty = inputsArray.some(
    (inputField) => inputField.value.trim() === ""
  );

  if (fieldIsEmpty) {
    alert("fields are required ");
    inputsArray.forEach((inputField) => {
      if (inputField.value.trim() === "") {
        inputField.style.border = "2px solid red";
      }
    });
  } else {
    try {
      let response = await createUserWithEmailAndPassword(
        auth,
        verifyEmail.value,
        verifyPassword.value
      );
      await updateProfile(response.user, {
        displayName: name?.value,
      });
      if (!!response) {
        alert("SignUp SuccessFully");
        verifyEmail.value = "";
        verifyPassword.value = "";
        setTimeout(() => {
          location.href = "create.html";
        }, 500);
        inputsArray.forEach(
          (inputField) => (inputField.style.border = "1px solid gray")
        );
      }
    } catch (error) {
      console.log(error);
      alert("Internal Server Error");

      inputsArray.forEach(
        (inputField) => (inputField.style.border = "2px solid red")
      );
    }
  }
};
signUpBtn.addEventListener("click", onSignUp);

// SignUp-Authentication //

// LogIn-Authentication //
let logInButton = document.getElementById("logInBtn");

const onLogIn = async (e) => {
  e.preventDefault();
  let logInEmail = document.getElementById("logInEmail");
  let logInPassword = document.getElementById("logInPassword");

  let inputsArray = [logInEmail, logInPassword];

  inputsArray.forEach((inputField) => {
    inputField.style.border = "2px solid blue";
  });

  let fieldIsEmpty = inputsArray.some(
    (inputField) => inputField.value.trim() === ""
  );

  if (fieldIsEmpty) {
    alert("Fields are required");

    inputsArray.forEach((inputField) => {
      if (inputField.value.trim() === "") {
        inputField.style.border = "2px solid red";
      }
    });
  } else {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        logInEmail.value,
        logInPassword.value
      );

      alert("Log In Successfully");

      if (!!response) {
        logInEmail.value = "";
        logInPassword.value = "";
        localStorage.setItem("user", JSON.stringify(response));
        inputsArray.forEach((inputField) => {
          inputField.style.border = "1px solid gray";
        });
        setTimeout(() => {
          location.href = "create.html";
        }, 500);
      }
    } catch (e) {
      console.log(e);
      alert("Internal Server Error");

      inputsArray.forEach((inputField) => {
        inputField.style.border = "2px solid red";
      });
    }
  }
};

logInButton.addEventListener("click", onLogIn);

window.onload = () => {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  if (!!user) {
    location.href = "create.html";
  }
};

// LogIn-Authentication //

// Dom Styling //

// SignUp //
let signUpForm = document.getElementById("signUpValidation");
let signUpSideBtn = document.getElementById("signUpBtnUx");
let signUpDiv = document.getElementById("signUpDiv");
let logInDiv = document.getElementById("logInDiv");
let closeBtn = document.getElementById("closeIcon");
let closeBtn2 = document.getElementById("closeIcon2");

signUpSideBtn.addEventListener("click", () => {
  signUpForm.style.display = "flex";
  signUpDiv.style.display = "flex";
  logInForm.style.display = "none";

  document.getElementById("userName").value = "";
  document.getElementById("signUpEmail").value = "";
  document.getElementById("signUpPassword").value = "";
});
// SignUp //

// LogIn //
let logInForm = document.getElementById("logInValidation");
let logInBtn = document.getElementById("logInBtnUx");

logInBtn.addEventListener("click", () => {
  logInForm.style.display = "flex";
  logInDiv.style.display = "flex";
  signUpForm.style.display = "none";

  document.getElementById("userName").value = "";
  document.getElementById("logInEmail").value = "";
  document.getElementById("logInPassword").value = "";
});
// LogIn //

// closeBtns //

closeBtn.addEventListener("click", () => {
  signUpDiv.style.display = "none";
});

closeBtn2.addEventListener("click", () => {
  logInDiv.style.display = "none";
});

// closeBtns //

// Dom Styling //

// preLoader //
let preLoading = document.getElementById("preloader");
window.addEventListener("load", () => {
  setTimeout(() => {
    preLoading.style.display = "none";
  }, 2000);
});
// preLoader //
