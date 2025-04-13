import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";


// Firebase config
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

// ✅ Function to get ID from URL
const getId = () => {
  const url = location.href;
  if (url.includes("#")) {
    //include check karega kay url mai # hai kay nhi agar hai tu true hai warna fale hai
    const id = url.split("#")[1]; //split method check kar raha hai agar url mai # hai tu hash kay bad jho value hogi woh split kardega seperate kardega
    return id;
  } else {
    console.log("No ID found in URL");
    return null;
  }
};

const getDetailData = async () => {
  try {
    const id = getId();
    if (!id) {
      document.body.innerHTML = `<h2 id = "blogHeading">No Blog Found. Please go back.</h2>`;
      return;
    }
    const docRef = doc(db, "blogs", id); //ka kaam sirf reference banana hota hai Firestore ke document ka.
    const docSnap = await getDoc(docRef); //ka kaam actual data fetch karna hota hai jo document ke andar hai.
    if (docSnap.exists()) {
      showDataInDOM(docSnap.data());
    } else {
      document.body.innerHTML = "<h2>Blog Not Found.</h2>";
    }
  } catch (error) {
    console.log(error);
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

getDetailData();

window.onload = () => {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  if (!user) {
    location.href = "signUp.html";
  }
};