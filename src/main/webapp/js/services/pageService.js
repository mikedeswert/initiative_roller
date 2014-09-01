angular.module('initiativeRollerModule')
    .factory('pageService', ['$location', function ($location) {
        return {
            goToInitiatives: function () {
                $location.path('/initiatives');
            },
            goToAdmin: function () {
                $location.path('/admin');
            },
            goToBoard: function () {
                $location.path('/board');
            },
            getCurrentPage: function () {
                return $location.path().substr(1);
            }
        }
    }]);