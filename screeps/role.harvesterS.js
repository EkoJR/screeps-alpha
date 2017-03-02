/* global Memory, Game, CARRY, MOVE, WORK, _, FIND_CONSTRUCTION_SITES, ERR_NOT_IN_RANGE, FIND_SOURCES, FIND_STRUCTURES, STRUCTURE_SPAWN, STRUCTURE_EXTENSION, RESOURCE_ENERGY */

////////////////////////////////////////////////////////////////////////////////
//// CUSTOM - 1 ////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

var roleHarvesterS = {

    /** @param {Creep} creep **/
    //ADD Max Job Radius Config
    //ADD Job1/Job2 Priority Ratio
    run: function (creep) {
        if (creep.carry.energy < creep.carryCapacity) 
        {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(sources[0]);
            }
        } 
        else 
        {
            var targets = creep.room.find(FIND_STRUCTURES, 
            {
                filter: (structure) => 
                {
                    return (structure.structureType == STRUCTURE_EXTENSION 
                            || structure.structureType == STRUCTURE_SPAWN 
                            || structure.structureType == STRUCTURE_TOWER) && 
                            structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) 
            {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(targets[0]);
                }
            }
        }
    },
    make: function ()
    {
        
    }
};

module.exports = roleHarvesterS;

