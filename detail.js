import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getFirestore,
  getDoc,
  doc,
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
  measurementId: "G-NKZL02W59C",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const getId = () => {
  const url = location.href;
  if (url.includes("#")) {
    const id = url.split("#")[1];
    return id;
  } else {
    console.log("No ID found in URL");
    return null;
  }
};


onAuthStateChanged(auth, (user) => {
  if (user) {
    getDetailData();
  } else {
    alert("Please log in to view blog details.");
    location.href = "index.html"; 
  }
});


const getDetailData = async () => {
  const id = getId();
  if (!id) return document.body.innerHTML = `<h2 class = "blogHeading">No Blog Found. Please go back.</h2>`;

  try {
    const docSnap = await getDoc(doc(db, "blogs", id));
    docSnap.exists()
      ? showDataInDOM(docSnap.data())
      : document.body.innerHTML = `<p class="noBlogFound">No blogs found.</p>`;
  } catch (err) {
    console.log(err);
  }
};


const showDataInDOM = (data) => {
  const { Image, Title, Description, Author, publishedAt } = data;
  const blogDetailDiv = document.querySelector("#blogDetail");
  blogDetailDiv.innerHTML = `
    <img id = "detailImg" class = "detailImg" src="${Image}" width="100%" height="332px" />
    <h2 class = "detailTitle">${Title}</h2>
    <p class = "detailDes">${Description}</p>
    <p class = "detailAuthor">Author: ${Author}</p>
    <p class = "detailDate">Published: ${new Date(
      publishedAt
    ).toLocaleString()}</p>
  `;

  const detailImg = document.getElementById("detailImg");
  const imgOverlay = document.getElementById("imageOverlay");
  const popupImage = document.getElementById("popupImage");

  detailImg.addEventListener("click", () => {
    popupImage.src = detailImg.src;
    imgOverlay.style.display = "flex";
  });

  imgOverlay.addEventListener("click", () => {
    imgOverlay.style.display = "none";
  });
};


