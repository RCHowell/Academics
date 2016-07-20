import { Meteor } from 'meteor/meteor';
import { Binders } from '../imports/api/binders';
import { Brothers } from '../imports/api/brothers';
import { Classes } from '../imports/api/classes';

Meteor.startup(() => {
    // code to run on server at startup
});

Meteor.methods({
   'updateClassesFromBinders': function() {
       console.log("Updating Classes From Binders");
       Classes.remove({}, function(err) {
           if (err) { console.log(err); }
           else {
               Binders.find().forEach(function (binder) {
                   createClassFromBinder(binder);
               });
           }
       });
   },
    'updateClassesFromBrothers': function() {
        console.log("Updating Classes From Brothers");
        // Loop through all brothers -> each semester -> each class in each semester
        Brothers.find({}).forEach(function(brother) {
            brother.classes.forEach(function(semester) {
                semester.classes.forEach(function(_class) {

                    let classDoc = Classes.findOne({
                        "name": _class.name,
                        "abbreviation": _class.abbreviation,
                        "number": _class.number
                    });
                    // check if the class exists
                    if (!!classDoc) {
                        setClassHasBrother(classDoc, brother);
                    } else {
                        createClassFromBrother(_class, brother);
                    }
                });
            });
        });
    }
});

let createClassFromBinder = function(binder) {
    Classes.insert({
        "name": binder.subject,
        "abbreviation": binder.abbreviation,
        "number": binder.class,
        "hasBinder": true,
        "hasBrother": false,
        "brothers": []
    }, function(err) {
        if (err) console.log(err);
    });
};

let setClassHasBrother = function(_class, brother) {

    Classes.update(_class._id,
        {
            $set: { hasBrother: true },
            $push: { brothers: brotherToString(brother)}
        }, {
            upsert: false
        }, function (err) {
            if (err) console.log(err);
        }
    );
};

let createClassFromBrother = function(_class, brother) {
    Classes.insert({
        "name": _class.name,
        "abbreviation": _class.abbreviation,
        "number": _class.number,
        "hasBinder": false,
        "hasBrother": true,
        "brothers": [brotherToString(brother)]
    }, function(err) {
        if (err) console.log(err);
    });
};

let brotherToString = function (brother) {
    return brother.firstName + " " + brother.lastName;
};
