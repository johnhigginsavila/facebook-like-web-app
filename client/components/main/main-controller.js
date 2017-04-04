(function(window, angular, undefined){
    angular.module('app')
        .controller('mainCtrl',['$scope','$log',function($scope,$log){
            $log.debug('mainCtrl is online');
        }])
})(window, window.angular)