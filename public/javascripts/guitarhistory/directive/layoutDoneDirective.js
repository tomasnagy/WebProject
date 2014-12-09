/**
 * Created by tomasnagy on 02/12/14.
 */
(function() {
    'use strict';
    var app = angular.module('app');
    app.directive('repeatDone', function() {
        return function(scope, elements, attrs) {
            if(scope.$last) {
                scope.$eval(attrs.repeatDone);
            }
        };
    });
})();