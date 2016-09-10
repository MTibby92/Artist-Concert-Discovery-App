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

function artistGetInfo() {
    var searchInput = $('#searchInput').val().trim()
    // $('#searchInput').val('')
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
        console.log('Get Info response: ')
        console.log(response)
        console.log('The artist name is:  ' + response.artist.name) // Artist name
        console.log('Here is the image link: ' + response.artist.image[4]["#text"]) // Artist mega image (biggest size) index 3 is smaller

        results = response.artist
    })
}

function artistGetTopTracks() {
    var searchInput = $('#searchInput').val().trim()
    // $('#searchInput').val('')
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
        console.log('Top Tracks response: ')
        console.log(response)
    })
}

function artistGetTopAlbums() {
    var searchInput = $('#searchInput').val().trim()
    // $('#searchInput').val('')
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
        console.log('Top Albums response: ')
        console.log(response)
    })
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
    	$('#searchInput').val('')
    })
})