import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  onSnapshot
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {

  apiKey:
  "AIzaSyAbillPkq23WKS7-OYiztaN-RJL1dW9pSk",

  authDomain:
  "shared-sticker-album.firebaseapp.com",

  projectId:
  "shared-sticker-album",

  storageBucket:
  "shared-sticker-album.firebasestorage.app",

  messagingSenderId:
  "274890164381",

  appId:
  "1:274890164381:web:b61c5d85a5d190c8e7ac74"

};

const app =
initializeApp(firebaseConfig);

const db =
getFirestore(app);

async function saveAlbumOnline(album){

  await setDoc(
    doc(db, "albums", album.id),
    album
  );

  console.log(
    "Álbum salvo online!"
  );

}

async function deleteAlbumOnline(
  albumId
){

  await deleteDoc(
    doc(db, "albums", albumId)
  );

  console.log(
    "Álbum deletado!"
  );

}

async function joinAlbumByCode(
  albumCode
){

  const albumRef =
  doc(db, "albums", albumCode);

  const albumSnap =
  await getDoc(albumRef);

  if(!albumSnap.exists()){

    alert("Álbum não encontrado");

    return;

  }

  const albumData =
  albumSnap.data();

  const alreadyExists =
  albums.some(
    album => album.id === albumData.id
  );

  if(alreadyExists){

    alert(
      "Você já participa deste álbum"
    );

    return;

  }

  const alreadyParticipant =
albumData.participants?.some(
  participant =>
  participant.uid === currentUser.uid
);

if(!alreadyParticipant){

  if(!albumData.participants){
    albumData.participants = [];
  }

  albumData.participants.push({

    uid: currentUser.uid,

    name: userProfile.name,

    photo: userProfile.photo

  });

  await saveAlbumOnline(albumData);

}
  
  albums.push(albumData);
listenToAlbum(albumData.id);
  saveAlbums();

  renderAlbums();

  alert("Álbum adicionado!");

}

function listenToAlbum(albumId){

  onSnapshot(

    doc(db, "albums", albumId),

    (snapshot) => {

      if(!snapshot.exists()) return;

      const updatedAlbum =
      snapshot.data();

      const albumIndex =
      albums.findIndex(
        album => album.id === albumId
      );

      if(albumIndex === -1) return;

      albums[albumIndex] =
      updatedAlbum;

      saveAlbums();

      renderAlbums();

      if(
        selectedAlbumName.innerText
        === updatedAlbum.name
      ){

        openAlbum(albumIndex);

      }

      console.log(
        "Álbum atualizado em tempo real!"
      );

    }

  );

}

console.log("Firebase conectado!");

const auth = getAuth(app);

let currentUser = null;

signInAnonymously(auth)
.then(() => {

  console.log("Login anônimo realizado!");

})
.catch((error) => {

  console.error(error);

});

onAuthStateChanged(auth, (user) => {

  if(user){

    currentUser = user;

    console.log(
      "Usuário:",
      user.uid
    );

    loadAlbums();
    loadProfile();
    updateTopProfile();
    
    albums.forEach((album) => {

  listenToAlbum(album.id);

});

    renderAlbums();

  }

});

const searchInput =
document.getElementById(
  "searchInput"
);

const searchButton =
document.getElementById(
  "searchButton"
);

const toggleSectionsButton =
document.getElementById(
  "toggleSectionsButton"
);

const filterButtons =
document.querySelectorAll(
  ".filter-button"
);

const albumStats =
document.getElementById("albumStats");

const homeScreen =
document.getElementById("homeScreen");

const albumScreen =
document.getElementById("albumScreen");

const floatingButton =
document.getElementById("floatingButton");

const menu =
document.getElementById("menu");

const createAlbumOption =
document.getElementById("createAlbumOption");

const joinAlbumOption =
document.getElementById("joinAlbumOption");

const emptyMessage =
document.getElementById("emptyMessage");

const backButton =
document.getElementById("backButton");

const profileButton =
document.getElementById(
  "profileButton"
);

const profileModal =
document.getElementById(
  "profileModal"
);

const profileNameInput =
document.getElementById(
  "profileNameInput"
);

const profilePreview =
document.getElementById(
  "profilePreview"
);

