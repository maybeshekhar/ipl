function addTeam(event)
{       
    var addedTeam = localStorage.getItem('addedTeam');
    var teamName = document['add-team-form']['teamName'].value;
    var championshipWonCount = document['add-team-form']['championshipWon'].value;
    var teamId = document['add-team-form']['teamId'].value;
    
    if (teamName ==  null || teamName === "" || 
        championshipWonCount == null || championshipWonCount === "" || 
        teamId == null || teamId === "")
    {
        showError("All fields are mandatory!!!");
        return;
    }

    if (teamId.length > 5)
    {
        showError("Team id should be less than 5 character");
        return;
    }

    if (!validateTeamDetails(teamId, teamName))
    {
        console.log("here");
        return;
    }
    var newTeam = {
        "teamName" : teamName,
        "championshipWon" : championshipWonCount,
        "teamId" : teamId.toUpperCase()
    }

    if (addedTeam == null)
    {
        addedTeam = []
        addedTeam[0] = newTeam;
    }
    else {
        addedTeam = JSON.parse(addedTeam);
        addedTeam[addedTeam.length] = newTeam;
    }
    
    console.log(addedTeam)
    localStorage.setItem('addedTeam', JSON.stringify(addedTeam));    
    showSuccess();
}

function showError(message)
{
    const failAlert = document.getElementById("team-creation-failure");
    failAlert.style.visibility="visible"
    failAlert.textContent = message;
    const successAlert = document.getElementById("team-creation-successful");
    successAlert.style.visibility="hidden"
}

function showSuccess()
{
    const successAlert = document.getElementById("team-creation-successful");
    successAlert.style.visibility="visible"
    const failAlert = document.getElementById("team-creation-failure");

    failAlert.style.visibility="hidden"
}

function validateTeamDetails(teamId, teamName)
{
    var teamDetails = getTeamDetails();
    for (var team of teamDetails)
    {
        if(team.teamId.toUpperCase() == teamId)
        {
            showError("Team Id Already Present");
            return false;
        }
        if(team.teamName.toUpperCase() == teamName.toUpperCase())
        {
            showError("Team Name Already Present");
            return false;
        }
    }

    return true;
}

function addPlayer(event)
{       
    var addedPlayers = localStorage.getItem('addedPlayers');
    var playerName = document['add-player-form']['playerName'].value;
    var role = document['add-player-form']['role'].value;
    var teamId = document['add-player-form']['teamId'].value;
    var isPlaying = document['add-player-form']['isPlaying'].value;
    var price = document['add-player-form']['price'].value;
    
    if (playerName ==  null || playerName === "" || 
        role == null || role === "" || 
        teamId == null || teamId === "" ||
        isPlaying == null || isPlaying == "" ||
        price == null || price == "")
    {
        showError("All fields are mandatory!!!");
        return;
    }

    if (!validatePlayerDetails(teamId, playerName))
    {        
        return;
    }

    var newPlayer = {
        "id" : getPlayerDetails().length + 1,
        "playerName": playerName,
        "from" : teamId.toUpperCase(),
        "price": price + " Cr",
        "isPlaying": (isPlaying == 1),
        "description": role
    }

    console.log(newPlayer);
    if (addedPlayers == null)
    {
        addedPlayers = []
        addedPlayers[0] = newPlayer;
    }
    else {
        addedPlayers = JSON.parse(addedPlayers);
        addedPlayers[addedPlayers.length] = newPlayer;
    }
    
    console.log(addedPlayers)
    localStorage.setItem('addedPlayers', JSON.stringify(addedPlayers));    
    showSuccess();
}

function validatePlayerDetails(teamId, playerName)
{
    var teamDetails = getTeamDetails();
    var foundTeam = false;
    for (var team of teamDetails)
    {
        if(team.teamId.toUpperCase() == teamId.toUpperCase())
        {
            foundTeam = true;
            break;
        }        
    }

    if (!foundTeam)
    {
        showError("Invalid Team Id");
        return
    }

    var playerDetails = getPlayerDetails();
    for (var player of playerDetails)
    {
        if(player.playerName.toUpperCase() == playerName.toUpperCase())
        {
            showError("Player already exists!!!");
            return;
        }        
    }

    return true;
}

