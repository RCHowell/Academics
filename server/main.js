import { Meteor } from 'meteor/meteor';
import { Binders } from '../imports/api/binders';
import { Brothers } from '../imports/api/brothers';
import { Classes } from '../imports/api/classes';

Meteor.startup(() => {
    // code to run on server at startup
    
    // Add class data if it's empty
    if (Classes.find().count() === 0) {
        let count = 0;
        Binders.find().forEach(function(binder) {

            // Check if class already exists
            let isClass = Classes.findOne({
                "abbreviation": binder.abbreviation,
                "number": binder.class
            });

            // If the class doesn't exist, then create it
            if (!isClass) {
                Classes.insert({
                    "name": binder.subject,
                    "abbreviation": binder.abbreviation,
                    "number": binder.class,
                    "hasBinder": true
                });
                count++;
            }
        });
        
        console.log("Inserted " + count + " classes.");

    } else {
        console.log("No new classes inserted");
    }
});
