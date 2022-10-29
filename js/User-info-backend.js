let cardCont = document.querySelector(".card-cont");
let rightContainer = document.querySelector(".right-container");
let mainUrl = "https://jsonplaceholder.typicode.com";
let users;
let todos;
let albums;
let photos;
let posts;

axios({
  url: mainUrl + "/users",
  method: "get",
}).then((res) => {
  users = res.data;
  let s = "";
  users.map((user) => {
    let { id, name, username, email, address, phone, company } = user;
    s += `
        <div class="card">
                <div class="card-header">
                    <img src="./pics/Black-User-Graphic-Icon.png" alt="user-icon">
                    <h1>${id}) ${name}</h1>
                </div>
                <div class="card-body">
                    <div class="info-box1">
                        <div class="name-number">
                            <h3>${username}</h3>
                            <p>${email}</p>
                            <span class="bold">Pnone:&nbsp</span><span>${phone}</span>
                        </div>
                        <div class="company">
                            <h3>Company</h3>
                            <p>${company.name}</p>
                        </div>
                    </div>
                    <hr>
                    <div class="info-box2">
                        <div class="address">
                            <h4>Address</h4>
                            <span class="bold">City:&nbsp</span><span>${address.city}</span>
                            <br>
                            <br>
                            <span class="bold">Street:&nbsp</span><span>${address.street}</span>
                        </div>
                        <div class="company-phase">
                            <p>Company Phase</p>
                            <span>${company.catchPhrase}</span>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <button onclick="drawTodos(${id})">Todo</button>
                    <button onclick="drawAlbums(${id})">Albums</button>
                    <button onclick="drawPosts(${id})">Posts</button>
                </div>
            </div>
        `;
  });

  cardCont.innerHTML = s;
});

function drawTodos(userId) {
  axios({
    url: mainUrl + `/users/${userId}/todos`,
    method: "get",
  }).then((res) => {
    todos = res.data;
    let s = "<h1>Todos</h1>";
    todos.map((todo) => {
      let { id, title, completed } = todo;
      s += `
                <input ${completed ? "checked" : ""} type="checkbox"><span>${id}) ${title}</span>
                <br>
            `;
    });
    rightContainer.innerHTML = s;
  });
}

function drawAlbums(userId) {
  axios({
    url: mainUrl + `/users/${userId}/albums`,
    method: "get",
  }).then((res) => {
    albums = res.data;
    let s = "<h1>Albums</h1>";
    albums.map((album) => {
      let { id, title } = album;
      s += `
            <div class="show-picture">
                <span>${id}) ${title}</span><button onclick='drawPictures(${id})'>Show Pictures</button>
            </div>
            `;
    });
    rightContainer.innerHTML = s;
  });
}

function drawPosts(userId) {
  axios({
    url: mainUrl + `/users/${userId}/posts`,
    method: "get",
  }).then((res) => {
    posts = res.data;
    let s = "<h1>Posts</h1>";
    posts.map((post) => {
      let { id, title, body } = post;
      s += `
            <div class='post-wrapper'>
                <div class="posts">
                <div class="post-header">
                    <h2>${id}) ${title}</h2>
                </div>
                <div class="post-body">
                    <p>${body}</p>
                </div>
                </div>
            </div>
            `;
    });
    rightContainer.innerHTML = s + `<img onclick="handleScroll()" class="green-arrow" src="./pics/green arrow Up.png" alt="arrow">`;
  });
}

function drawPictures(albumId) {
  axios({
    url: mainUrl + `/albums/${albumId}/photos`,
    method: "get",
  }).then((res) => {
    photos = res.data;
    let s = "<h1>Photos</h1>";
    photos.map((photo) => {
      let { id, title, url } = photo;
      s += `
            <span>${id}) ${title}</span>
            <br>
            <br>
            <img src="${url}" alt="pic${id}">
            `;
    });
    rightContainer.innerHTML = s + `<img onclick="handleScroll()" class="green-arrow" src="./pics/green arrow Up.png" alt="arrow">`;
  });
}

function handleScroll() {
  rightContainer.scroll({
    top: 0,
    behavior: "smooth",
  });
}
