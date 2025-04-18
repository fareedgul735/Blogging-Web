import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQSx-_hYSNv4Q3o2tzg3SCei7FB3Xj9kM",
  authDomain: "create-blogs-5959e.firebaseapp.com",
  projectId: "create-blogs-5959e",
  storageBucket: "create-blogs-5959e.appspot.com",
  messagingSenderId: "538886768958",
  appId: "1:538886768958:web:40c68aa806db23239e446f",
  measurementId: "G-NKZL02W59C",
};

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
      uid: user.uid,
      name: user.displayName,
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

onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Please log in first.");
    location.href = "index.html";
  }
});

const preLoader = document.querySelector("#preloader");
window.addEventListener("load", () => {
  setTimeout(() => {
    preLoader.style.display = "none";
  }, 500);
});

const signOutBtns = document.querySelectorAll(".signOutBtns");
const modal = document.getElementById("signOutModal");
const confirmBtn = document.getElementById("confirmSignOut");
const cancelBtn = document.getElementById("cancelSignOut");

signOutBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.style.display = "flex";
  });
});

cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

confirmBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    location.href = "index.html";
  } catch (error) {
    alert("Error Login out:", error.message);
  }
});

const sideBarBtnOpen = document.querySelector("#sideBarBtnOpen");
const sideBarBtnClose = document.querySelector("#sideBarBtnClose");
const sideBar = document.querySelector("#leftSideSideBar");

sideBarBtnOpen?.addEventListener("click", () => {
  sideBar.classList.add("active");
});

sideBarBtnClose?.addEventListener("click", () => {
  sideBar.classList.remove("active");
});

// const url = "https://abwfisafbjptoxfaxiud.supabase.co";
// const anonKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFid2Zpc2FmYmpwdG94ZmF4aXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NTUxODksImV4cCI6MjA2MDEzMTE4OX0.u-rQYaFtmQXgTJ0_3T85T1P28Wmb7F81jfTWl2O8xdA";

// const sbClient = supabase.createClient(url, anonKey);
// console.log(sbClient, "==createclient");

// const file = document.getElementById("files");

// async function onFileChanged(e) {
//   const file = e.target.files[0];
//   // console.log(file);
//   await sbClient.storage.from("blogging-web").upload("blogs/abc.png", file);
// }
// file.addEventListener("changed", onFileChanged);
