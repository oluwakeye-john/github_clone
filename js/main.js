(function () {
  function handleHamburger() {
    const hamburgerButton = document.querySelector("#mobile-hamburger");
    const menuList = document.querySelector(".header__left__list");

    hamburgerButton.addEventListener("click", () => {
      //show-list
      if (menuList.classList.contains("is-open")) {
        menuList.classList.remove("is-open");
      } else {
        menuList.classList.add("is-open");
      }
    });
  }
  handleHamburger();
})();
