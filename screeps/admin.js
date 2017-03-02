var admin = {
    obj_dump_mem: function(obj, name = 'obj_dump')
    {
        
        Memory.obj_dump = {
            name: obj
        }
    },
    obj_dump_log: function(obj)
    {
        console.log(JSON.stringify(obj, null, 2));
    }
};

module.exports = admin;

