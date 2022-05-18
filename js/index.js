document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#github-form');
  // const div = document.getElementById('github-container');
  const configurationObject = {
    method: 'GET',
    headers: {
      "Content-Type": 'application/json',
      Accept: 'application/vnd.github.v3+json'
    }
  }
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    keyword = event.target.search.value;
    fetchUsers(keyword);
  });

  function fetchUsers(keyword) {
    fetch(`https://api.github.com/search/users?q=${keyword}`, configurationObject)
      .then(response => response.json())
      .then(users => {
        console.log(users);
        users.items.forEach(user => {
          listUsers(user)
        });
      });
  }

  function fetchUserRepos(keyword) {
    fetch(`https://api.github.com/users/${keyword}/repos`, configurationObject)
      .then(response => response.json())
      .then(repos => {
        console.log(repos.length);
        repos.forEach(repo => {
          // console.log(repo);
          listUserRepos(repo);
        })
      });
  }

  function listUsers(user) {
    const ul = document.getElementById('user-list');
    const li = document.createElement('li');
    const img = document.createElement('img');
    const a = document.createElement('a');
    const span = document.createElement('span');
    
    span.innerText = `${user.login} `;
    span.style.cursor = 'pointer';
    span.addEventListener('click', (event) => {
      // console.log(event.target.innerText);
      removePrevoiusReposList();
      fetchUserRepos(event.target.innerText);
    });

    img.src = `${user.avatar_url}`;
    img.width = '100';
    img.height = '100';

    a.innerText = `${user.html_url}`;
    a.href = `${user.html_url}`;
    a.target = '_blank';

    li.appendChild(span);
    li.appendChild(img);
    li.appendChild(a);
    ul.appendChild(li);
  }

  function listUserRepos(repo) {
    const a = document.createElement('a');
    const li = document.createElement('li');
    const ul = document.getElementById('repos-list');

    a.innerText = `${repo.html_url}`;
    a.href = `${repo.html_url}`;
    a.target = '_blank';

    li.appendChild(a)
    ul.appendChild(li);
  }

  function removePrevoiusReposList() {
    const ul = document.getElementById('repos-list');
    
    while(ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
  }
});