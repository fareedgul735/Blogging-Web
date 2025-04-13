import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { checkUser } from "./checkedLoggedIn";

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

const blog = document.querySelector("#blogging");
const spinner = document.querySelector("#spinner");

const createCard = (cardDetail, id) => {
  const { Image, Title, Description, Author, publishedAt } = cardDetail;
  const descriptionLimit = 84;

  return `
    <div class="cardDiv">
      <img class="cardImg" src="${Image}" width="100%" height="332px" />
      <h2 class="cardTitle">${Title}</h2>
      <p class="cardDescription">${Description.slice(
        0,
        descriptionLimit
      )} .....</p>
      <p class="cardMeta">${Author}
        <span class="cardPublishedAt">${new Date(
          publishedAt
        ).toLocaleString()}</span>
      </p>
      <a class="moreDetail" href="detail.html#${id}">Read More</a>
      <i onclick="onUpdate('${id}')" class="updateBlog fa-solid fa-pen"></i>
      <i onclick="onDelete('${id}')" class="blogDelete fa-solid fa-trash"></i>
    </div>`;
};

window.onDelete = async (id) => {
  const confirmDelete = confirm("Are you sure you want to delete?");
  if (confirmDelete) {
    try {
      await deleteDoc(doc(db, "blogs", id));
      alert("Blog deleted successfully!");
      location.reload();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  }
};

window.onUpdate = (id) => {
  window.location.href = `update.html#${id}`;
};

window.onload = () => {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  if (!user) {
    location.href = "signUp.html";
  }
};


onAuthStateChanged(auth, async (user) => {
  if (user) {
    spinner.style.display = "block";
    blog.style.display = "none";

    try {
      const q = query(collection(db, "blogs"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const card = createCard(data, docSnap.id);
        blog.innerHTML += card;
      });

      spinner.style.display = "none";
      blog.style.display = "flex";
    } catch (error) {
      console.error("Error getting user blogs:", error);
    }
  } else {
    alert("Please log in first.");
    location.href = "index.html";
  }
});
