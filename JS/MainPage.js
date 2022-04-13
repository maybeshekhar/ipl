var selectedTeam;

function populate() {
    var teamDetails = getTeamDetails();
    populateTeams(teamDetails);  
}

  function populateHeroes(teams) {
    var section = document.getElementsByClassName('container');
    section = section[0].getElementsByClassName('row')
    console.log(section)
  
    for (const team of teams) {
      const myArticle = document.createElement('div'); 
      const myH2 = document.createElement('h2');
      const myPara1 = document.createElement('p');
      const myList = document.createElement('ul');
  
      myArticle.classList.add(['col-sm-4']);
      myArticle.id = team.teamId;      
      myH2.textContent = team.teamName;      
      myPara1.textContent = `Championship Won: ${team.championshipWonCount}`;
  
      myArticle.appendChild(myH2);
      myArticle.appendChild(myPara1);
  
      myArticle.addEventListener("click", loadTeamDetailPage, false);
      section[0].appendChild(myArticle);
    }
  }
  
  function populateTeams(teams) {      
    var section = document.getElementById('team-grid');
    section = section.getElementsByClassName('row')
  
    for (const team of teams) {
      const cardMainDiv = document.createElement('div'); 
      cardMainDiv.classList.add("col-sm-4")
      cardMainDiv.classList.add("team-id")
      cardMainDiv.classList.add("mt-3")
      cardMainDiv.dataset['teamId'] = team.teamId;   
      const cardDiv = document.createElement('div');   
      cardDiv.classList.add("card");
      
      // Add image
      cardDiv.appendChild(GetTeamIconElement(team.teamId)); 
      
      // player name
      cardDiv.appendChild(GetTeamNameElement(team.teamName));  
      cardMainDiv.appendChild(cardDiv);  
      cardMainDiv.addEventListener("click", loadTeamDetailPage, false);
      section[0].appendChild(cardMainDiv);
    }
  }

  function GetTeamNameElement(name)
  {
    const cardBody = document.createElement('div');
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add("card-title");
    cardTitle.classList.add("card-team-name");
    cardTitle.textContent=name

    cardBody.appendChild(cardTitle);
    return cardBody;
  }


  function GetTeamIconElement(teamId)
  {
    const img = document.createElement('img');
    img.classList.add("card-img-top");
    img.src="./Images/" + teamId + ".png";
    img.alt="Card image cap"
    return img
  }



  function loadTeamDetailPage(event)
  {
    var div = event.srcElement.closest('.team-id');
    selectedTeam=div.dataset['teamId'];
    console.log(selectedTeam);
    location.href = "teamdetails.html?teamId="+selectedTeam;
  }
  
   // Search Feature
   function searchFunction(event)
   {
     var div = document.getElementById('search-input');     
     console.log(event.value)
     teamId=event.value?.toUpperCase();
     const teamPlayers = [];
     var i = 0
     var playerDetails = getPlayerDetails()
     if (teamId != null)
     {
        for (player of playerDetails)
        {
            if (teamId == player.from)
            {
                teamPlayers[i++] = player;
            }
        }
     }
     

     const menuDiv = document.getElementById("search-menu");
     menuDiv.innerHTML="";
     for (player of teamPlayers)
     {
         const listElement = document.createElement('li');
         const clickElement = document.createElement('a');
         clickElement.href="playerdetails.html?playerId="+player.id;
         clickElement.textContent = player.playerName;
         listElement.appendChild(clickElement);
         
         menuDiv.appendChild(listElement);
         const divider = document.createElement('div')
         divider.classList.add('dropdown-divider');
         menuDiv.appendChild(divider);
     }
   }

   populate();
  