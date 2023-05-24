function changeTab(index) {

    var tabs = document.getElementsByClassName('tab');
    var tabContents = document.getElementsByClassName('tab-content');
  

    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active');
      tabContents[i].classList.remove('active');
    }
  

    tabs[index].classList.add('active');
    tabContents[index].classList.add('active');
  }