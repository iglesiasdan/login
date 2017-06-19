(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService','UserService', '$rootScope'];
    function LoginController($location, AuthenticationService, FlashService, UserService, $rootScope) {
        var vm = this;
        var service = {};
        service.username = vm.username;

        vm.register = register;
        function register() {
            vm.dataLoading = true;
            UserService.Create(service)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        //$location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }





        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    console.log(vm.username);
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.redirect('../SAO/Views/index.php#/estudios/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();
