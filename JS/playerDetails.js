
var selectedPlayerId;
function getSelectedPlayerDetails()
{
    var url = new URL(window.location.href);
    selectedPlayerId = url.searchParams.get("playerId"); 

    var selectedPlayer
    var playerDetails = getPlayerDetails();
    for (const player of playerDetails) {
        if (player.id == selectedPlayerId)
        {            
            selectedPlayer = player;
            break;
        }
    }
    return selectedPlayer;
}

function populatePlayerDetails() {
    player = getSelectedPlayerDetails();    
    AddPlayerName(player.playerName);
    AddPlayerImage(player.id); 
    AddPlayerTeamImage(player.from);
    AddPlayerPrice(player.price);
    AddPlayerDescription(player.description);
    AddPlayerIsPlaying(player.isPlaying);
}

  function AddPlayerName(playerName)
  {
      document.getElementById('player-name').textContent = playerName;
  }

  function AddPlayerPrice(price)
  {
    document.getElementById('player-price').textContent = price;
  }

  function AddPlayerIsPlaying(isPlaying)
  {
      var playing = isPlaying ? "Playing" : "On-Bench";
    document.getElementById('player-is-playing').textContent = playing
  }

  function AddPlayerDescription(description)
  {
    document.getElementById('player-description').textContent = description;
  }

  function AddPlayerImage(id)
  {    
    document.getElementById('player-img').src ="./Images/"+id+".webp";;    
  }

  function AddPlayerTeamImage(id)
  {    
    document.getElementById('player-team-img').src ="./Images/"+id+".png";   
  }
  
  populatePlayerDetails();
  