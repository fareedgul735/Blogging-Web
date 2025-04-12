import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
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

const getData = async () => {
  try {
    const blogData = await getDocs(blogRef);
    return blogData;
  } catch (error) {
    console.log(error);
  }
};

const createCard = (cardDetail, id) => {
  const { Image, Title, Description, Author, publishedAt } = cardDetail;
  const descriptionLimit = 84;
  const card = `<div class = "cardDiv">
    <img class = "cardImg" src = "${Image}" width = "100%" height="332px" / >
    <h2 class = "cardTitle">${Title}</h2>
    <p class = "cardDescription">${Description.slice(
      0,
      descriptionLimit
    )} .....</p>
    <p class = "cardMeta">${Author}<span class = "cardPublishedAt">${new Date(
    publishedAt
  ).toLocaleString()}</span></p>
    
  <a class = "moreDetail" href = "detail.html#${id}" >Read More</a>
  </div>`;
  return card;
};

const blog = document.querySelector("#blogging");
const spinner = document.querySelector("#spinner");

const readData = async () => {
  spinner.style.display = "block";
  blog.style.display = "none";

  try {
    const data = await getData();
    data.forEach((recData) => {
      const receiveData = recData.data();
      const card = createCard(receiveData, recData.id, recData);
      blog.innerHTML += card;
    });

    spinner.style.display = "none";
    blog.style.display = "flex";
  } catch (error) {
    console.log(error);
  }
};

readData();

// preLoader //

let preLoader = document.getElementById("preloader");

window.addEventListener("load", () => {
  setTimeout(() => {
    preLoader.style.display = "none";
  }, 1000);
});

// preLoader //
