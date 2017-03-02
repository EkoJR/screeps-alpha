
/* global Game, CARRY, MOVE, WORK, _, Memory */

var EKO_NUMBER_OF_HARVESTERS = 1;
var EKO_NUMBER_OF_UPGRADERS = 2;
var EKO_NUMBER_OF_BUILDERS = 1;
var EKO_NUMBER_OF_BUILDERS_S = 0;

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

//var adminLogger = require('admin.logger');

var obj_dump = require('obj_dump');

module.exports.loop = function () {
    //TODO ADD Config Constants
    //TODO ADD Alerts Module
    
    //INIT
    //CLEAR MEMORY
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    
    //// RESPAWN ////
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
//    console.log(harvesters);//[creep Blake],[creep Riley]
//    for(var harv in harvesters)
//    {
//        console.log(harvesters[harv]);//[creep Blake]
//    }
    console.log('Harvesters: ' + harvesters.length);
    
    if( harvesters.length < EKO_NUMBER_OF_HARVESTERS ) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }
    
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgrader: ' + upgraders.length);

    if( upgraders.length < EKO_NUMBER_OF_UPGRADERS ) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }
    
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);

    if( builders.length < EKO_NUMBER_OF_BUILDERS ) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    }
    
    ////////////////////////////////////////////////////////////////////////////
        
    
    var builders_s = _.filter(Game.creeps, (creep) => creep.memory.role == '<eko>builder_s');
    console.log(builders_s);
    if( builders_s.length < EKO_NUMBER_OF_BUILDERS_S ) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: '<eko>builder_s'});
        console.log('Spawning new builder: ' + newName);
    }
    for (var name in builders_s)
    {
        var eko_creep = builders_s[name];
        console.log(eko_creep.memory.role);
        //console.log(JSON.stringify(eko_creep, null, 2));
        //Memory.debug.eko_creep = eko_creep;
        roleBuilder.run(eko_creep);
        
    }
    
    /*
    //// DEFENSE ////
    var tower = Game.getObjectById('acbcbe2ecfa60629df0279e0');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
     */
    
    //// RUN CREEPS ////
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if(creep.memory.role == '<eko>builder_s')
        {
            
        }
        else
        {
            console.log('Who is this? ' + name);
        }
    }
}
