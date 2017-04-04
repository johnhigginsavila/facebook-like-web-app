(function(window, angular, undefined){
    angular.module('app')
        .controller('homeCtrl',['$scope','$log','$mdDialog','$http','$state',function($scope,$log,$mdDialog,$http,$state){
            $scope.pageData = {
                name : 'Home'
            }
            
            
            $log.debug('homeCtrl is online');
            
            //===========
            //login
            //===========
            $scope.login = function(form, user){
                if(form.$valid){
                    $log.debug(user.loginName +", "+user.password);
                    $http.post('/api/user/login', user).then(function(response){
                        userSvc.token = response.data.token;
                        userSvc.user = response.data.userData;
                        localStorage.setItem('token', JSON.stringify(userSvc.token));
                        localStorage.setItem('user', JSON.stringify(userSvc.user));
                        $state.go('main');
                        
                    }, function(err){
                        $log.debug(err);
                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Login Error')
                                .textContent(err.data)
                                .ariaLabel('Login Error')
                                .ok('Got it!')
                        );
                    })
                }else{
                    $mdDialog.show(
                      $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Invalid Credentials')
                        .textContent('Please fill-up required fields')
                        .ariaLabel('Facebook-dummy')
                        .ok('okay')
                    );
                }
            }
            
            //==============
            //For newUser
            //==============
            
            $scope.signUp = function(signUpForm,newUser){
                
                if(signUpForm.$valid){
                    //$log.debug(newUser);
                    if(newUser.birthdayMonth == 2){
                        if(newUser.birthdayDay > 29){
                            $log.error('more than 29');
                        }else{
                            $log.debug('day is '+newUser.birthdayDay);
                            if(newUser.password === newUser.confirmedPassword){
                                $log.debug('Everything is alright');
                                $log.debug(newUser);

                            }else{
                                $log.error('password did not match');
                            }
                        }
                    }else if((newUser.birthdayMonth == 4) || (newUser.birthdayMonth == 6) || (newUser.birthdayMonth == 9) || (newUser.birthdayMonth == 11)){
                        if(newUser.birthdayDay > 30){
                            $log.error('more than 30');
                        }else{
                            $log.debug('day is '+newUser.birthdayDay);
                            if(newUser.password === newUser.confirmedPassword){
                                $log.debug('Everything is alright');
                                $log.debug(newUser);

                            }else{
                                $log.error('password did not match');
                            }
                        }
                    }else{
                        if(newUser.password === newUser.confirmedPassword){
                            $log.debug('Everything is alright');
                            $log.debug(newUser);
                            
                        }else{
                            $log.error('password did not match');
                        }
                    }
                    
                    
                    
                }else{
                    $log.debug('ERROR');
                    $mdDialog.show(
                      $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Invalid Credentials')
                        .textContent('Please fill-up required fields')
                        .ariaLabel('Facebook-dummy')
                        .ok('okay')
                    );
                }
            }
            
        }])
})(window, window.angular)