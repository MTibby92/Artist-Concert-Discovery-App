// LastFM API key
var apiKey = '26a76686375358b55dd7488f7bf1256d'
var sharedSecret = 'd1727a270c67dc265f0b9d9b4910ffc9'
// registered to MTibby92
// app name is "Bootcamp Artist & Concert Recommendation App"

// Got a Seat Geek Account (use instead of Song Kick) see: http://platform.seatgeek.com/
// Client ID:  NTY3ODAyM3wxNDczNzE5MjM2
// Secret: DG24aEL_jP5x1lXmJeRPbDVb03Ocuy4IFWjrC-xY
// query string: https://api.seatgeek.com/2

var queryString = 'http://ws.audioscrobbler.com/2.0'

var info = undefined
var albums = undefined
var tracks = undefined


function artistGetInfo(input) {
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
        artistGetTopTracks(input)
    })
}

// function artistGetTopAlbums(input) {
//     // var searchInput = $('#searchInput').val().trim()
//     var searchData = {
//         method: "artist.getTopAlbums",
//         artist: input,
//         autocorrect: 1,
//         limit: 3,
//         api_key: apiKey,
//         format: "json"
//     };

//     $.ajax({url: queryString, method: 'GET', data: searchData})
//     .done(function(response) {
//         albums = response
//         displayTopAlbums(albums)
//         artistGetTopTracks(input)
//     })
// }

function artistGetTopTracks(input) {
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
        getConcert(input)
    })
}

function getConcert(input) {
    var arr = input.split(' ')
    var modifiedInput = ''

        for (var i in arr) {
            var string = arr[i] + '-'
            modifiedInput = modifiedInput.concat(string)
        }

    var newInput = modifiedInput.slice(0,-1)
    newInput = newInput.toLowerCase()

    var query = 'https://api.seatgeek.com/2/events'
    var data = {
        "performers.slug": newInput, //NEED TO USE - instead of + for spaces; still having trouble running back to back calls
        client_id: 'NTY3ODAyM3wxNDczNzE5MjM2'
    }

    // NEED TO ACCOUNT FOR NO CONCERTS, RETURNS ONLY META DATA; ALSO NEED TO ACCOUNT FOR LESS THAN 5 CONCERTS BEING RETURNED
    $.ajax({url: query, method: 'GET', data: data})
    .done(function(response) {
        var concerts = response
        // console.log(concerts)
        displayConcertInfo(concerts)
    })
    .fail(function(response, text, error) {
        var html = $('<div>' +
            '<p>Error Text: ' + text + '</p>' +
            '<p>Error Message: ' + error + '</p>' +
            '</div>')
        $('#concert1').append(html)
        $('#concert2').append(html)
        $('#concert3').append(html)
        $('#concert4').append(html)
        $('#concert5').append(html)
        console.log(error)
    })
}

function displayArtistInfo(data) {
    var artist = {
        name: data.artist.name,
        description: data.artist.bio.summary,
        image: data.artist.image[3]["#text"], // image size
    }
    // console.log(artist)
    var html = $('<div class="col s12">' +
        '<h2 id="artistName">' + artist.name + '</h2>' + 
        '<img class="image-responsive" src="' + artist.image + '">' +
        '</div>')
    $('#mainArtistRow').append(html)
    $('#bioArea').html(artist.description)
}

