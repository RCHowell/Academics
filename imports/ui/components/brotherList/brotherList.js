/**
 * Created by rch on 7/8/16.
 */
import angular from 'angular'
import angularMeteor from 'angular-meteor'
import template from './brotherList.html'
import { Brothers } from '../../../api/brothers.js'

class brotherController {
    
    constructor($scope, $reactive) {
        $scope.viewModel(this);

        $reactive(this).attach($scope);

        $scope.isAdmin = (!!Meteor.userId());
        $scope.showForm = false;

        $scope.toggleForm = function() {
            $scope.showForm = true;
            $scope.formData = {};
        };

        $scope.hideForm = function() { $scope.showForm = false; };

        $scope.addBrother = function(brother) {
            console.log(brother);
            if (validate(brother)) {
                Brothers.insert({
                    "firstName": brother.firstName,
                    "lastName": brother.lastName,
                    "graduationYear": brother.graduationYear,
                    "major": brother.major,
                    "class": brother.class
                }, function (err) {
                    (err) ? console.log(err) : alert("Success");
                });
            } else {
                console.log("Invalid Data");
            }
            $scope.hideForm();
        };

        this.helpers({
            brothers() {
                return Brothers.find({});
            }
        });
        
        let validate = function (brother) {
            if (brother) {
                if (!!brother.firstName && !!brother.lastName &&
                    !!brother.graduationYear && !!brother.class) return true;
            }
            return false;
        }
    }
    
    // Small helper method for redirection
    toBrother(brother) {
        window.location.href = "/#/brothers/" + brother.firstName + "_" + brother.lastName;
    }
}

export default angular.module('BrotherList', [angularMeteor])
    .component('brotherList', {
        templateUrl: template,
        controller: brotherController
    });
