/**
 * Created by tomasnagy on 01/12/14.
 */
(function() {
    'use strict';
    var HistoryItemController = function($scope, $http, $timeout) {
        $scope.items = [];

        $scope.layoutDone = function() {
            $timeout(function() {
                startAnimations($scope.items);
                guitarPlayerController();
            }, 0);
        };

        var onDataDownloaded = function(res) {
                // save data to localstorage for offline use
                localStorage.setItem('guitarHistoryData', JSON.stringify(res));

                angular.forEach(res.data, function(value) {
                    var item = new GuitarHistoryItem(value.title, value.date, value.description, value.image, value.interactiveGuitarName);
                    $scope.items.push(item);
                });
            },
            onError = function(err) {
                // get data from local storage
                var res = JSON.parse(localStorage.getItem('guitarHistoryData'));

                // use localstorage data if it exists
                if( res !== undefined || res !== null) {
                    angular.forEach(res.data, function (value) {
                        var item = new GuitarHistoryItem(value.title, value.date, value.description, value.image, value.interactiveGuitarName);
                        $scope.items.push(item);
                    });
                }
            };

        $http.get('http://' + window.location.hostname + ':3000/api/allData').then(onDataDownloaded, onError);


    };
    var app = angular.module('app');
    app.controller('HistoryItemController', ['$scope', '$http', '$timeout',  HistoryItemController]);
})();