// function displayTopAlbums(data) {
//     var album1 = {
//         title: data.topalbums.album["0"].name, 
//         cover: data.topalbums.album["0"].image[2]["#text"]
//     }
//     var album2 = {
//         title: data.topalbums.album["1"].name, 
//         cover: data.topalbums.album["1"].image[2]["#text"]
//     }
//     var album3 = {
//         title: data.topalbums.album["2"].name, 
//         cover: data.topalbums.album["2"].image[2]["#text"]
//     }
//     // console.log(album1)
//     // console.log(album2)
//     // console.log(album3)
//     var html = $('<div class="col s4">' +
//         '<div>' +
//         '<p>' + album1.title + '<p>' +
//         '<img class="image-responsive" src="' + album1.cover + '">' +
//         '</div>' +
//         '<div>' +
//         '<p>' + album2.title + '</p>' +
//         '<img class="image-responsive" src="' + album2.cover + '">' +
//         '</div>' +
//         '<div>' +
//         '<p>' + album3.title + '</p>' +
//         '<img class="image-responsive" src="' + album3.cover + '">' +
//         '</div>' +
//         '<div>')
//     $('#mainArtistRow').append(html)
// }

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

    var html = $('<ul class="collapsible" data-collapsible="accordion">' +
        '<li>' +
            '<div class="collapsible-header hoverable"><i class="material-icons">play_circle_filled</i><span>' + track1.title + '</span></div>' +
            '<div class="collapsible-body"><a href="' + track1.link + '" class="collection-item" target="_blank">Link to LastFM</a></div>' +
        '</li>' +
        '<li>' +
            '<div class="collapsible-header hoverable"><i class="material-icons">play_circle_filled</i><span>' + track2.title + '</span></div>' +
            '<div class="collapsible-body"><a href="' + track2.link + '" class="collection-item" target="_blank">Link to LastFM</a></div>' +
        '</li>' +
        '<li>' +
            '<div class="collapsible-header hoverable"><i class="material-icons">play_circle_filled</i><span>' + track3.title + '</span></div>' +
            '<div class="collapsible-body"><a href="' + track3.link + '" class="collection-item" target="_blank">Link to LastFM</a></div>' +
        '</li>' +
        '<li>' +
            '<div class="collapsible-header hoverable"><i class="material-icons">play_circle_filled</i><span>' + track4.title + '</span></div>' +
            '<div class="collapsible-body"><a href="' + track4.link + '" class="collection-item" target="_blank">Link to LastFM</a></div>' +
        '</li>' +
        '<li>' +
            '<div class="collapsible-header hoverable"><i class="material-icons">play_circle_filled</i><span>' + track5.title + '</span></div>' +
            '<div class="collapsible-body"><a href="' + track5.link + '" class="collection-item" target="_blank">Link to LastFM</a></div>' +
        '</li>' +
        '</ul>')
    $('#artistSongs').append(html)

    // necessary to make the added elements clickable
    $(document).ready(function(){
        $('.collapsible').collapsible({
        accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        })
    })
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

    var html1 = $('<div class = "row">' +
        '<div class="col s12">' +
        '<p>' + similar1.name + '</p>' +
        '<img class="image-responsive" src="' + similar1.image + '" alt="' + similar1.name + '">' +
        '</div>' +
        '</div>')
    var html2 = $('<div class = "row">' +
        '<div class="col s12">' +
        '<p>' + similar2.name + '</p>' +
        '<img class="image-responsive" src="' + similar2.image + '" alt="' + similar2.name + '">' +
        '</div>' +
        '</div>')
    var html3 = $('<div class = "row">' +
        '<div class="col s12">' +
        '<p>' + similar3.name + '</p>' +
        '<img class="image-responsive" src="' + similar3.image + '" alt="' + similar3.name + '">' +
        '</div>' +
        '</div>')
    $('#similarArtist1').append(html1)
    $('#similarArtist2').append(html2)
    $('#similarArtist3').append(html3)
}