const profileStats =
document.getElementById(
  "profileStats"
);

const saveProfileButton =
document.getElementById(
  "saveProfileButton"
);

const closeProfileButton =
document.getElementById(
  "closeProfileButton"
);

const topProfile =
document.getElementById(
  "topProfile"
);

const topProfileImage =
document.getElementById(
  "topProfileImage"
);

const topProfileName =
document.getElementById(
  "topProfileName"
);

const profileImageInput =
document.getElementById(
  "profileImageInput"
);

const albumsList = document.getElementById("albumsList");
const selectedAlbumName = document.getElementById("selectedAlbumName");
const stickersDiv = document.getElementById("stickers");
const participantsModal =
document.getElementById(
  "participantsModal"
);

const participantPhoto =
document.getElementById(
  "participantPhoto"
);

const participantName =
document.getElementById(
  "participantName"
);

const prevParticipant =
document.getElementById(
  "prevParticipant"
);

const nextParticipant =
document.getElementById(
  "nextParticipant"
);

let albums = [];
let currentFilter = "all";
let sectionsExpanded = true;
let sectionStates = {};
let highlightedSticker = null;
let userProfile = {
  name: "Colecionador",
  photo: ""
};
let currentParticipantIndex = 0;
let currentParticipants = [];

const selections = [
  { name: "Mexico", code: "MEX" },
  { name: "South Africa", code: "RSA" },
  { name: "South Korea", code: "KOR" },
  { name: "Czech Republic", code: "CZE" },
  { name: "Canada", code: "CAN" },
  { name: "Bosnia and Herzegovina", code: "BIH" },
  { name: "Qatar", code: "QAT" },
  { name: "Switzerland", code: "SUI" },
  { name: "Brazil", code: "BRA" },
  { name: "Morocco", code: "MAR" },
  { name: "Haiti", code: "HAI" },
  { name: "Scotland", code: "SCO" },
  { name: "United States", code: "USA" },
  { name: "Paraguay", code: "PAR" },
  { name: "Australia", code: "AUS" },
  { name: "Türkiye", code: "TUR" },
  { name: "Germany", code: "GER" },
  { name: "Curaçao", code: "CUW" },
  { name: "Côte d'Ivoire", code: "CIV" },
  { name: "Ecuador", code: "ECU" },
  { name: "Netherlands", code: "NED" },
  { name: "Japan", code: "JPN" },
  { name: "Sweden", code: "SWE" },
  { name: "Tunisia", code: "TUN" },
  { name: "Belgium", code: "BEL" },
  { name: "Egypt", code: "EGY" },
  { name: "Iran", code: "IRN" },
  { name: "New Zealand", code: "NZL" },
  { name: "Spain", code: "ESP" },
  { name: "Cape Verde", code: "CPV" },
  { name: "Saudi Arabia", code: "KSA" },
  { name: "Uruguay", code: "URU" },
  { name: "France", code: "FRA" },
  { name: "Senegal", code: "SEN" },
  { name: "Iraq", code: "IRQ" },
  { name: "Norway", code: "NOR" },
  { name: "Argentina", code: "ARG" },
  { name: "Algeria", code: "ALG" },
  { name: "Austria", code: "AUT" },
  { name: "Jordan", code: "JOR" },
  { name: "Portugal", code: "POR" },
  { name: "DR Congo", code: "COD" },
  { name: "Uzbekistan", code: "UZB" },
  { name: "Colombia", code: "COL" },
  { name: "England", code: "ENG" },
  { name: "Croatia", code: "CRO" },
  { name: "Ghana", code: "GHA" },
  { name: "Panama", code: "PAN" }
];

prevParticipant.addEventListener(
  "click",
  () => {

    currentParticipantIndex--;

    if(currentParticipantIndex < 0){

      currentParticipantIndex =
      currentParticipants.length - 1;

    }

    renderParticipant();

  }
);

nextParticipant.addEventListener(
  "click",
  () => {

    currentParticipantIndex++;

    if(
      currentParticipantIndex >=
      currentParticipants.length
    ){

      currentParticipantIndex = 0;

    }

    renderParticipant();

  }
);

