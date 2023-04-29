const submitLogin = () => {

    // alert("helo");

    let UserList = localStorage.getItem('UserList');
    UserList = JSON.parse(UserList);
    if (!UserList) UserList = [];

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let userFind = UserList.find((item, index) => {
      return item.email == email;
    })

    if(userFind){
        if(userFind.password == password){
            localStorage.setItem('UserData', JSON.stringify(userFind));
            return true;
        }
        else{
            alert ("Tài khoản không tồn tại hoặc mật khẩu không đúng!")
            return false;
        }
    }
    else{
        alert ("Tài khoản không tồn tại hoặc mật khẩu không đúng!")
        return false;
    }
}