function displayConcertInfo(data) {
    // Condition: Artist has no concerts according to Seat Geek
    if (data.events.length == 0) {
        $('#concert1').append($('<div>' +
            '<p>This band is not currently touring, according to our API.</p>' +
            '</div>'))
        $('#concert2').append($('<div>' +
            '<p>This band is not currently touring, according to our API.</p>' +
            '</div>'))
        $('#concert3').append($('<div>' +
            '<p>This band is not currently touring, according to our API.</p>' +
            '</div>'))
        $('#concert4').append($('<div>' +
            '<p>This band is not currently touring, according to our API.</p>' +
            '</div>'))
        $('#concert5').append($('<div>' +
            '<p>This band is not currently touring, according to our API.</p>' +
            '</div>'))
    // Condition: Artist has less than 5 but more than 0 concerts, according to Seat Geek
    }else if (data.events.length > 0 && data.events.length < 5){
        var num = data.events.length
        var counter = 1
        for (var i=0; i < num; i++) {
            var concert = {
                title: data.events[i].title,
                localDate: data.events[i].datetime_local,
                venue: data.events[i].venue.name,
                location: data.events[i].venue.display_location,
                url: data.events[i].url
            }
            var html = $('<div>' +
                '<p>Title: ' + concert.title + '</p>' +
                '<p>Date & Time: ' + concert.localDate + '</p>' +
                '<p>Venue: ' + concert.venue + '</p>' +
                '<p>Location: ' + concert.location + '</p>' +
                '<a href="' + concert.url + '" target="_blank">Seat Geek: Buy Now</a>' +
                '</div>')
            $('#concert' + counter).append(html)
            counter++
        }
        while (counter < 6) {
            $('#concert' + counter).append('<div>' +
                '<p>There are no other scheduled concerts for this artist.</p>' +
                '</div>')
            counter++
        }
    // Condition: Artist has 5 concerts (or more), according to Seat Geek
    } else {
        var concert1 = {
            title: data.events["0"].title,
            localDate: data.events["0"].datetime_local,
            venue: data.events["0"].venue.name,
            location: data.events["0"].venue.display_location,
            url: data.events["0"].url
        }
        var concert2 = {
            title: data.events["1"].title,
            localDate: data.events["1"].datetime_local,
            venue: data.events["1"].venue.name,
            location: data.events["1"].venue.display_location,
            url: data.events["1"].url
        }
        var concert3 = {
            title: data.events["2"].title,
            localDate: data.events["2"].datetime_local,
            venue: data.events["2"].venue.name,
            location: data.events["2"].venue.display_location,
            url: data.events["2"].url
        }
        var concert4 = {
            title: data.events["3"].title,
            localDate: data.events["3"].datetime_local,
            venue: data.events["3"].venue.name,
            location: data.events["3"].venue.display_location,
            url: data.events["3"].url
        }
        var concert5 = {
            title: data.events["4"].title,
            localDate: data.events["4"].datetime_local,
            venue: data.events["4"].venue.name,
            location: data.events["4"].venue.display_location,
            url: data.events["4"].url
        }

        var list = [concert1, concert2, concert3, concert4, concert5]

        var counter = 1
        for (var i in list) {
            var html = $('<div>' +
                '<p>Title: ' + list[i].title + '</p>' +
                '<p>Date & Time: ' + list[i].localDate + '</p>' +
                '<p>Venue: ' + list[i].venue + '</p>' +
                '<p>Location: ' + list[i].location + '</p>' +
                '<a href="' + list[i].url + '" target="_blank">Seat Geek: Buy Now</a>' +
                '</div>')
            $('#concert' + counter).append(html)
            counter++
        }
    }
}

function reset() {
    $('#mainArtistRow').empty()

    $('#artistSongs').empty()

    $('#concert1').empty()
    $('#concert2').empty()
    $('#concert3').empty()
    $('#concert4').empty()
    $('#concert5').empty()

    $('#similarArtist1').empty()
    $('#similarArtist2').empty()
    $('#similarArtist3').empty()
}


$( document ).ready(function() {
    $('.jumbotron').hide()
    $('#similar').hide()
    $('#history').hide()

    $('#searchInput').keypress(function (e) {
        var key = e.which;
        if(key == 13) {
            $('#search').trigger('click');
        }
    });   

    $('#search').on('click', function(event) {
        reset()
        var input = $('#searchInput').val().trim()
        var date = new Date()
        date = date.toString()
        if (firebase.auth().currentUser) {
            firebase.database().ref('history/' + firebase.auth().currentUser.uid).push({
                name: firebase.auth().currentUser.displayName,
                email: firebase.auth().currentUser.email,
                date: date,
                search: input
            })
        }
        $('.jumbotron').show()
        $('#similar').show()
    	artistGetInfo(input)
    	$('#searchInput').val('')
    })

    // Known issue: if the picture isn't clicked on, doesn't pass data in; must click image
    $('.similarArtist').on('click', function(event) {
        reset()
        var input = $(event.target).find('img').context.alt
        var date = new Date()
        date = date.toString()
        if (firebase.auth().currentUser) {
            firebase.database().ref('history/' + firebase.auth().currentUser.uid).push({
                name: firebase.auth().currentUser.displayName,
                email: firebase.auth().currentUser.email,
                date: date,
                search: input
            })
        }
        artistGetInfo(input)
    })

    $('.collapsible').collapsible({
        accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    })
})