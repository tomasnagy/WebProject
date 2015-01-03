/**
 * Created by tomasnagy on 01/12/14.
 */
(function() {
    'use strict';
    var HistoryItemController = function($scope, $http, $timeout) {
        var isServerDown = false;
        $scope.items = [];

        $scope.layoutDone = function() {
            $timeout(function() {
                startAnimations($scope.items);
                guitarPlayerController(isServerDown);
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
                // server down or no internet connection
                isServerDown = true;

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

        $http.get(window.location.protocol + '//' + window.location.host + '/api/allData').then(onDataDownloaded, onError);


    };
    var app = angular.module('app');
    app.controller('HistoryItemController', ['$scope', '$http', '$timeout',  HistoryItemController]);
})();