import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQSx-_hYSNv4Q3o2tzg3SCei7FB3Xj9kM",
  authDomain: "create-blogs-5959e.firebaseapp.com",
  projectId: "create-blogs-5959e",
  storageBucket: "create-blogs-5959e.appspot.com",
  messagingSenderId: "538886768958",
  appId: "1:538886768958:web:40c68aa806db23239e446f",
  measurementId: "G-NKZL02W59C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const blogRef = collection(db, "blogs");

const createBlog = document.querySelector("#createBlogBtn");

const createData = async () => {
  const user = auth.currentUser;

  if (!user) {
    alert("Please log in first!");
    return;
  }

  let authorInput = document.querySelector("#author");
  let titleInput = document.querySelector("#title");
  let descriptionInput = document.querySelector("#description");
  let imageUrl = document.querySelector("#image-url");

  let inputArray = [authorInput, titleInput, descriptionInput, imageUrl];
  inputArray.forEach((input) => (input.style.border = "1px solid blue"));

  let checkIsEmpty = inputArray.some((input) => input.value.trim() === "");
  if (checkIsEmpty) {
    alert("All fields are required");
    inputArray.forEach((input) => {
      if (input.value.trim() === "") {
        input.style.border = "1px solid red";
      }
    });
  } else {
    const currentDate = new Date();
    const payLoad = {
      Author: authorInput.value,
      Title: titleInput.value,
      Description: descriptionInput.value,
      Image: imageUrl.value,
      publishedAt: currentDate.toISOString(),
      userId: user.uid,
    };

    try {
      const blogResponse = await addDoc(blogRef, payLoad);
      console.log(blogResponse);
      alert("Data created successfully");
      location.href = "read.html";

      authorInput.value = "";
      titleInput.value = "";
      descriptionInput.value = "";
      imageUrl.value = "";
      inputArray.forEach((input) => {
        input.style.border = "1px solid rgb(127, 125, 125)";
      });
    } catch (error) {
      console.log(error);
      alert("Your data could not be created!");
    }
  }
};

createBlog.addEventListener("click", createData);


window.onload = () => {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  if (!user) {
    location.href = "signUp.html";
  }
};

// PreLoader
const preLoader = document.querySelector("#preloader");
window.addEventListener("load", () => {
  setTimeout(() => {
    preLoader.style.display = "none";
  }, 1000);
});
