/**
 * Created by rch on 7/11/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './brotherView.html';
import { Brothers } from '../../../api/brothers.js';
import { Meteor } from 'meteor/meteor';

class brotherViewController {
    
    
    constructor($scope, $stateParams, $reactive) {

        $scope.viewModel(this);

        let name = $stateParams.name_string;
        // Get brother from URL

        $reactive(this).attach($scope);

        $scope.isAdmin = (!!Meteor.userId());
        $scope.showForm = false;

        $scope.toggleForm = function() {
            $scope.showForm = true;
        };

        $scope.hideForm = function() { $scope.showForm = false; };

        $scope.delete = function(brother) {
            if (confirm("Confirm delete")) {
                Brothers.remove(brother._id, function (err) {
                    (err) ? console.log(err) : alert("Deleted");
                });
            }
            window.location = "/#/brothers";
        };

        $scope.deleteClass = function(item, classList) {
            if (confirm("Are you sure?")) {
                // item is the 'class' to remove but 'class' is a js reserved word
                let classIndex = classList.classes.indexOf(item);
                let classListIndex = $scope.brother.classes.indexOf(classList);
                let temp = $scope.brother.classes;
                temp[classListIndex].classes.splice(classIndex, 1);

                // JSON.parse(angular.toJson(temp)) this has to be done to remove $$hashKey put in by Angular
                Brothers.update($scope.brother._id, {$set: {classes: JSON.parse(angular.toJson(temp))}},
                    {upsert: false}, function (err) {
                        if (err) console.log(err);
                        else console.log("Removed class");
                    });
            }
        };

        $scope.update = function(brother) {
            if (validate(brother)) {
                Brothers.update(brother._id, {$set: {
                    "firstName": brother.firstName,
                    "lastName": brother.lastName,
                    "graduationYear": brother.graduationYear,
                    "major": brother.major,
                    "class": brother.class
                }}, function(err) {
                    if (err) {
                        console.log(err)
                    } else {
                        alert("Success");
                        // Redirect to new URL for this brother
                        window.location = "/#/brothers/" + brother.firstName + "_" + brother.lastName;
                    }
                });
            }  else {
                console.log("Form Incomplete");
            }
        };

        $scope.addClass = function(formData) {
            if (validateForm(formData)) {
                let added = false;
                $scope.brother.classes.forEach(function(classGroup, index, classes) {
                    // Example classGroup object
                    //  classGroup = {
                    //      semester: "Fall 2015",
                    //      classes: []
                    //  }
                    if (classGroup.semester === formData.semester) {
                        added = true;
                        let temp = classes;
                        temp[index].classes.push({
                            "name": formData.name,
                            "abbreviation": formData.abbreviation,
                            "number": formData.number
                        });

                        // JSON.parse(angular.toJson(temp)) this has to be done to remove $$hashKey put in by Angular
                        Brothers.update($scope.brother._id, { $set: { classes: JSON.parse(angular.toJson(temp)) } },
                        {upsert: false}, function(err) {
                            if (err) console.log(err);
                            else console.log("Added class");
                        });
                    }
                });

                if (!added) {
                    $scope.brother.classes.push({
                        "semester": formData.semester,
                        "classes": [{
                            "name": formData.name,
                            "abbreviation": formData.abbreviation,
                            "number": formData.number
                        }]
                    });
                    Brothers.update($scope.brother._id, {
                        $push: {
                            classes: {
                                "semester": formData.semester,
                                "classes": [{
                                    "name": formData.name,
                                    "abbreviation": formData.abbreviation,
                                    "number": formData.number
                                }]
                            }
                        }
                    }, {upsert: false}, function(err) {
                        if (err) console.log(err);
                        else console.log("Added class");
                    });
                }

                $scope.hideForm();
            } else {
                alert("Form Incomplete");
            }
        };

        // This method orders the classes by semester and year
        // Spring 2016, Fall 2016, Spring 2015, Fall 2015, etc...
        $scope.filteredClasses = function (classes) {
            if (!classes) return [];
            let filteredClasses = classes;
            let n = filteredClasses.length;
            let swapped = false;
            // Bubble sort with newest semesters first
            do {
                swapped = false;
                for (let i = 0; i < n - 1; i++) {
                    let tokens1 = filteredClasses[i + 1].semester.split(" ");
                    let tokens2 = filteredClasses[i].semester.split(" ");
                    let sem1 = tokens1[0];
                    let sem2 = tokens2[0];
                    let year1 = parseInt(tokens1[1]);
                    let year2 = parseInt(tokens2[1]);
                    if (year1 > year2) {
                        let temp = filteredClasses[i + 1];
                        filteredClasses[i + 1] = filteredClasses[i];
                        filteredClasses[i] = temp;
                        swapped = true;
                    } else if (year1 == year2 && sem1 == "Spring" && sem2 == "Fall") {
                        // Put Fall later in list than Spring
                        let temp = filteredClasses[i + 1];
                        filteredClasses[i + 1] = filteredClasses[i];
                        filteredClasses[i] = temp;
                    }
                }
                n -= 1;
            } while (swapped);

            return filteredClasses;
        };
        
        
        this.helpers({
           getBrother() {
               $scope.brother = Brothers.findOne({
                   firstName: name.split("_")[0],
                   lastName: name.split("_")[1]
               });
           }
        });

        let validate = function (brother) {
            if (brother) {
                if (!!brother.firstName && !!brother.lastName &&
                    !!brother.graduationYear && !!brother.class) return true;
            }
            return false;
        };

        let validateForm = function(formData) {
            if (formData) {
                if (!!formData.name && !!formData.number && !!formData.abbreviation && !!formData.semester) return true;
            }
            return false;
        };
    }
}

export default angular.module('BrotherView', [angularMeteor])
    .component('brotherView', {
        templateUrl: template,
        controller: brotherViewController
    });
