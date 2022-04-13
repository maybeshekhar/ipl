
var selectedTeamId;
function getSelectedTeamDetails()
{
    var url = new URL(window.location.href);
    selectedTeamId = url.searchParams.get("teamId");  
       
    var selectedTeam
    var teamdetails = getTeamDetails();
    for (const team of teamdetails) {
        if (team.teamId == selectedTeamId)
        {            
            selectedTeam = team;
            break;
        }
    }
    return selectedTeam;
}

function populateTeamDetails() {
    team = getSelectedTeamDetails(); 
    players = filterTeamPlayers();
    AddTeamName(team.teamName);
    AddTeamChampionshipWon(team.championshipWon);
    AddTeamNumPlayers(Object.keys(players).length);
    GetTeamPageIconElement(team.teamId);
    AddTopBatsmanDetails(players);
    AddTopBowlerDetails(players);
    populateTeamPlayers(players); 
  }

  function AddTeamName(teamName)
  {
      document.getElementById('team-name').textContent = teamName;
  }

  function AddTeamChampionshipWon(count)
  {
    document.getElementById('championship-won').textContent = count;
  }

  function filterTeamPlayers()
  {
    const players = [];
    var i = 0;
    var playerDetails = getPlayerDetails();
    for (const player of playerDetails)
    {
        if (player.from == selectedTeamId)
        {
            players[i++] = player;
        }
    }

    return players;
  }

  function AddTeamNumPlayers(count)
  {      
    document.getElementById('team-num-players').textContent = count;
  }

  function AddTopBatsmanDetails(players)
  {   
      if (players != null && players.length > 0)
        document.getElementById('top-batsman-name').textContent = players[0].playerName;
  }

  function AddTopBowlerDetails(players)
  {
    if (players != null && players.length > 0)
        document.getElementById('top-bowler-name').textContent = players[players.length - 1].playerName;    
  }



function populateTeamPlayers(players) {
    var section = document.getElementById('team-player-grid');
    section = section.getElementsByClassName('row')
    
    for (const player of players) {
      const cardMainDiv = document.createElement('div'); 
      cardMainDiv.classList.add("col-sm-6")
      cardMainDiv.classList.add("player-id")
      cardMainDiv.classList.add("mt-5");
      cardMainDiv.dataset['playerId'] = player.id;  
      
      const cardDiv = document.createElement('div');  
      cardDiv.classList.add("card");
      cardMainDiv.appendChild(cardDiv);
      // Add image
      cardDiv.appendChild(GetPlayerImageElement(player.id)); 
      
      // player name
      cardDiv.appendChild(GetPlayerNameElement(player.playerName));  

      // player details
      const playerDetailsDiv = document.createElement('ul');
      playerDetailsDiv.classList.add('list-group');
      playerDetailsDiv.classList.add('list-group-flush');

      playerDetailsDiv.appendChild(GetPlayerPriceElement(player.price));      
      playerDetailsDiv.appendChild(GetPlayerRoleElement(player.description));
      playerDetailsDiv.appendChild(GetPlayerStatusElement(player.isPlaying ? "Playing" : "On-Bench"));
      
      cardDiv.appendChild(playerDetailsDiv);
    
      cardMainDiv.addEventListener("click", loadPlayerDetailPage, false);
      section[0].appendChild(cardMainDiv);
    }
  }

  function GetPlayerImageElement(id)
  {
    const img = document.createElement('img');
    img.classList.add("card-img-top");
    img.src="./Images/"+id+".png";
    img.alt="Card image cap"
    return img
  }

  function GetPlayerNameElement(name)
  {
    const cardBody = document.createElement('div');
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add("card-title");
    cardTitle.classList.add("card-player-name");
    cardTitle.textContent=name

    cardBody.appendChild(cardTitle);
    return cardBody;
  }

  function GetPlayerPriceElement(price)
  {
    const priceDiv = document.createElement('li');
    priceDiv.classList.add("list-group-item");
    priceDiv.classList.add("card-player-price");
    priceDiv.textContent=price

    return priceDiv;
  }

  function GetPlayerRoleElement(role)
  {
    const roleDiv = document.createElement('li');
    roleDiv.classList.add("list-group-item");
    roleDiv.classList.add("card-player-role");
    roleDiv.textContent=role

    return roleDiv;
  }

  function GetPlayerStatusElement(status)
  {
    const statusDiv = document.createElement('li');
    statusDiv.classList.add("list-group-item");
    statusDiv.classList.add("card-player-status");
    statusDiv.textContent=status

    return statusDiv;
  }
  
  function GetTeamPageIconElement(teamId)
  {
    document.getElementById('team-img').src ="./Images/"+teamId+".png";
  }

  function loadPlayerDetailPage(event)
  {
    var div = event.srcElement.closest('.player-id');
    selectedPlayer=div.dataset['playerId'];
    location.href = "playerdetails.html?playerId="+selectedPlayer;
  }
  

  populateTeamDetails();



 
  