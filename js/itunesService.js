var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here
    this.getInfo = function(artistName) {
        
        var deferred = $q.defer();
        
        var arrData = [];
        
        /*$http({
            method: 'GET',
            url: 'https://itunes.apple.com/search?term=' + artistName + '&callback=JSON_CALLBACK'
        }).then(function(response) {
            console.log(response);
            deferred.resolve(arrData.push(response.data.results));
        };*/
        
        $http.jsonp('https://itunes.apple.com/search?term=' + artistName + '&callback=JSON_CALLBACK')
        .success(function(response) {
            //console.log(response);
            
            var Result = function(Artist, Collection, AlbumArt, Type, CollectionPrice, Preview, SongName) {
                this.Artist = Artist;
                this.Collection = Collection;
                this.AlbumArt = AlbumArt;
                this.Type = Type;
                this.CollectionPrice = CollectionPrice;
                this.Preview = Preview;
                this.SongName = SongName;
            }
            
            var dataRes = response.data.results;
            
            for(var i = 0; i < dataRes.length; i++) {
                var result = new Result(dataRes[i].artistName, dataRes[i].collectionName, data[i].artworkUrl100, data[i].kind, data[i].collectionPrice,
                                       data[i].previewURL, data[i].trackName);
                arrData.push(result);
            }
            deferred.resolve(arrData);
        }).error(function(response){
            deferred.reject();
        })
        return deferred.promise;
    };
});
