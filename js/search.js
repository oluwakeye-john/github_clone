// scoped

(function () {
  const userSearchInputForm = document.querySelector("#user-search-form");
  userSearchInputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userSearchInput = document.querySelector("#user-search-input");
    const searchText = userSearchInput.value;
    window.location.href = `/repositories.html?username=${searchText}`;
  });
})();