participantsModal.addEventListener(
  "click",
  (e) => {

    if(e.target === participantsModal){

      participantsModal.style.display =
      "none";

    }

  }
);

profilePreview
.addEventListener("click", () => {

  profileImageInput.click();

});

topProfile.addEventListener(
  "click",
  () => {

    profileModal.style.display =
    "flex";

    profileNameInput.value =
    userProfile.name;

    profilePreview.src =
    userProfile.photo;

    const totalObtained =
    albums.reduce(
      (total, album) => {

        return total +
        album.stickers.filter(
          sticker =>
          sticker.obtained
        ).length;

      },
      0
    );

    let bestAlbum =
    null;

    let bestPercentage =
    -1;

    albums.forEach((album) => {

      const total =
      album.stickers.length;

      const obtained =
      album.stickers.filter(
        sticker =>
        sticker.obtained
      ).length;

      const percentage =
      Math.floor(
        (obtained / total) * 100
      );

      if(
        percentage >
        bestPercentage
      ){

        bestPercentage =
        percentage;

        bestAlbum =
        album.name;

      }

    });

    profileStats.innerHTML = `

      <p>
        Figurinhas obtidas:
        ${totalObtained}
      </p>

      <p>
        Álbuns:
        ${albums.length}
      </p>

      <p>
        Melhor álbum:
        ${bestAlbum || "Nenhum"}
      </p>

    `;

  }
);

saveProfileButton.addEventListener(
  "click",
  () => {

    userProfile.name =
    profileNameInput.value;

    saveProfile();
    updateTopProfile();
    
    profileModal.style.display =
    "none";

  }
);

closeProfileButton.addEventListener(
  "click",
  () => {

    profileModal.style.display =
    "none";

  }
);

function openParticipantsCarousel(
  participants,
  startIndex
){

  currentParticipants =
  participants;

  currentParticipantIndex =
  startIndex;

  renderParticipant();

  participantsModal.style.display =
  "flex";

}

function renderParticipant(){

  const participant =
  currentParticipants[
    currentParticipantIndex
  ];

  participantPhoto.src =
  participant.photo ||
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  participantName.innerText =
  participant.name;

}

function updateTopProfile(){

  topProfileName.innerText =
  userProfile.name;

  topProfileImage.src =
  userProfile.photo ||
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  profilePreview.src =
userProfile.photo ||
"https://cdn-icons-png.flaticon.com/512/149/149071.png";
  
}

function convertImageToBase64(
  file,
  callback
){

  const reader = new FileReader();

  reader.onload = function(){

    callback(reader.result);

  };

  reader.readAsDataURL(file);

}

profileImageInput
.addEventListener("change", (e) => {

  const file =
  e.target.files[0];

  if(!file) return;

  convertImageToBase64(
    file,
    (base64) => {

      userProfile.photo =
      base64;

      updateTopProfile();

    }
  );

});

function saveAlbums(){

  localStorage.setItem(
    "sharedAlbums",
    JSON.stringify(albums)
  );

}

function loadAlbums(){

  const savedAlbums =
  localStorage.getItem(
    "sharedAlbums"
  );

  if(savedAlbums){

    albums = JSON.parse(savedAlbums);

  }

}

function saveProfile(){

  localStorage.setItem(
    "userProfile",
    JSON.stringify(userProfile)
  );

}

function loadProfile(){

  const savedProfile =
  localStorage.getItem(
    "userProfile"
  );

  if(savedProfile){

    userProfile =
    JSON.parse(savedProfile);

  }

}

function updateAlbumStats(album){

  const total =
  album.stickers.length;

  const obtained =
  album.stickers.filter(
    sticker => sticker.obtained
  ).length;

  const repeated =
  album.stickers.reduce(
    (total, sticker) =>
      total + sticker.repeated,
    0
  );

  const percentage =
  Math.floor((obtained / total) * 100);

  albumStats.innerHTML = `
    ${percentage}% |
    ${obtained} / ${total} |
    ${repeated} repetidas
  `;

}

