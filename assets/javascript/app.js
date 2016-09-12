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
    var input = $('#searchInput').val().trim()
    var searchData = {
        method: "artist.getinfo",
        artist: input,
        autocorrect: 1,
        api_key: apiKey,
        format: "json"
    };

    $.ajax({url: queryString, method: 'GET', data: searchData})
    .done(function(response) {
        info = response
        displayArtistInfo(info)
        artistGetTopAlbums(input)
    })
}

function artistGetTopAlbums(input) {
    // var searchInput = $('#searchInput').val().trim()
    var searchData = {
        method: "artist.getTopAlbums",
        artist: input,
        autocorrect: 1,
        limit: 3,
        api_key: apiKey,
        format: "json"
    };

    $.ajax({url: queryString, method: 'GET', data: searchData})
    .done(function(response) {
        albums = response
        displayTopAlbums(albums)
        artistGetTopTracks(input)
    })
}

function artistGetTopTracks(input) {
    // var searchInput = $('#searchInput').val().trim()
    var searchData = {
        method: "artist.getTopTracks",
        artist: input,
        autocorrect: 1,
        limit: 5,
        api_key: apiKey,
        format: "json"
    };

    $.ajax({url: queryString, method: 'GET', data: searchData})
    .done(function(response) {
        tracks = response
        displayTopTracks(tracks)
        artistGetSimilar(input)
    })
}

function artistGetSimilar(input) {
    // var searchInput = $('#searchInput').val().trim()
    var searchData = {
        method: "artist.getSimilar",
        artist: input,
        autocorrect: 1,
        limit: 3,
        api_key: apiKey,
        format: "json"
    };

    $.ajax({url: queryString, method: 'GET', data: searchData})
    .done(function(response) {
        similar = response
        displaySimilar(similar)
    })
}

function displayArtistInfo(data) {
    var artist = {
        name: data.artist.name,
        description: data.artist.bio.summary,
        image: data.artist.image[3]["#text"], // image size
    }
    console.log(artist)
    var html = $('<div class="col s4">' +
        '<p>' + artist.name + '<p>' + 
        '<img class="image-responsive" src="' + artist.image + '">' +
        '<p>' + artist.description + '</p>' +
        '</div>')
    $('#mainArtistRow').append(html)
}

function displayTopAlbums(data) {
    var album1 = {
        title: data.topalbums.album["0"].name, 
        cover: data.topalbums.album["0"].image[2]["#text"]
    }
    var album2 = {
        title: data.topalbums.album["1"].name, 
        cover: data.topalbums.album["1"].image[2]["#text"]
    }
    var album3 = {
        title: data.topalbums.album["2"].name, 
        cover: data.topalbums.album["2"].image[2]["#text"]
    }
    // console.log(album1)
    // console.log(album2)
    // console.log(album3)
    var html = $('<div class="col s4">' +
        '<div>' +
        '<p>' + album1.title + '<p>' +
        '<img class="image-responsive" src="' + album1.cover + '">' +
        '</div>' +
        '<div>' +
        '<p>' + album2.title + '</p>' +
        '<img class="image-responsive" src="' + album2.cover + '">' +
        '</div>' +
        '<div>' +
        '<p>' + album3.title + '</p>' +
        '<img class="image-responsive" src="' + album3.cover + '">' +
        '</div>' +
        '<div>')
    $('#mainArtistRow').append(html)
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
    // console.log(track1)
    // console.log(track2)
    // console.log(track3)
    // console.log(track4)
    // console.log(track5)
    var html = $('<div class="col s4" id="artistSongs">' + 
        '<div class="collection">' + 
            '<a href="' + track1.link + '" class="collection-item">' +
                '<i class="material-icons">play_circle_filled</i>' + track1.title + '</a>' +
            '<a href="' + track2.link + '" class="collection-item">' +
                '<i class="material-icons">play_circle_filled</i>' + track2.title + '</a>' +
            '<a href="' + track3.link + '" class="collection-item">' +
                '<i class="material-icons">play_circle_filled</i>' + track3.title + '</a>' +
            '<a href="' + track4.link + '" class="collection-item">' +
                '<i class="material-icons">play_circle_filled</i>' + track4.title + '</a>' +
            '<a href="' + track5.link + '" class="collection-item">' +
                '<i class="material-icons">play_circle_filled</i>' + track5.title + '</a>' +
        '</div>' +
        '</div>')
    $('#mainArtistRow').append(html)
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
    // console.log(similar1)
    // console.log(similar2)
    // console.log(similar3)
    var html1 = $('<div class = "row">' +
        '<div class="col s12">' +
        '<p>' + similar1.name + '</p>' +
        '<img class="image-responsive" src="' + similar1.image + '">' +
        '</div>' +
        '</div>')
    var html2 = $('<div class = "row">' +
        '<div class="col s12">' +
        '<p>' + similar2.name + '</p>' +
        '<img class="image-responsive" src="' + similar2.image + '">' +
        '</div>' +
        '</div>')
    var html3 = $('<div class = "row">' +
        '<div class="col s12">' +
        '<p>' + similar3.name + '</p>' +
        '<img class="image-responsive" src="' + similar3.image + '">' +
        '</div>' +
        '</div>')
    $('#similarArtist1').append(html1)
    $('#similarArtist2').append(html2)
    $('#similarArtist3').append(html3)
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
    	$('#searchInput').val('')
    })
})