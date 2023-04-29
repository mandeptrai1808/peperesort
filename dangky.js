const validateRegisterForm = () => {
  let UserList = localStorage.getItem('UserList');
  UserList = JSON.parse(UserList);
  if (!UserList) UserList = [];
  let check = true;
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let password = document.getElementById("password").value;
  let repassword = document.getElementById("repassword").value;

  if(UserList.findIndex((item, ind) => {
    return item.email == email
  }) != -1){
    alert("Email đã tồn tại!");
    check = false;
  }

  if (password!=repassword){
    alert("Mật khẩu xác nhận không trùng khớp!");
    check = false;
  }
  if(check){
    UserList.push({
        username, email, phone, password
    })
    localStorage.setItem('UserList', JSON.stringify(UserList))
    alert("Đăng kí thành công!");
  }
  return check;
}