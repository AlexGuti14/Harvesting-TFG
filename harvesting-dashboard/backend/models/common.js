const _=require('underscore');

function setAllRequired(schema){
    _.each(_.keys(schema.paths), function (attr) {
        if (schema.path(attr).isRequired === undefined) {
            schema.path(attr).required(true);
        }
    })
}

function setVersioningUpdate(Schema){
    Schema.pre('findOneAndUpdate', function() {
        const update = this.getUpdate();
        if (update.__v != null) {
            delete update.__v;
        }
        const keys = ['$set', '$setOnInsert'];
        for (const key of keys) {
            if (update[key] != null && update[key].__v != null) {
                delete update[key].__v;
                if (Object.keys(update[key]).length === 0) {
                    delete update[key];
                }
            }
        }
        update.$inc = update.$inc || {};
        update.$inc.__v = 1;
    });
}

module.exports = {setVersioningUpdate, setAllRequired};