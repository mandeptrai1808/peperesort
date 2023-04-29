//POPUOVER
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

//RESPONSIVE SUBMENU
let subMenuShow = false;

const subMenuButton = () => {
  const submenu = document.getElementById("sub-menu");
  if (!subMenuShow) {
    submenu.classList.remove("hide-element");
  } else {
    submenu.classList.add("hide-element");
  }
  subMenuShow = !subMenuShow;
};

//Search Form
function submitSearch(){
    let form = document.getElementById("searchForm");
    let dataSearch = document.getElementById("inputSearch").value;
    if(dataSearch.length > 0){
        form.method = "POST";
        form.action = "timkiem.html/"+dataSearch;
        form.submit();
    }
    else{
      alert("Vui lòng nhập nội dung cần tìm kiếm!")
      return false;
    }
    }

// ROOM SHOW
let room_data = [
  {
    id: 0,
    image: "./image/phong/phong1.jpg",
    name: "VEMÖDALEN",
    size: "5m x 5m",
    capacity: 5,
    bed: 2,
    price: 5000000,
  },
  {
    id: 1,
    image: "./image/phong/phong2.jpg",
    name: "Koinophobia",
    size: "4m x 5m",
    capacity: 2,
    bed: 1,
    price: 4500000,
  },
  {
    id: 2,
    image: "./image/phong/phong3.jpg",
    name: "Zenosyne",
    size: "4m x 5m",
    capacity: 3,
    bed: 2,
    price: 550000,
  },
  {
    id: 3,
    image: "./image/phong/phong4.jpg",
    name: "Kenopsia",
    size: "4m x 6m",
    capacity: 4,
    bed: 2,
    price: 550000,
  },
  {
    id: 4,
    image: "./image/phong/phong5.jpg",
    name: "Onism",
    size: "5m x 6m",
    capacity: 5,
    bed: 2,
    price: 650000,
  },
  {
    id: 5,
    image: "./image/phong/phong6.jpg",
    name: "Sonder",
    size: "5m x 6m",
    capacity: 4,
    bed: 2,
    price: 550000,
  },
  {
    id: 6,
    image: "./image/phong/phong7.jpg",
    name: "Nodus tollens",
    size: "3m x 4m",
    capacity: 2,
    bed: 1,
    price: 450000,
  },
  {
    id: 7,
    image: "./image/phong/phong8.jpg",
    name: "Nighthawk",
    size: "6m x 6m",
    capacity: 6,
    bed: 3,
    price: 750000,
  },
  {
    id: 8,
    image: "./image/phong/phong9.jpg",
    name: "Adronitis",
    size: "4m x 6m",
    capacity: 4,
    bed: 2,
    price: 400000,
  },

  {
    id: 9,
    image: "./image/phong/phong10.jpg",
    name: "Kairosclerosis",
    size: "5m x 6m",
    capacity: 4,
    bed: 2,
    price: 550000,
  },
  {
    id: 10,
    image: "./image/phong/phong11.jpg",
    name: "Mal de coucou",
    size: "6m x 6m",
    capacity: 4,
    bed: 2,
    price: 600000,
  },

  {
    id: 11,
    image: "./image/phong/phong12.jpg",
    name: "Ambedo",
    size: "7m x 6m",
    capacity: 6,
    bed: 3,
    price: 800000,
  },
];


//Tìm id của phòng đã đặt trong local storage
const findItemInStorage = (id) => {
  let ItemList = localStorage.getItem('DataOrder');
  ItemList = JSON.parse(ItemList);
  if (!ItemList) ItemList = [];

  return ItemList.findIndex((item) => {
    return item.id == id;
  });
}

//Hiển thị danh sách phòng trong trang phong.html
const show_room = () => {
  let roomContent = document.getElementById("room-content");
  if(roomContent){
    roomContent.innerHTML = ""
   room_data.map((item, index) => {
      var node = document.createElement("div");
      node.classList.add("col-md-4");
      node.classList.add("col-12");
      node.innerHTML = 
       `
      
      <div class="room-card">
        <img class="mb-4-4" src="${item.image}" width="100%" height="300px"/>
        <h5>${item.name}</h5>
        <p><b>Số giường:</b> ${item.bed}</p>
        <p><b>Không gian:</b> ${item.size}</p>
        <p><b>Số người:</b> ${item.capacity}</p>
        <p><b>Giá:</b> ${item.price} VNĐ</p>
        ${findItemInStorage(index) == -1 ? 
          `<button onclick="add_cart(${index})" type="button" class="btn btn-danger w-100">Đặt ngay</button>`
          :
          `<button onclick="alert('Bạn đã đặt phòng này rồi Kiểm tra lại trong trang PHÒNG ĐÃ ĐẶT nhé!')" type="button" class="btn btn-primary w-100">Đã đặt</button>`
        }
      </div>
   
      `
      roomContent.appendChild(node);
    })
    // console.log(node);
  }
}


