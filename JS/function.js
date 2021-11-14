//Funzione che accetta una stringa in ingresso e restituisce la stringa criptata con cifrario di cesare
function encryption(text){
    const nome = Array.from(text);    
    let encryptedName = nome.map(function(x){
        let selectedLetter = x.charCodeAt();
        if (selectedLetter>= 120 && selectedLetter<=122 || selectedLetter>=88 && selectedLetter<=90){
            selectedLetter -= 26;        
        }else if (selectedLetter == 32){
            selectedLetter=29;
        }       
        return String.fromCharCode(selectedLetter+3);        
    });
    let encryptedString = encryptedName.join("");    
    return encryptedString;
}

//accetta un id ritorna un array di posts per quell'id
function getPostsListById(id){
    var arrayPosts = new Array;
    var xHttp = new XMLHttpRequest();
    // gestisco la callback di risposta (ovvero una funzione che viene eseguita quando il server risponde)
    xHttp.onreadystatechange = function () {
        if (this.readyState === 4 ){
            if (this.status === 200 ) {            
                let json = JSON.parse(this.responseText);                
                json.forEach(element => {                    
                    var post = new Post(element.userId,element.id,element.title,element.body);                   
                    arrayPosts.push(post);                
                });            
            }else{
                console.log("Error", "https://jsonplaceholder.typicode.com/posts?userId="+id, this .status , this.responseText);
            }
        }
    };
    xHttp.open("GET", "https://jsonplaceholder.typicode.com/posts?userId="+id, false);
    xHttp.send();
    return arrayPosts;
}

//funzione che accetta un id e restituisce array album
function getAlbumById(id) {
    var arrayAlbum = new Array;
    var xHttp = new XMLHttpRequest();
    // gestisco la callback di risposta (ovvero una funzione che viene eseguita quando il server risponde)
    xHttp.onreadystatechange = function () {
        if (this.readyState === 4 ){
            if (this.status === 200 ) {            
                let json = JSON.parse(this.responseText);                
                json.forEach(element => {                                        
                    var albums = new Album (element.userId, element.id, element.title);                   
                    arrayAlbum.push(albums);                
                });            
            }else{
                console.log("Error", "https://jsonplaceholder.typicode.com/albums?userId="+id, this .status , this.responseText);
            }
        }
    };
    xHttp.open("GET", "https://jsonplaceholder.typicode.com/albums?userId="+id, false);
    xHttp.send();
    return arrayAlbum;
}
//funzione che accetta un id e restituisce array di immagini
function getPicsById(id) {
    var arrayPics = new Array;
    var xHttp = new XMLHttpRequest();
    // gestisco la callback di risposta (ovvero una funzione che viene eseguita quando il server risponde)
    xHttp.onreadystatechange = function () {
        if (this.readyState === 4 ){
            if (this.status === 200 ) {            
                let json = JSON.parse(this.responseText);                
                json.forEach(element => {                                        
                    var pics = new Pics (element.albumId, element.id, element.title, element.url, element.thumbnailUrl);                   
                    arrayPics.push(pics);                
                });            
            }else{
                console.log("Error", "https://jsonplaceholder.typicode.com/photos?albumId="+id, this.status , this.responseText);
            }
        }
    };
    xHttp.open("GET", "https://jsonplaceholder.typicode.com/photos?albumId="+id, false);
    xHttp.send();
    return arrayPics;
}
function closeOverlay(){
    let overlayLayer = document.getElementById("overlay-pics");
    overlayLayer.classList.add("hide");
}