function showFloatingMenu(
  event,
  sticker,
  updateCard
){

  document
  .querySelectorAll(".floating-menu")
  .forEach(menu => menu.remove());

  const floatingMenu =
  document.createElement("div");

  floatingMenu.classList.add(
    "floating-menu"
  );

  const addButton =
  document.createElement("button");

  addButton.innerText =
  "Adicionar +1 repetida";

  addButton.classList.add(
    "add-button"
  );

  addButton.onclick = (e) => {

    e.stopPropagation();

    sticker.repeated++;

    updateCard();

    floatingMenu.remove();

  };

  floatingMenu.appendChild(addButton);

  if(sticker.repeated > 0){

    const removeButton =
    document.createElement("button");

    removeButton.innerText =
    "Remover repetida";

    removeButton.classList.add(
      "remove-button"
    );

    removeButton.onclick = (e) => {

      e.stopPropagation();

      sticker.repeated--;

      updateCard();

      floatingMenu.remove();

    };

    floatingMenu.appendChild(
      removeButton
    );

  }

  const deleteButton =
  document.createElement("button");

  deleteButton.innerText =
  "Remover carta";

  deleteButton.classList.add(
    "delete-button"
  );

  deleteButton.onclick = (e) => {

    e.stopPropagation();

    const confirmDelete =
    confirm(
      "Deseja remover esta carta?"
    );

    if(confirmDelete){

      sticker.obtained = false;

      sticker.repeated = 0;

      updateCard();

    }

    floatingMenu.remove();

  };

  floatingMenu.appendChild(
    deleteButton
  );

  document.body.appendChild(
    floatingMenu
  );

  let x = event.clientX;
  let y = event.clientY;

  const rect =
  floatingMenu.getBoundingClientRect();

  if(
    x + rect.width >
    window.innerWidth - 10
  ){

    x =
    window.innerWidth -
    rect.width -
    10;

  }

  if(
    y + rect.height >
    window.innerHeight - 10
  ){

    y =
    window.innerHeight -
    rect.height -
    10;

  }

  floatingMenu.style.left =
  x + "px";

  floatingMenu.style.top =
  y + "px";

  setTimeout(() => {

    const removeMenu = (e) => {

      if(
        !floatingMenu.contains(e.target)
      ){

        floatingMenu.remove();

        document.removeEventListener(
          "click",
          removeMenu
        );

      }

    };

    document.addEventListener(
      "click",
      removeMenu
    );

  }, 10);

}

function stickerMatchesFilter(sticker){

  if(currentFilter === "all"){
    return true;
  }

  if(currentFilter === "obtained"){
    return sticker.obtained;
  }

  if(currentFilter === "missing"){
    return !sticker.obtained;
  }

  if(currentFilter === "repeated"){
    return sticker.repeated > 0;
  }

  return true;

}

function normalizeStickerCode(code){

  return code
  .toUpperCase()
  .replace(/[^A-Z0-9]/g, "");

}

