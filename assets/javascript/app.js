// LastFM API key
var apiKey = '26a76686375358b55dd7488f7bf1256d'
var sharedSecret = 'd1727a270c67dc265f0b9d9b4910ffc9'
// registered to MTibby92
// app name is "Bootcamp Artist & Concert Recommendation App"

// Song Kick API key
// applied 9/8, can take up to 7 days to get a key


// WORKING EXAMPLE LASTFM API CALL
// http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Linkin+Park&api_key=26a76686375358b55dd7488f7bf1256d&format=json

var queryString = 'http://ws.audioscrobbler.com/2.0'

var info = undefined
var albums = undefined
var tracks = undefined


function artistGetInfo() {
    var searchInput = $('#searchInput').val().trim()
    var searchData = {
        method: "artist.getinfo",
        artist: searchInput,
        autocorrect: 1,
        api_key: apiKey,
        format: "json"
    };
    var results

    $.ajax({url: queryString, method: 'GET', data: searchData})
    .done(function(response) {
        info = response
        displayArtistInfo(info)
    })
}

function artistGetTopTracks() {
    var searchInput = $('#searchInput').val().trim()
    var searchData = {
        method: "artist.getTopTracks",
        artist: searchInput,
        autocorrect: 1,
        limit: 5,
        api_key: apiKey,
        format: "json"
    };
    var results

    $.ajax({url: queryString, method: 'GET', data: searchData})
    .done(function(response) {
        tracks = response
        displayTopTracks(tracks)
    })
}

function artistGetTopAlbums() {
    var searchInput = $('#searchInput').val().trim()
    var searchData = {
        method: "artist.getTopAlbums",
        artist: searchInput,
        autocorrect: 1,
        limit: 3,
        api_key: apiKey,
        format: "json"
    };
    var results

    $.ajax({url: queryString, method: 'GET', data: searchData})
    .done(function(response) {
        albums = response
        displayTopAlbums(albums)
    })
}

function artistGetSimilar() {
    var searchInput = $('#searchInput').val().trim()
    var searchData = {
        method: "artist.getSimilar",
        artist: searchInput,
        autocorrect: 1,
        limit: 3,
        api_key: apiKey,
        format: "json"
    };
    var results

    $.ajax({url: queryString, method: 'GET', data: searchData})
    .done(function(response) {
        similar = response
        // console.log(similar)
        displaySimilar(similar)
    })
}

function displayArtistInfo(data) {
    var artist = {
        name: data.artist.name,
        description: data.artist.bio.summary,
        image: data.artist.image[4]["#text"], //mega image size
    }
    console.log(artist)
}

function displayTopAlbums(data) {
    var album1 = {
        title: data.topalbums.album["0"].name, 
        cover: data.topalbums.album["0"].image[3]["#text"]
    }
    var album2 = {
        title: data.topalbums.album["1"].name, 
        cover: data.topalbums.album["1"].image[3]["#text"]
    }
    var album3 = {
        title: data.topalbums.album["2"].name, 
        cover: data.topalbums.album["2"].image[3]["#text"]
    }
    console.log(album1)
    console.log(album2)
    console.log(album3)
}

function displayTopTracks(data) {
    var track1 = {
        title: data.toptracks.track["0"].name,
        link: data.toptracks.track["0"].url
    }
    var track2 = {
        title: data.toptracks.track["1"].name,
        link: data.toptracks.track["1"].url
    }
    var track3 = {
        title: data.toptracks.track["2"].name,
        link: data.toptracks.track["2"].url
    }
    var track4 = {
        title: data.toptracks.track["3"].name,
        link: data.toptracks.track["3"].url
    }
    var track5 = {
        title: data.toptracks.track["4"].name,
        link: data.toptracks.track["4"].url
    }
    console.log(track1)
    console.log(track2)
    console.log(track3)
    console.log(track4)
    console.log(track5)
}

function displaySimilar(data) {
    var similar1 = {
        name: data.similarartists.artist["0"].name,
        image: data.similarartists.artist["0"].image[4]["#text"],
    }
    var similar2 = {
        name: data.similarartists.artist["1"].name,
        image: data.similarartists.artist["1"].image[4]["#text"],
    }
    var similar3 = {
        name: data.similarartists.artist["2"].name,
        image: data.similarartists.artist["2"].image[4]["#text"],
    }
    console.log(similar1)
    console.log(similar2)
    console.log(similar3)
}


$( document ).ready(function() {
    $('#searchInput').keypress(function (e) {
        var key = e.which;
        if(key == 13) {
            $('#search').trigger('click');
        }
    });   

    $('#search').on('click', function(event) {
    	artistGetInfo()
    	artistGetTopTracks()
    	artistGetTopAlbums()
        artistGetSimilar()
    	$('#searchInput').val('')
    })
})