angular.module('creatureControl').service('creatureFactory', function() {
    this.createDefaultCreature = function() {
        return {
            name:'',
            type:'monster',
            initiative: 0,
            calculatedInitiative: 0,
            invisible: false
        };
    };

});