/**
 * Created by rch on 7/11/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './brotherView.html';
import { Brothers } from '../../../api/brothers.js';
import { Classes } from '../../../api/classes.js';

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
        
        
        this.helpers({
           getBrother() {
               $scope.brother = Brothers.findOne({
                   firstName: name.split("_")[0],
                   lastName: name.split("_")[1]
               });


               $scope.classes = [
                   {
                       semester: "Fall 2016",
                       classes: Classes.find({}, {limit: 5}).map(function(_class) { return _class })
                   }
               ];
           }
        });

        let validate = function (brother) {
            if (brother) {
                if (!!brother.firstName && !!brother.lastName &&
                    !!brother.graduationYear && !!brother.class) return true;
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
