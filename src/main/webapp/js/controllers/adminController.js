angular.module('initiativeRollerModule')
    .controller('AdminController', ['$scope', 'restService', 'messageService', 'pageService', 'creatureFactory', function($scope, restService, messageService, pageService, creatureFactory) {
        $scope.creatures = [];
        $scope.messageService = messageService;
        $scope.pageService = pageService;
        $scope.newCreature = {};
        $scope.isAdminControlsOpen = true;
        $scope.isConsoleOpen = false;

        $scope.init = function() {
            messageService.clearMessages();
            $scope.newCreature = creatureFactory.createDefaultCreature();

            $scope.getCreatures();

            $scope.$broadcast('focusName');
        };

        $scope.createCreature = function() {
            if($scope.isCreatureValid($scope.newCreature)) {
                var restEndpoint = $scope.newCreature.type == 'monster' ? 'addMonster' : 'addPlayer';
                restService.post('/rest/creature/' + restEndpoint + '?name=' + $scope.newCreature.name +
                                                                    '&initiative=' + $scope.newCreature.initiative +
                                                                    '&calculatedInitiative=' + $scope.newCreature.calculatedInitiative, null)
                    .then(
                        function () {
                            messageService.addSuccessMessage('The creature was successfully saved.');
                            $scope.newCreature = creatureFactory.createDefaultCreature();
                            $scope.getCreatures();
                        },
                        function () {
                            messageService.addErrorMessage('Something went wrong while saving the creature. Please refresh the page to try again. \n' +
                                '                           If the problem persists, please contact a site administrator.');
                        }
                ).then(
                    function() {
                        $scope.$broadcast('focusName');
                    }
                );
            }
        };

        $scope.deleteCreature = function(creature) {
            restService.post('/rest/creature/delete/' + creature.name, null)
                       .then(
                           function() {
                               messageService.addSuccessMessage('Creature was successfully deleted.');
                               $scope.getCreatures()
                           },
                           function() {
                               messageService.addErrorMessage('Something went wrong while deleting the creature. Please refresh the page to try again. \n' +
                                   '                           If the problem persists, please contact a site administrator.')
                           }
                       );
        };

        $scope.calculateInitiatives = function() {
            restService.get('/rest/creature/calculate')
                       .then(
                           function(response) {
                               $scope.creatures = response.data;
                           },
                           function() {
                               messageService.addErrorMessage('Something went wrong while retrieving the calculated initiatives. Please refresh the page to try again. \n' +
                                   '                           If the problem persists, please contact a site administrator.');
                           }
                       );
        };

        $scope.resetCreatures = function() {
            restService.post('/rest/creature/reset', null)
                        .then(
                            function() {
                                $scope.getCreatures();
                            },
                            function() {
                                messageService.addErrorMessage('Something went wrong while resetting the creatures. Please refresh the page to try again. \n' +
                                    '                           If the problem persists, please contact a site administrator.');
                            }
                        );
        };

        $scope.isCreatureValid = function(creature) {
            if(typeof creature == 'undefined' || creature == null) {
                return false;
            }

            if(typeof creature.type == 'undefined' || creature.type == null || (creature.type != 'monster' && creature.type != 'player')) {
                return false;
            }

            if(typeof creature.name == 'undefined' || creature.name == null || creature.name.trim() === '') {
                return false;
            }

            return true;
        };

        $scope.isCreatureNotValid = function(creature) {
            return !$scope.isCreatureValid(creature);
        };

        $scope.toggleConsoleWindow = function(event) {
            $scope.isConsoleOpen = !$scope.isConsoleOpen;
            event.stopPropagation();
        };

        $scope.getCreatures = function() {
            restService.get('/rest/creature/')
                .then(
                function(response) {
                    $scope.creatures = response.data;
                },
                function() {
                    messageService.addErrorMessage('Something went wrong while retrieving the creatures. Please refresh the page to try again.');
                }
            );
        }
    }]);