function openAlbum(index){

  const album = albums[index];
  const participantsDiv =
document.getElementById(
  "albumParticipants"
);

participantsDiv.innerHTML = "";
  
  (album.participants || [])
.forEach((participant, i) => {

  const img =
  document.createElement("img");

  img.classList.add(
    "participant-avatar"
  );

  img.src =
  participant.photo ||
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  img.style.zIndex = 100 - i;

  img.addEventListener(
    "click",
    () => {

      openParticipantsCarousel(
        album.participants,
        i
      );

    }
  );

  participantsDiv.appendChild(img);

});

  selectedAlbumName.innerText = album.name;
  updateAlbumStats(album);
  
  stickersDiv.innerHTML = "";

  const groupedSections = {};

  album.stickers.forEach((sticker) => {

    if(!groupedSections[sticker.section]){
      groupedSections[sticker.section] = [];
    }

    groupedSections[sticker.section].push(sticker);

  });

  for(const sectionName in groupedSections){

    const section = document.createElement("div");
    section.classList.add("section");

    const header = document.createElement("div");
    header.classList.add("section-header");
    const obtainedCount =
groupedSections[sectionName]
.filter(sticker => sticker.obtained)
.length;

const totalCount =
groupedSections[sectionName].length;

header.innerHTML = `
  <span>${sectionName}</span>

  <span>
    ${String(obtainedCount).padStart(2, "0")}
    /
    ${totalCount}
  </span>
`;

    const content =
document.createElement("div");

content.classList.add(
  "section-content"
);

const isExpanded =
sectionStates[sectionName]
?? sectionsExpanded;

content.style.display =
isExpanded
? "grid"
: "none";
    
if(sectionsExpanded){
  content.style.display = "grid";
}
    header.addEventListener("click", () => {

  const isOpen =
  content.style.display === "grid";

  content.style.display =
  isOpen
  ? "none"
  : "grid";

  sectionStates[sectionName] =
  !isOpen;

});

    groupedSections[sectionName].forEach((sticker) => {
      
      if(!stickerMatchesFilter(sticker)){
        return;
      }
      
      const card = document.createElement("div");
      if(sticker.id === highlightedSticker){

  card.classList.add(
    "highlighted-sticker"
  );

  setTimeout(() => {

    card.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }, 100);

}

      card.classList.add("sticker");

      if(sticker.obtained){
        card.classList.add("obtida");
      }

      card.innerHTML = `
        <h3>${sticker.id}</h3>

        <p>${sticker.obtained ? "Obtida" : "Em falta"}</p>

        ${sticker.repeated > 0
  ? `
    <span class="repeat-count">
      ${sticker.repeated}
    </span>
  `
  : ""
}
      `;

      const texto = card.querySelector("p");

      card.addEventListener("click", (event) => {

        event.stopPropagation();
        if(highlightedSticker === sticker.id){

  highlightedSticker = null;

  searchInput.value = "";

}

        if(!sticker.obtained){
          sticker.obtained = true;
          updateCard();
          return;
        }

        showFloatingMenu(event, sticker, updateCard);

      });

      function updateCard(){

        texto.innerText =
        sticker.obtained
        ? "Obtida"
        : "Em falta";

        if(sticker.obtained){
          card.classList.add("obtida");
        }else{
          card.classList.remove("obtida");
        }

        const existingBadge =
card.querySelector(".repeat-count");

if(existingBadge){
  existingBadge.remove();
}

if(sticker.repeated > 0){

  const badge =
  document.createElement("span");

  badge.classList.add("repeat-count");

  badge.innerText =
  sticker.repeated;

  card.appendChild(badge);

}
   openAlbum(
  albums.indexOf(album)
);
        saveAlbums();
        saveAlbumOnline(album);
        renderAlbums();
      }

      content.appendChild(card);

    });

    section.appendChild(header);

    section.appendChild(content);

    stickersDiv.appendChild(section);

  }

}

floatingButton.addEventListener("click", () => {

  if(menu.style.display === "flex"){
    menu.style.display = "none";
  }else{
    menu.style.display = "flex";
  }

});

createAlbumOption.addEventListener("click", () => {

  const name =
  prompt("Nome do álbum:");

  if(!name) return;

  createAlbum(name);
  

});

joinAlbumOption.addEventListener(
  "click",
  async () => {

    const code =
    prompt(
      "Digite o código do álbum:"
    );

    if(!code) return;

    await joinAlbumByCode(
      code.toUpperCase()
    );

  }
);

document.getElementById(
  "joinFirstAlbum"
)
.addEventListener(
  "click",
  async () => {

    const code =
    prompt(
      "Digite o código do álbum:"
    );

    if(!code) return;

    await joinAlbumByCode(
      code.toUpperCase()
    );

  }
);

backButton.addEventListener("click", () => {

  albumScreen.style.display = "none";

  homeScreen.style.display = "block";

});

filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    currentFilter =
    button.dataset.filter;

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const currentAlbumName =
    selectedAlbumName.innerText;

    const albumIndex =
    albums.findIndex(
      album =>
      album.name === currentAlbumName
    );

    if(albumIndex !== -1){
      openAlbum(albumIndex);
    }

  });

});

toggleSectionsButton
.addEventListener("click", () => {

  sectionsExpanded =
  !sectionsExpanded;

  const allSections =
  document.querySelectorAll(
    ".section-content"
  );

  allSections.forEach((section) => {

    section.style.display =
    sectionsExpanded
    ? "grid"
    : "none";

  });

  const allHeaders =
  document.querySelectorAll(
    ".section-header"
  );

  allHeaders.forEach((header) => {

    const sectionName =
    header.querySelector("span")
    .innerText;

    sectionStates[sectionName] =
    sectionsExpanded;

  });

  toggleSectionsButton.innerText =
  sectionsExpanded
  ? "▲ Esconder tudo"
  : "▼ Ver tudo";

});

