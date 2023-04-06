const allCrafts = document.getElementById("allCrafts");
const allRockets = document.getElementById("allRockets");
const allCenters = document.getElementById("allCenters");
const search_by_state = document.getElementById("search_by_state");
const search_by_Country = document.getElementById("search_by_Country");
const displayHere = document.getElementById("displayHere");

// For all spaceCrafts
allCrafts.addEventListener("click", () => {
  fetch("https://isro.vercel.app/api/spacecrafts")
    .then(response => response.json())
    .then(data => {
      displayHere.innerHTML = '';
      let head =  document.createElement('h1');
      head.textContent = 'Spacecrafts';
      head.style.marginBottom = '1rem';
      head.style.textDecoration = 'underline';
      let spacecrafts = data.spacecrafts;
      let spacecraftsList = document.createElement('div');
      spacecraftsList.classList.add('grid_col');
      spacecrafts.forEach(spacecraft => {
        let listitems = document.createElement('p');
        listitems.textContent = spacecraft.name;
        spacecraftsList.append(listitems);
      });
      displayHere.append(head);
      displayHere.append(spacecraftsList);
    })
    .catch(error => console.log(error));
});

//For all Rockets
allRockets.addEventListener("click", () => {
    fetch("https://isro.vercel.app/api/launchers")
      .then(response => response.json())
      .then(data => {
        displayHere.innerHTML = '';
        let head =  document.createElement('h1');
        head.textContent = 'Rockets';
        head.style.marginBottom = '1rem';
        head.style.textDecoration = 'underline';
        let launchers = data.launchers;
        let launchersList = document.createElement('div');
        launchersList.classList.add('grid_col');
        launchers.forEach(launcher => {
          let listitems = document.createElement('p');
          listitems.textContent = launcher.id;
          launchersList.append(listitems);
        });
        displayHere.append(head);
        displayHere.append(launchersList);
      })
      .catch(error => console.log(error));
});

// For all spaceCenters
allCenters.addEventListener("click", () => {
    fetch("https://isro.vercel.app/api/centres")
      .then(response => response.json())
      .then(data => {
        displayHere.innerHTML = '';
        let head =  document.createElement('h1');
        head.textContent = 'Centers';
        head.style.marginBottom = '1rem';
        head.style.textDecoration = 'underline';
        let centres = data.centres;
        let centresList = document.createElement('div');
        centresList.classList.add('grid_col_2');
        centres.forEach(centre => {
          let listitems = document.createElement('p');
          listitems.textContent = `${centre.name} at ${centre.State}`;
          centresList.append(listitems);
        });
        displayHere.append(head);
        displayHere.append(centresList);
      })
      .catch(error => console.log(error));
});


// Search by state
function searchState() {
    let stateName = search_by_state.value.trim().toLowerCase();
    if (!stateName) {
        displayHere.innerHTML = "<p>Please enter a state name.</p>";
        displayHere.classList.add('font');
        displayHere.style.color = '#FA9884';
        return;
    }
    fetch("https://isro.vercel.app/api/centres")
      .then(response => response.json())
      .then(data => {
        displayHere.innerHTML = '';
        let centres = data.centres;
        let centresList = "<ul>";
        centres.forEach(centre => {
            if (stateName === centre.State.trim().toLowerCase() ) {
                centresList += `<li>${centre.name}</li>`;
                found = true;
            }
        });
        centresList += "</ul>";
        if (found) {
            displayHere.innerHTML = centresList;
            displayHere.classList.add('font');
            displayHere.style.color = 'black';

        } else {
            displayHere.innerHTML = "<p>No results found.</p>";
            displayHere.classList.add('font');
        }
    })
      .catch(error => console.log(error));
}

// Search by country
function searchCountry(){
    let countryName = search_by_Country.value.trim().toLowerCase();
    if (!countryName) {
        displayHere.innerHTML = "<p>Please enter a country name.</p>";
        displayHere.classList.add('font');
        displayHere.style.color = '#FA9884';
        return;
    }
    fetch("https://isro.vercel.app/api/customer_satellites")
    .then(response => response.json())
    .then(data => {
        displayHere.innerHTML = '';
        let details = data.customer_satellites;
        let centresList = document.createElement('div');
        centresList.style.display = 'flex';
        centresList.style.flexDirection = 'column'
        centresList.style.gap = '2rem';
        details.forEach(detail => {
            if (countryName === detail.country.trim().toLowerCase() ) {
                let listitems = document.createElement('div');
                let name = document.createElement('p');
                name.textContent = `Satellite = ${detail.id}`;
                let launch = document.createElement('p');
                launch.textContent =`Launch date = ${detail.launch_date}`;
                listitems.append(name);
                listitems.append(launch);
                centresList.append(listitems);
            }
        });
        displayHere.append(centresList);
        displayHere.style.color = 'black';
        displayHere.style.fontSize = '1.4rem'
    })
    
}