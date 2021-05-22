(function () {
  const graphqlQuery = `
{
    user(login: "John-pels") {
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
      repositories(last: 20, isFork: false) {
        nodes {
          name
          description
          url
          stargazerCount
          updatedAt
          forkCount
          isPrivate
          createdAt
          languages{
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

  fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `token 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 `,
    },
    body: JSON.stringify({ query: graphqlQuery }),
  })
    .then((data) => data.json())
    .then((data) => {
      const user = data.data.user;
      console.log(user);

      document.title = `${user.login} (${user.name}) / Repositories`;

      const fullnameElements = document.querySelectorAll(
        "[data-user='fullname']"
      );

      const usernameElements = document.querySelectorAll(
        "[data-user='username']"
      );

      const emailElements = document.querySelectorAll("[data-user='email']");

      const bioElements = document.querySelectorAll("[data-user='bio']");

      const followersElements = document.querySelectorAll(
        "[data-user='followers']"
      );

      const followingElements = document.querySelectorAll(
        "[data-user='following']"
      );

      const starsElements = document.querySelectorAll("[data-user='stars']");

      const avatarElements = document.querySelectorAll("[data-user='avatar']");

      const statusEmojiElements = document.querySelectorAll(
        "[data-user='status-emoji']"
      );
      const statusMessageElements = document.querySelectorAll(
        "[data-user='status-message']"
      );

      fullnameElements.forEach((elem) => {
        elem.innerText = user.name;
      });

      usernameElements.forEach((elem) => {
        elem.innerText = user.login;
      });

      emailElements.forEach((elem) => {
        elem.innerText = user.email;
      });

      bioElements.forEach((elem) => {
        elem.innerText = user.bio;
      });

      followersElements.forEach((elem) => {
        elem.innerText = `${user.followers.totalCount} followers `;
      });

      followingElements.forEach((elem) => {
        elem.innerText = ` ${user.following.totalCount} following `;
      });

      starsElements.forEach((elem) => {
        elem.innerText = user.starredRepositories.totalCount;
      });

      avatarElements.forEach((elem) => {
        elem.src = user.avatarUrl;
      });

      statusEmojiElements.forEach((elem) => {
        elem.innerHTML = user.status.emojiHTML;
      });

      statusMessageElements.forEach((elem) => {
        elem.innerText = user.status.message;
      });
    });
})();
