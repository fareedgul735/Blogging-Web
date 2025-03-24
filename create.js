import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const blogRef = collection(db, "blogs");

const createBlog = document.querySelector("#createBlogBtn");

const createData = async () => {
  let authorInput = document.querySelector("#author");
  let titleInput = document.querySelector("#title");
  let descriptionInput = document.querySelector("#description");
  let imageUrl = document.querySelector("#image-url");

  //Jise he user create karega tu inputs field blu hojayegi //
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
    };

    try {
      const blogResponse = await addDoc(blogRef, payLoad);
      console.log(blogResponse);
      alert("Create Data SuccessFully");

      // Fields ko empty karni hai tu//
      authorInput.value = "";
      titleInput.value = "";
      descriptionInput.value = "";
      imageUrl.value = "";
      let inputArray = [authorInput, titleInput, descriptionInput, imageUrl];

      inputArray.forEach((input) => {
        input.style.border = "1px solid rgb(127, 125, 125)";
      });
    } catch (error) {
      console.log(error);
      alert("Your Data is not creating!");
    }
  }
};
createBlog.addEventListener("click", createData);

// PreLoader//
const preLoader = document.querySelector("#preloader");

window.addEventListener("load", () => {
  setTimeout(() => {
    preLoader.style.display = "none";
  }, 3000);
});

// PreLoader//
