import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQSx-_hYSNv4Q3o2tzg3SCei7FB3Xj9kM",
  authDomain: "create-blogs-5959e.firebaseapp.com",
  projectId: "create-blogs-5959e",
  storageBucket: "create-blogs-5959e.firebasestorage.app",
  messagingSenderId: "538886768958",
  appId: "1:538886768958:web:40c68aa806db23239e446f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// UpdateBtn//
const updateBtn = document.querySelector("#updateBlogBtn");
// UpdateBtn//

// url-Id//
const urlId = window.location.hash.slice(1);
// url-Id//

// FormValidation//
const updateAuthor = document.querySelector("#updateAuthor");
const updateTitle = document.querySelector("#updateTitle");
const updateDes = document.querySelector("#updateDescription");
const updateImageUrl = document.querySelector("#updateImageUrl");
// FormValidation//

//Jise he user update karega tu inputs field blu hojayegi //

const updateArray = [updateAuthor, updateTitle, updateDes, updateImageUrl];
updateArray.forEach((inputs) => {
  inputs.style.border = "1px solid blue";
});

const getBlogData = async () => {
  const blogDoc = doc(db, "blogs", urlId);
  const blogData = await getDoc(blogDoc);

  if (blogData.exists()) {
    const data = blogData.data();

    updateAuthor.value = data.Author;
    updateTitle.value = data.Title;
    updateDes.value = data.Description;
    updateImageUrl.value = data.Image;
  } else {
    alert("Blog Not Found !");
  }
};
getBlogData();
updateBtn.addEventListener("click", async () => {
  const updateEmpty = updateArray.some((inputs) => inputs.value.trim() === "");
  if (updateEmpty) {
    alert("All Fields are required");
    updateArray.forEach((inputs) => {
      if (inputs.value.trim() === "") {
        inputs.style.border = "1px solid red";
      }
    });

    return;
  }
  const payLoad = {
    Author: updateAuthor.value,
    Title: updateTitle.value,
    Description: updateDes.value,
    Image: updateImageUrl.value,
  
  };

  window.onload = () => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    if (!user) {
      location.href = "signUp.html";
    }
  };

  try {
    await updateDoc(doc(db, "blogs", urlId), payLoad);
    alert("Blog Updated Successfully");
    window.location.href = "read.html";
  } catch (error) {
    console.log(error);
    alert("Update Fail!");
  }
});
