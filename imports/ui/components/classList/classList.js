/**
 * Created by rch on 7/11/16.
 */
import angular from 'angular'
import angularMeteor from 'angular-meteor'
import template from './classList.html'
import { Classes } from '../../../api/classes.js'

class classesController {
    constructor($scope, $reactive) {
        $scope.viewModel(this);

        $reactive(this).attach($scope);

        $scope.isAdmin = (!!Meteor.userId());
        $scope.showForm = false;

        $scope.toggleForm = function(binder) {
            $scope.showForm = true;
            $scope.formData = binder;
        };

        $scope.hideForm = function() { $scope.showForm = false; };
        
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