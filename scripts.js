let subMenuShow = false;

const subMenuButton  = () => {
  
  const submenu = document.getElementById('sub-menu');
  if(!subMenuShow){
    submenu.classList.remove('hide-element');
  }
  else{
    submenu.classList.add('hide-element');

  }
  subMenuShow = !subMenuShow;
}