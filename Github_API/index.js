function getProfile() {
    let userid = document.getElementById('userid');
    let profilePic = document.getElementById('profilePic');
    let bio = document.getElementById('bio');
    let repo = document.getElementById('repo');
    let followerslist = document.getElementById('followerslist');

    // user entered name
    const username = document.getElementById("username").value;

    // Urls
    const profileUrl = `https://api.github.com/users/${username}`;
    const followersUrl = `https://api.github.com/users/${username}/followers`;
    
    Promise.all([fetch(profileUrl), fetch(followersUrl)])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
        followerslist.innerHTML = '';
        const profileData = data[0];
        const followersData = data[1];
        
        console.log(profileData)
        if (profileData.message != 'Not Found') {
            profilePic.src = profileData.avatar_url;
            userid.textContent = profileData.name;
            bio.textContent = profileData.bio;
            repo.textContent = `repositories = ${profileData.public_repos}`;
            
            followersData.map(follower => {
              let list = document.createElement('p');
              list.textContent = follower.login;
              followerslist.append(list);
            });
        }
        else {
            let profile = document.getElementById("profile");
            let followers = document.getElementById("followers");
            let head1 = document.createElement("h1");
            head1.textContent = '404';
            head1.classList.add('js_heads');
            let head2 = document.createElement("h1");
            head2.textContent = '404';
            head2.classList.add('js_heads');
            profile.append(head1);
            followers.append(head2);
        }
      })
    .catch(error => console.log(error));
}
