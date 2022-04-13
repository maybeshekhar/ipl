


function loadData()
{
    localStorage.setItem("teamDetails", JSON.stringify(teamList));
    localStorage.setItem("playerDetails", JSON.stringify(playerList));
}

function getTeamDetails()
{
    var teamDetails = JSON.parse(localStorage.getItem('teamDetails'));
    var addedTeam = JSON.parse(localStorage.getItem('addedTeam'));
    console.log(addedTeam)
    if (addedTeam != null)
    {
        teamDetails=teamDetails.concat(addedTeam);
    } 
    console.log(teamDetails)
    return teamDetails;
}

function getPlayerDetails()
{
    var playerDetails = JSON.parse(localStorage.getItem('playerDetails'));
    var addedPlayers = JSON.parse(localStorage.getItem('addedPlayers'));
    
    if (addedPlayers != null)
    {
        playerDetails=playerDetails.concat(addedPlayers);
    } 
    return playerDetails;
}

loadData();
