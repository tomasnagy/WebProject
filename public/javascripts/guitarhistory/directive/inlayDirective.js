/**
 * Created by tomasnagy on 19/12/14.
 */
(function() {
    'use strict';
    var app = angular.module('app');
    app.directive('inlay', function() {
       return {
           restrict: 'E',
           templateUrl: 'directives/inlay'
       };
    });
})();