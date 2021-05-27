// scoped

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

    const visibleThreshold = 385;

    window.document.addEventListener("scroll", () => {
      if (window.scrollY > visibleThreshold) {
        vcard.classList.add(isOpenClass);
      } else {
        vcard.classList.remove(isOpenClass);
      }
    });
  }

  handleHamburger();
  handleVCardScroll();
})();
