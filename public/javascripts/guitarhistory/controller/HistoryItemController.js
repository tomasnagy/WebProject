/**
 * Created by tomasnagy on 01/12/14.
 */
'use strict';
(function() {
    var HistoryItemController = function($scope, $http, $timeout) {
        $scope.items = [];

        $scope.layoutDone = function() {
            $timeout(function() {
                console.log('done');
                animateAllTheThings($scope.items);
            }, 0);
        }

        var onDataDownloaded = function(res) {
                angular.forEach(res.data, function(value, key) {
                    var item = new GuitarHistoryItem(value.title, value.date, value.description, value.image, value.interactiveGuitarName);
                    $scope.items.push(item);
                });
            },
            onError = function(err) {
                console.log(err);
            }

        $http.get('http://localhost:3000/api/allData').then(onDataDownloaded, onError);


    }
    var app = angular.module("app");
    app.controller("HistoryItemController", ["$scope", "$http", '$timeout',  HistoryItemController]);
})();