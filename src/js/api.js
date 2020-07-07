import {getAll} from './db.js'
	var competitionUrl = "http://api.football-data.org/v2/competitions/2001/teams"
	var teamUrl = "http://api.football-data.org/v2/teams/"


	async function getStandings() {
	    await fetch(competitionUrl,{
	        headers: {
	            'X-Auth-Token': '5a17945d57c04a18a04f10585331a0f7'
	        }
	    })
	    .then(response => response.json())
	    .then(data => {
	    var teams = "";
	    data.teams.forEach(data => {

	        teams += `
	        <div class="row">
	            <div class="col s12 m12">
	            <a href="src/team.html?id=${data.id}">
	            <div class="card-panel deep-purple " style="overflow:hidden;text-align:center" onclick="window.location.href='team.html?id${data.id}'">
	                <img src="${data.crestUrl}" onerror="this.src='src/img/logo-default.png'" width="50" height="50" alt="team logo" style="float:left"></img>
	                <div class="card-content white-text">
	                    <h6>
	                        ${data.name}
	                    </h6>
	                </div>
	            </div>
	            </a>
	            </div>
	        </div> 
	        `
	    })

	    document.querySelector("main").innerHTML = teams;
	    })
	    .catch(error => {
	        console.log(error)
	    })

	}


	function getStandingById() {
	return new Promise(function(resolve, reject) {
	  // Ambil nilai query parameter (?id=)
      var urlParams = new URLSearchParams(window.location.search);
      var idParam = urlParams.get("id");

	    fetch(teamUrl + idParam,{
	        headers: {
	            'X-Auth-Token': '5a17945d57c04a18a04f10585331a0f7'
	        }
	    })
	    .then(response => response.json())
	    .then(data => {
	        let teamInfo = `
	        <div class="fixed-action-btn">
	            <a class="btn-floating btn-large red" id="save" onclick="saveData()">
	            <i class="fa fa-floppy-o" aria-hidden="true"></i>
	            </a>
	        </div>
	        <h4>Detail Team</h4> 
	             <table>
	        <tbody>
	          <tr>
	            <td>Name</td>
	            <td>${data.name} , ${(data.shortName === null) ? '' : data.shortName} , ${(data.tla === null) ? '' : data.tla}</td>
	          </tr>
	          <tr>	
	            <td>Logo</td>
	            <td><img src="${data.crestUrl}" onerror="this.src='img/logo-default.png'" alt="logo" width="50" height="50"/></td>
	          </tr>
	          <tr>
	            <td>Contact</td>
	            <td>${(data.phone === null) ? '' : data.phone} , ${(data.email === null) ? '' : data.email} , ${(data.website === null) ? '' : data.website} </td>
	          </tr>
	          <tr>
	            <td>Address</td>
	            <td>${(data.address === null) ? '' : data.address}</td>
	          </tr>
	          <tr>
	            <td>Founded</td>
	            <td>${(data.founded === null) ? '' : data.founded}</td>
	          </tr>
	          <tr>
	            <td>Venue </td>
	            <td>${(data.venue === null) ? '' : data.venue}</td>
	          </tr>
	        </tbody>
	      </table>
			<br />
	      <h5>Squad</h5>
	        ` 
	        let squad =""
	        data.squad.forEach(data => {
	        let color;
	        if(data.position === 'Goalkeeper') {
	            color = "yellow darken-3"
	        }

	        else if(data.position === 'Defender') {
	             color = "blue"
	        }

	        else if(data.position === 'Midfielder') {
	             color = "lime darken-1"
	        }

	        else if(data.position === 'Attacker') {
	             color = "red darken-1"
	        }

	        else{ 
	             color = "grey lighten-1"
	        }

	            squad += ` 

	            <div class="card ${color}">
	                <div class="card-content white-text">
	                <span class="card-title">${data.name}</span>
	                <p>
	                    ${(data.position === null) ? data.role : data.position}
	                </p>
	                </div>
	            </div>`
	        })

	        teamInfo += squad
	        document.querySelector("main").innerHTML = teamInfo
			resolve(data)
	    })   
	    .catch(error => {
	        console.log(error)
	    })
	})
	} 

function getSavedById(id) {
	getAll().then(teams => {
		teams.forEach(data => {
			if(data.id == id) {
		        let teamInfo = `
				<a class="btn deep-purple" onclick="deleteData(${data.id})">delete</a>
		        <h4>Detail Team</h4> 
		             <table>
		        <tbody>
		          <tr>
	            <td>Name</td>
	            <td>${data.name} , ${(data.shortName === null) ? '' : data.shortName} , ${(data.tla === null) ? '' : data.tla}</td>
	          </tr>
	          <tr>	
	            <td>Logo</td>
	            <td><img src="${data.crestUrl}" onerror="this.src='img/logo-default.png'" alt="logo" width="50" height="50"/></td>
	          </tr>
	          <tr>
	            <td>Contact</td>
	            <td>${(data.phone === null) ? '' : data.phone} , ${(data.email === null) ? '' : data.email} , ${(data.website === null) ? '' : data.website} </td>
	          </tr>
	          <tr>
	            <td>Address</td>
	            <td>${(data.address === null) ? '' : data.address}</td>
	          </tr>
	          <tr>
	            <td>Founded</td>
	            <td>${(data.founded === null) ? '' : data.founded}</td>
	          </tr>
	          <tr>
	            <td>Venue </td>
	            <td>${(data.venue === null) ? '' : data.venue}</td>
	          </tr>
		        </tbody>
		      </table>
				<br />
		      <h5>Squad</h5>
		        ` 
		        let squad =""
		        data.squad.forEach(data => {
		        let color;
		        if(data.position === 'Goalkeeper') {
		            color = "yellow darken-3"
		        }

		        else if(data.position === 'Defender') {
		             color = "blue"
		        }

		        else if(data.position === 'Midfielder') {
		             color = "lime darken-1"
		        }

		        else if(data.position === 'Attacker') {
		             color = "red darken-1"
		        }

		        else{ 
		             color = "grey lighten-1"
		        }

		            squad += ` 

		            <div class="card ${color}">
		                <div class="card-content white-text">
		                <span class="card-title">${data.name}</span>
		                <p>
		                    ${(data.position === null) ? data.role : data.position}
		                </p>
		                </div>
		            </div>`
		        })

		        teamInfo += squad
		        document.getElementById("detailTeam").innerHTML = teamInfo
		}	
			})
		})
		} 


function getSavedTeams() {
  getAll().then(function(teams) {

    var teamHTML = "";
    teams.forEach(function(team) {
      teamHTML += `
		      <div class="row">
	            <div class="col s12 m12">
	            <a onclick="getSavedById(${team.id})">
	            <div class="card-panel deep-purple" style="overflow:hidden;text-align:center">
	                <img src="${team.crestUrl}" onerror="this.src='img/logo-default.png'"  width="50" height="50" alt="team logo" style="float:left">
	                <div class="card-content white-text">
	                    <h6>
	                        ${team.name}
	                    </h6>
	                </div>
	            </div>
	            </a>
	            </div>
	        </div> 

                `;


    });

    document.getElementById("main").innerHTML = teamHTML;
  });
}


export {getStandings,getSavedTeams,getSavedById}
