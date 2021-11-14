// creo l'oggetto per la chiamata
var arrayUtenti = new Array;
var xHttp = new XMLHttpRequest();
// gestisco la callback di risposta (ovvero una funzione che viene eseguita quando il server risponde)
xHttp.onreadystatechange = function () {
    if (this.readyState === 4 ){
        if (this.status === 200 ) {            
            var json = JSON.parse(this.responseText);            
            json.forEach(element => {
                let geo = new Geo (element.address.geo.lat, element.address.geo.lng);
                let address = new Address(element.address.street,element.address.suite,element.address.city,element.address.zipcode,geo);                
                let company = new Company(element.company.name, element.company.catchPhrase, element.company.bs);                
                var user = new Utente (element.id, element.name, element.username, element.email, address,element.phone,element.website,company);
                arrayUtenti.push(user);                
            });            
        }else{
            console.log("Error", "https://jsonplaceholder.typicode.com/users", this .status , this.responseText);
        }
    }
};
xHttp.open("GET", "https://jsonplaceholder.typicode.com/users", false);
xHttp.send();


//creo una lista con in nomi degli utenti del social sull'aside
var injectName;
for (var i = 0; i < arrayUtenti.length; i++) {
    var injectName = "# " + encryption(arrayUtenti[i].name);
    var li = document.createElement('li');
    li.innerHTML = "<p>" + injectName + "</p><button onclick='showUserPosts("+arrayUtenti[i].id+")'>Posts</button>"+
    "<button onclick='showAlbums(" + arrayUtenti[i].id + ")'>Album</button>" +
    "<button onclick='showPics(" + arrayUtenti[i].id + ")'>Foto</button> ";  
    document.getElementById('user-list').appendChild(li);
}

let postDiv = document.getElementById("post-div");
// mostra i posts nella section main content
function showUserPosts(id){
    albumDiv.classList.add("hide");
    picsDiv.classList.add("hide");
    postDiv.classList.remove("hide");        
    let currentPosts;
    currentPosts = getPostsListById(id);    
    let injectUserId = document.getElementById("inject-post");
    var stringa ="";
    for (let i=0; i<currentPosts.length; i++){
        stringa+= "<div class='post-box'>";        
        stringa += "<h3>" + currentPosts[i].title + "</h3>";
        stringa += "<p>" + currentPosts[i].body + "</p>";
        stringa += "<button onclick='showComments("+currentPosts[i].id+")'>Commenti</button>";
        stringa += "</div>";
        // stringa += "<button onclick='showAlbums("+currentPosts[i].id+")'>Mostra Album</button>";
        stringa += "<div id='comments-show-"+ currentPosts[i].id+"'></div>";
        stringa += "<div id='album-show-"+ currentPosts[i].id+"'></div>";
    }       
    injectUserId.innerHTML = stringa;
}
// funzione che accetta il postId e restiusce un array di commenti 
function getCommentsByPostId(id) {
    var arrayComments = new Array;
    var xHttp = new XMLHttpRequest();
    // gestisco la callback di risposta (ovvero una funzione che viene eseguita quando il server risponde)
    xHttp.onreadystatechange = function () {
        if (this.readyState === 4 ){
            if (this.status === 200 ) {            
                let json = JSON.parse(this.responseText);                
                json.forEach(element => {                                       
                    var comments = new Comment(element.postId,element.id, element.name, element.email, element.body);                   
                    arrayComments.push(comments);                
                });            
            }else{
                console.log("Error", "https://jsonplaceholder.typicode.com/comments?postId="+id, this .status , this.responseText);
            }
        }
    };
    xHttp.open("GET", "https://jsonplaceholder.typicode.com/comments?postId="+id, false);
    xHttp.send();
    return arrayComments;    
}

//funzione che accetta il postId e visualizza i commenti
function showComments(postId){
    let arrayShowComments = new Array;
    arrayShowComments= getCommentsByPostId(postId);
    let stringa = "";    
    for (let i=0; i<arrayShowComments.length;i++){
        stringa += "<p class='comment-name'><i class='far fa-user'></i> " + arrayShowComments[i].name + "</p>";
        stringa += "<p class='comment-email'><i class='far fa-envelope'></i> " + arrayShowComments[i].email + "</p>";
        stringa += "<p class='comment-body'><i class='fas fa-comments'></i> " + arrayShowComments[i].body + "</p>";               
        let divString = "comments-show-" + arrayShowComments[i].postId;
        let innerDiv = document.getElementById(divString);
        innerDiv.innerHTML = stringa; 
    }    
}

let albumDiv = document.getElementById("album-div"); 
function showAlbums(id){
    postDiv.classList.add("hide");
    picsDiv.classList.add("hide");
    albumDiv.classList.remove("hide");     
    let arrayShowAlbums = new Array;
    arrayShowAlbums = getAlbumById(id);    
    let stringa = "";    
    for (let i=0; i<arrayShowAlbums.length;i++){
        stringa += "<p>" + arrayShowAlbums[i].title + "</p>";                        
    } 
    let innerDiv = document.getElementById("inject-album");
    innerDiv.innerHTML = stringa;   
}


let picsDiv = document.getElementById("pics-div");

function showPics(id){
    postDiv.classList.add("hide");
    albumDiv.classList.add("hide");
    picsDiv.classList.remove("hide");
    let arrayShowPics = new Array;
    arrayShowPics = getPicsById(id);
    let stringa = "";        
    for (let i=0; i<arrayShowPics.length;i++){
        // stringa += "<h3>Titolo: " + arrayShowPics[i].title + "</h3>";
        let onclickString = "onclick = showOverlayPics('"+arrayShowPics[i].url+"')";        
        stringa +="<img src=\""+arrayShowPics[i].thumbnailUrl+"\"" + onclickString + "></img>"              
    }
    let innerDiv = document.getElementById("inject-pics"); 
    innerDiv.innerHTML = stringa;   
}
function showOverlayPics(url){
    let overlayLayer = document.getElementById("overlay-pics");    
    overlayLayer.classList.remove("hide");
    let overlayDiv = document.getElementById("overlay-img");
    overlayDiv.innerHTML = "<img src=\""+url+"\""+" onclick='closeOverlay()'></img>"
    return url
}