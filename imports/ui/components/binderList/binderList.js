/**
 * Created by rch on 7/8/16.
 */
import angular from 'angular'
import angularMeteor from 'angular-meteor'
import template from './binderList.html'
import { Binders } from '../../../api/binders.js'
import { Meteor } from 'meteor/meteor'

class binderController {

    constructor($scope, $reactive) {

        $scope.viewModel(this);

        $scope.emptyObject = {};

        $reactive(this).attach($scope);
        
        $scope.isAdmin = (!!Meteor.userId());
        $scope.showForm = false;
        $scope.updating = false;
        
        $scope.showNew = function() {
            $scope.updating = false;
            $scope.showForm = true;
            $scope.formData = {};
        };
        
        $scope.showUpdate = function(binder) {
            $scope.showForm = true;
            $scope.updating = true;
            $scope.formData = {
                "subject": binder.subject,
                "abbreviation": binder.abbreviation,
                "class": binder.class,
                "id": binder._id
            };
        };

        $scope.hideForm = function() {
            $scope.formData = {};
            $scope.showForm = false;
        };

        $scope.delete = function(binder) {
            let confirmation = confirm("Do you want to delete: \n{\n"
                + "\tsubject: " + binder.subject + ",\n"
                + "\tabbreviation: " + binder.abbreviation + ",\n"
                + "\tclass: " + binder.class + "\n}"
            );
            if (confirmation) Binders.remove(binder._id, function(err) {
                (err) ? console.log(err) : alert("Success");
            });
        };

        $scope.newBinder = function(binder) {
            if (validate(binder)) {
                Binders.insert(binder, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        alert("Success");
                    }
                });
            }
        };

        $scope.updateBinder = function(binder) {
            if (validate(binder)) {
                Binders.update(binder.id, {$set: {
                    "subject": binder.subject,
                    "abbreviation": binder.abbreviation,
                    "class": binder.class
                }}, function(err) {
                    if (err) {
                        console.log(err)
                    } else {
                        alert("Success");
                    }
                });
            }

            $scope.hideForm();
        };


        this.helpers({
            binders() {
                return Binders.find({});
            }
        });

        let validate = function(binder) {
            if (binder) {
                if (!!binder.subject && !!binder.class && !!binder.abbreviation) return true;
            }
            return false;
        };
    }
}

export default angular.module('BinderList', [angularMeteor])
    .component('binderList', {
        templateUrl: template,
        controller: binderController
    });