function generateAlbumCode(){

  const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let code = "";

  for(let i = 0; i < 6; i++){

    code += chars[
      Math.floor(
        Math.random() * chars.length
      )
    ];

  }

  return code;

}

async function createAlbum(name){

  const newAlbum = {
  id: generateAlbumCode(),
  name: name,
  ownerId: currentUser.uid,

  participants: [
    {
      uid: currentUser.uid,
      name: userProfile.name,
      photo: userProfile.photo
    }
  ],

  stickers: []
};

  // INTRODUÇÃO
  for(let i = 0; i <= 19; i++){

    newAlbum.stickers.push({
      id: `FWC ${String(i).padStart(2, "0")}`,
      obtained: false,
      repeated: 0,
      section: "FIFA WC 2026"
    });

  }

  // SELEÇÕES
  selections.forEach((selection) => {

    for(let i = 1; i <= 20; i++){

      newAlbum.stickers.push({
        id: `${selection.code} ${String(i).padStart(2, "0")}`,
        obtained: false,
        repeated: 0,
        section: selection.name
      });

    }

  });

  albums.push(newAlbum);
saveAlbums();
saveAlbumOnline(newAlbum);
renderAlbums();
}

searchButton
.addEventListener("click", () => {

  const search =
  normalizeStickerCode(
    searchInput.value
  );

  if(!search) return;

  const currentAlbumName =
  selectedAlbumName.innerText;

  const album =
  albums.find(
    album =>
    album.name === currentAlbumName
  );

  if(!album) return;

  const foundSticker =
  album.stickers.find((sticker) => {

    return normalizeStickerCode(
      sticker.id
    ) === search;

  });

  if(!foundSticker){

    alert("Figurinha não encontrada");

    return;

  }

  highlightedSticker =
  foundSticker.id;

  sectionStates[
    foundSticker.section
  ] = true;

  openAlbum(
    albums.indexOf(album)
  );

});

function renderAlbums(){

  albumsList.innerHTML = "";

  if(albums.length === 0){
    emptyMessage.style.display = "flex";
  }else{
    emptyMessage.style.display = "none";
  }

  albums.forEach((album, index) => {

    const card =
    document.createElement("div");

    card.classList.add("album-card");

    const total =
album.stickers.length;

const obtained =
album.stickers.filter(
  sticker => sticker.obtained
).length;

const repeated =
album.stickers.reduce(
  (total, sticker) =>
    total + sticker.repeated,
  0
);

const percentage =
Math.floor(
  (obtained / total) * 100
);
    
    card.innerHTML = `

  <div class="album-card-top">

    <h3>${album.name}</h3>

    ${album.ownerId === currentUser?.uid
    ? `
      <button
        class="delete-album-button"
      >
        🗑️
      </button>
    `
    : ""}

  </div>

  <p class="album-stats-preview">

    ${percentage}% |
    ${obtained} / ${total} |
    ${repeated} repetidas

  </p>

  <div class="progress-bar">

    <div
      class="progress-fill"
      style="
        width: ${percentage}%;
      "
    ></div>

  </div>

  <p>
    Código: ${album.id}
  </p>

`;
    
    
const deleteButton =
card.querySelector(
  ".delete-album-button"
);

deleteButton.addEventListener(
  "click",
  async (event) => {

    event.stopPropagation();

    const confirmDelete =
    confirm(
      "Deseja excluir este álbum?"
    );

    if(!confirmDelete) return;

    albums.splice(index, 1);

    saveAlbums();

    await deleteAlbumOnline(
      album.id
    );

    renderAlbums();

  }
);
    card.addEventListener("click", () => {

      homeScreen.style.display = "none";

      albumScreen.style.display = "block";

      openAlbum(index);

    });

    albumsList.appendChild(card);

  });

}

loadAlbums();
renderAlbums();

if("serviceWorker" in navigator){

  navigator.serviceWorker
  .register("./service-worker.js")

  .then(() => {

    console.log(
      "Service Worker registrado!"
    );

  });

}