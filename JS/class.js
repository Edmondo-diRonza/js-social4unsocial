// Classi per Utenti
class Utente {
    constructor(id, name, username, email, address, phone, website, company){
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.website = website;
        this.company = company;
    }
}
class Address {
    constructor(street, suite, city, zipcode, geo){
        this.street = street;
        this.suite = suite;
        this.city = city;
        this.zipcode = zipcode;
        this.geo = geo;
    }
}
class Geo {
    constructor(lat,lng){
        this.lat = lat;
        this.lng = lng;
    }
}
class Company {
    constructor(name,catchPhrase,bs){
        this.name = name;
        this.catchPhrase=catchPhrase;
        this.bs = bs;
    }
}
// Classi per i Posts
class Post {
    constructor(userId, id, title, body) {
        this.userId = userId;
        this.id = id;
        this.title = title;
        this.body = body;
    }
}

//Classe per commenti post
class Comment {
    constructor(postId, id, name, email, body) {
        this.postId = postId;        
        this.id = id;
        this.name = name;
        this.email = email;
        this.body = body;
    }
}
// Classe album
class Album {
    constructor(userId, id, title) {
        this.userId = userId;
        this.id = id;
        this.title = title;
    }
}
//Classe Immagini
class Pics {
    constructor(albumId, id, title, url, thumbnailUrl) {
        this.albumId = albumId;
        this.id = id;
        this.title = title;
        this.url = url;
        this.thumbnailUrl = thumbnailUrl;
    }
}