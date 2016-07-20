/**
 * Created by rch on 7/11/16.
 */
import angular from 'angular'
import angularMeteor from 'angular-meteor'
import template from './classList.html'
import { Classes } from '../../../api/classes.js'
import { Brothers } from '../../../api/brothers.js'
import { Binders } from '../../../api/binders.js'

class classesController {
    constructor($scope, $reactive) {
        $scope.viewModel(this);

        $reactive(this).attach($scope);

        $scope.isAdmin = (!!Meteor.userId());
        $scope.loading = false;

        $scope.toggleForm = function(binder) {
            $scope.showForm = true;
            $scope.formData = binder;
        };
        
        $scope.updateClasses = function() {
            if (confirm("This will take a bit. Are you sure?")) {
                $scope.loading = true;
                Meteor.call('updateClassesFromBinders', function() {
                    Meteor.call('updateClassesFromBrothers', function() {
                        location.reload();
                    });
                });
            }
        };
        
        
        this.helpers({
            classes() {
                return Classes.find({});
            }
        });
    }
}

export default angular.module('ClassList', [angularMeteor])
    .component('classList', {
        templateUrl: template,
        controller: classesController
    });