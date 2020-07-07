import {getStandings,getSavedTeams} from './api.js'

var page = window.location.hash.substr(1)
if(page === "") page = "home";
loadPage(page)


function loadPage(page){
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var content = document.querySelector('#main')
            
            if(this.status == 200) {
                
                if (page === 'klassmen') {

                    getStandings()
                } 

                else if(page === 'saved') {
                    getSavedTeams();

                }


                content.innerHTML = this.responseText

            }
        } else{ 
            document.querySelector('#main').innerHTML = `<h1>Halaman Tidak Ditemukan</h1>`
        }
    }

    xhr.open('GET','/src/pages/' + page + ".html",true)
    xhr.send()
}

export {loadPage}