//Hiển thị dữ liêu jtrong trang cart.html
const show_cart = () => {
  let ItemList = localStorage.getItem('DataOrder');
  ItemList = JSON.parse(ItemList);
  
  //Dữ liệu của bảng cart
  var sumPrice = 0, numberOfRoom = 0;
  let tableContent = document.getElementById("content-table-cart");
  if (tableContent){
    if (!ItemList){
      ItemList = [];
      tableContent.innerHTML = "Bạn vẫn chưa đặt phòng";
    }
    else tableContent.innerHTML = "";
    ItemList.map((item, index) => {
      var node = document.createElement("tr");
      node.innerHTML = `
      <td>${index+1}</td>
      <td class="text-uppercase">${item.name}</td>
      <td class="text-center"><img src="${item.image}" width="100px"/></td>
      <td>
        <p><b>Số giường:</b> ${item.bed}</p>
        <p><b>Không gian:</b> ${item.size}</p>
        <p><b>Số người:</b> ${item.capacity}</p></td>
      <td>Giá: ${item.price} VND</td>
      <td><button onclick="delete_cart(${index})" class="btn btn-danger">Hủy đặt</button></td>
      `;
      tableContent.appendChild(node);
      sumPrice += item.price;
      numberOfRoom ++;
    })
  }

  let resultCart = document.getElementById("result-cart");
  if(resultCart){
   resultCart.innerHTML = `
  <p><b>Tổng số phòng đã đặt:</b> ${numberOfRoom} Phòng</p>
  <p><b>Tổng tiền:</b> ${sumPrice} VND</p>
  <button class="btn btn-primary">Thanh toán</button>
  ` 
  }

}

//Chức năng đặt phòng khi ấn vào nút đặt phòng
const add_cart = async (id) => {
  let ItemList = localStorage.getItem('DataOrder');
  ItemList = JSON.parse(ItemList);
  if (!ItemList) ItemList = [];

  console.log(ItemList);

  let findId = ItemList.findIndex((item) => {
    return item.id == id;
  });


  if (findId == -1 ){
    ItemList.push(room_data[id]);
    await window.localStorage.setItem('DataOrder', JSON.stringify(ItemList))

    show_room();
  }
  else{
    alert("Bạn đã đặt phòng này rồi!")
  }

}

//Xóa phòng đã đặt
const delete_cart = async (id) => {
  let dataOrderLocal = localStorage.getItem('DataOrder');
  dataOrderLocal = JSON.parse(dataOrderLocal);
  if (!dataOrderLocal) dataOrderLocal = []

  dataOrderLocal.splice(id,1);
  await window.localStorage.setItem('DataOrder', JSON.stringify(dataOrderLocal))
  
  show_cart();
}


//Kiểm tra đã đăng nhập hay chưa
const check_user = () => {
  let UserData = localStorage.getItem('UserData');
  UserData = JSON.parse(UserData);
  if (UserData.email){
    let userButton = document.getElementById("user-button");
    if(userButton)
    userButton.innerHTML = `
    <a href="./user.html">
    <div  

    class="user-content p-2 text-right">
     <div>
      <p class="m-0"><b>${UserData.username}</b></p>
      <p class="m-0">${UserData.email}</p>
     </div>
     <div>
      <i class="fas fa-user-circle"></i>
     </div>
    </div>
    </a>
    `

    let userButtonSub = document.getElementById("user-button-sub");
    if(userButtonSub)
    userButtonSub.innerHTML = `
    <a href="./user.html">
    <div  

    class="user-content p-2 text-right">
     <div>
      <p class="m-0"><b>${UserData.username}</b></p>
      <p class="m-0">${UserData.email}</p>
     </div>
     <div>
      <i class="fas fa-user-circle"></i>
     </div>
    </div>
    </a>
    `
    
  }

  
}

const signoutButton = () => {
  localStorage.removeItem('UserData');
  window.location.href = "./index.html";
}

//Hiển thị thông tin trang 
const user_info = () => {
  let UserData = localStorage.getItem('UserData');
  UserData = JSON.parse(UserData);
  let userInfo = document.getElementById("user-info");
  if(UserData && userInfo){
    userInfo.innerHTML = `
     <i style="font-size: 70px;" class="fas fa-user-circle mb-3"></i>
            <p><b>${UserData.username}</b></p>
            <p>${UserData.email}</p>
            <p>${UserData.phone}</p>
            <button onclick="signoutButton()" class="btn btn-danger"><i class="fas fa-sign-out-alt"> </i>Đăng xuất</button>
    `
  }
}


//Tự động chạy hàm khi trang được load
onload =  show_room();
onload =  show_cart();
onload =  check_user();
onload = user_info();

//Update trang khi LocalStorage thay đổi
window.addEventListener('storage', () => {
  show_room();
  show_cart();
});
