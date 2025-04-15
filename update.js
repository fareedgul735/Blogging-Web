import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

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
const auth = getAuth(app);

const updateBtn = document.querySelector("#updateBlogBtn");
const updateAuthor = document.querySelector("#updateAuthor");
const updateTitle = document.querySelector("#updateTitle");
const updateDes = document.querySelector("#updateDescription");
const updateImageUrl = document.querySelector("#updateImageUrl");
const updateArray = [updateAuthor, updateTitle, updateDes, updateImageUrl];

const urlId = window.location.hash.slice(1);

updateArray.forEach((inputs) => {
  inputs.style.border = "1px solid blue";
});

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("Please log in first!");
    location.href = "index.html";
    return;
  }

  try {
    const blogRef = doc(db, "blogs", urlId);
    const blogSnap = await getDoc(blogRef);

    if (!blogSnap.exists()) {
      alert("Blog Not Found!");
      return;
    }

    const blogData = blogSnap.data();

    updateAuthor.value = blogData.Author;
    updateTitle.value = blogData.Title;
    updateDes.value = blogData.Description;
    updateImageUrl.value = blogData.Image;

    updateBtn.addEventListener("click", async () => {
      const updateEmpty = updateArray.some(
        (input) => input.value.trim() === ""
      );
      if (updateEmpty) {
        alert("All fields are required!");
        updateArray.forEach((input) => {
          if (input.value.trim() === "") {
            input.style.border = "1px solid red";
          }
        });
        return;
      }

      const payLoad = {
        Author: updateAuthor.value,
        Title: updateTitle.value,
        Description: updateDes.value,
        Image: updateImageUrl.value,
        uid: user.uid,
        name: user.displayName,
        publishedAt: blogData.publishedAt,
      };

      try {
        await updateDoc(blogRef, payLoad);
        alert("Blog Updated Successfully!");
        window.location.href = "read.html";
      } catch (err) {
        console.log(err);
        alert("Update Failed!");
      }
    });
  } catch (error) {
    console.error("Error fetching or updating blog:", error);
    alert("Something went wrong!");
  }
});
