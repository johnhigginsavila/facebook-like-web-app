(function(window, angular, undefined){
    angular.module('app')
        .controller('homeCtrl',['$scope','$log',function($scope,$log){
            $scope.pageData = {
                name : 'Home'
            }
            
            var user = {
                loginName : $scope.loginName,
                password : $scope.password
            }
            
            $scope.login = function(loginForm, loginName, password){
                
                    $log.debug(loginName, password);
                
                
            }
            
            $log.debug('homeCtrl is online');
        }])
})(window, window.angular)