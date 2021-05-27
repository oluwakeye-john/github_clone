// scoped

(function () {
  const getGraphQLQuery = (username) => {
    return `{
    user(login: "${username}") {
      login
      avatarUrl
      name
      bio
      email
      followers{
        totalCount
      }
      following{
        totalCount
      }
      starredRepositories{
        totalCount
      }
      status {
        emojiHTML
        message
        __typename
      }
      repositories(first: 20, isFork: false, privacy:PUBLIC, ownerAffiliations:OWNER, orderBy: {field: UPDATED_AT, direction: DESC}) {
        nodes {
          name
          description
          url
          stargazerCount
          updatedAt
          forkCount
          isPrivate
          createdAt
          languages(first:5, orderBy: {field: SIZE,direction:DESC}) {
            nodes{
              id
              name
              color
            }
          }
        }
      }
    }
  }
  `;
  };

  const formatCount = (inp) => {
    const value = Number(inp);
    if (!value) return 0;
    return value >= 1000 ? (value / 1000).toFixed(1) + "k" : value;
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formatDate = (val) => {
    const dt = new Date(val);
    const month = months[dt.getMonth()];
    const date = dt.getDate();
    const year = dt.getFullYear();
    const fDate = date < 10 ? `0${date}` : date;
    return `${fDate} ${month} ${year}`;
  };

  const updatePageTitle = (value) => {
    document.title = value;
  };

  const updateFullname = (value) => {
    const elements = document.querySelectorAll("[data-user='fullname']");

    elements.forEach((elem) => {
      elem.innerText = value;
    });
  };

  const updateUsername = (value) => {
    const elements = document.querySelectorAll("[data-user='username']");
    elements.forEach((elem) => {
      elem.innerText = value;
    });
  };

  const updateEmail = (value) => {
    const elements = document.querySelectorAll("[data-user='email']");
    elements.forEach((elem) => {
      elem.innerText = value;
    });
  };

  const updateHasEmail = (value) => {
    const elements = document.querySelectorAll("[data-user='has-email']");
    elements.forEach((elem) => {
      if (value) {
        elem.classList.remove("hide");
      }
    });
  };

  const updateBio = (value) => {
    const elements = document.querySelectorAll("[data-user='bio']");
    elements.forEach((elem) => {
      elem.innerHTML = value;
    });
  };

  const updateFollowers = (value) => {
    const elements = document.querySelectorAll("[data-user='followers']");
    elements.forEach((elem) => {
      elem.innerHTML = `<strong>${formatCount(value)}</strong> followers`;
    });
  };

  const updateFollowing = (value) => {
    const elements = document.querySelectorAll("[data-user='following']");
    elements.forEach((elem) => {
      elem.innerHTML = `<strong>${formatCount(value)}</strong> following`;
    });
  };

  const updateStars = (value) => {
    const elements = document.querySelectorAll("[data-user='stars']");
    elements.forEach((elem) => {
      elem.innerHTML = `<strong>${formatCount(value)}</strong>`;
    });
  };

  const updateAvatar = (value) => {
    const elements = document.querySelectorAll("[data-user='avatar']");
    elements.forEach((elem) => {
      elem.src = value;
    });
  };

  const updateStatusContainer = (value) => {
    const elements = document.querySelectorAll("[data-user='status']");
    elements.forEach((elem) => {
      if (value) {
        elem.classList.remove("hide");
      }
    });
  };

  const updateStatusEmoji = (value) => {
    const elements = document.querySelectorAll("[data-user='status-emoji']");
    elements.forEach((elem) => {
      elem.innerHTML = value;
    });
  };

  const updateStatusMessage = (value) => {
    const elements = document.querySelectorAll("[data-user='status-message']");
    elements.forEach((elem) => {
      elem.innerText = value;
    });
  };

  const updateRepoCount = (value) => {
    const elements = document.querySelectorAll("[data-user='repo-count']");
    elements.forEach((elem) => {
      elem.innerText = value;
    });
  };

  const updateRepoList = (repositories) => {
    const repoParent = document.querySelector("[data-user='repositories']");
    repositories.forEach((repo) => {
      const languages = repo.languages.nodes;
      const firstLanguage = languages?.[0];

      const languageTemplate = `
       
       <div class="repository-card__base__language">
            <div class="repository-card__base__language__dot" style="background-color: ${firstLanguage?.color}"></div>
            ${firstLanguage?.name}
          </div>
       `;
      const builder = `
      <div class="repository-card">
      <div class="repository-card__left">
      <a href=${repo.url} target="_blank">
      <h4 class="repository-card__name">${repo.name}</h4>
      </a>
        <div class="repository-card__description">
          ${repo.description || ""}
        </div>
        <div class="repository-card__base">
          ${languages?.length > 0 ? languageTemplate : ""}
          <div>
            Updated on ${formatDate(repo.updatedAt)}
          </div>
        </div>
      </div>
      <div>
        <button class="btn repository-card__star">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
            <path fill-rule="evenodd"
              d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
            </path>
          </svg>
          Star
        </button>
      </div>
    </div>
        `;
      const d = document.createElement("div");
      d.innerHTML = builder;
      repoParent.appendChild(d);
    });
  };

  const urlParams = new URLSearchParams(window.location.search);
  const searchUsername = urlParams.get("username");

  const query = getGraphQLQuery(searchUsername);

  const encodedString =
    "Z2hwX0RKVE1JR05TWUF5M1lCTkZwVVhuUERwTkpHakVHeDBVRFRjTw==";

  const decodedString = window.atob(encodedString);

  fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `token ${decodedString} `,
    },
    body: JSON.stringify({ query }),
  })
    .then((data) => data.json())
    .then((data) => {
      const user = data.data.user;

      if (!user) {
        //if user is not found, show error content
        document.querySelector(".page-error-content").classList.remove("hide");
        return;
      }

      const repositories = user.repositories.nodes;
      console.log(user);

      updatePageTitle(`${user.login} (${user.name}) / Repositories`);
      updateFullname(user.name);
      updateUsername(user.login);
      updateEmail(user.email);
      updateHasEmail(user.email);
      updateBio(user.bio);
      updateFollowers(user.followers.totalCount);
      updateFollowing(user.following.totalCount);
      updateStars(user.starredRepositories.totalCount);
      updateAvatar(user.avatarUrl);
      updateStatusContainer(user.status);
      updateStatusEmoji(user.status?.emojiHTML);
      updateStatusMessage(user.status?.message);
      updateRepoCount(repositories?.length || 0);
      updateRepoList(repositories);

      //show page content
      document.querySelector(".page-data-content").classList.remove("hide");
    })
    .finally(() => {
      //hide loader
      document.querySelector(".page-loader").classList.add("hide");
    });
})();
