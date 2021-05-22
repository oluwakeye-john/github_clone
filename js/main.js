(function () {
  function handleHamburger() {
    const hamburgerButton = document.querySelector("#mobile-hamburger");
    const menuList = document.querySelector(".header__left__list");

    const openClass = "is-hamburger-open";

    hamburgerButton.addEventListener("click", () => {
      //show-list
      if (menuList.classList.contains(openClass)) {
        menuList.classList.remove(openClass);
      } else {
        menuList.classList.add(openClass);
      }
    });
  }

  function handleVCardScroll() {
    const vcard = document.querySelector("#desktop-vcard");
    const isOpenClass = "show-vcard";

    const visibleThreshold = 330;

    window.document.addEventListener("scroll", () => {
      if (window.scrollY > visibleThreshold) {
        console.log("open");
        vcard.classList.add(isOpenClass);
      } else {
        console.log("cloase");
        vcard.classList.remove(isOpenClass);
      }
    });
  }

  handleHamburger();
  handleVCardScroll();
})();
