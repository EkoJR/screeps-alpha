/* global Memory, Game, CARRY, MOVE, WORK, _, FIND_CONSTRUCTION_SITES, ERR_NOT_IN_RANGE, FIND_SOURCES */

////////////////////////////////////////////////////////////////////////////////
//// CUSTOM - 1 ////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

var roleBuilder_s = {

    /** @param {Creep} creep **/
    //ADD Max Job Radius Config
    //ADD Job1/Job2 Priority Ratio
    
    //Either Get Creeper, or create a new one?
    construct: function(name)
    {
        
    },
    run: function (creep) 
    {
        //determins tasks
        if (creep.memory.building && creep.carry.energy == 0) 
        {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) 
        {
            creep.memory.building = true;
            creep.say('building');
        }

        if (creep.memory.building) 
        {
            this.go_build(creep);
        } 
        else 
        {
            this.go_harvest(creep);
        }
    },
    go_build: function(creep)
    {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) 
        {
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(targets[0]);
            }
        }
    },
    go_harvest: function(creep)
    {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) 
        {
            creep.moveTo(sources[0]);
        }
    },
    go_load: function(creep)
    {
        var targets = creep.room.find(FIND_STRUCTURES, 
            {
                filter: (structure) => 
                {
                    return (structure.structureType == STRUCTURE_EXTENSION 
                            || structure.structureType == STRUCTURE_SPAWN) && 
                            structure.energy < structure.energyCapacity;
                }
            });
    }
    
};

module.exports = roleBuilder_s;

