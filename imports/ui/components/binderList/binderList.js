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

        $reactive(this).attach($scope);
        
        $scope.isAdmin = (!!Meteor.userId());
        $scope.showForm = false;

        $scope.toggleForm = function(binder) {
            $scope.showForm = true;
            $scope.formData = binder;
        };

        $scope.hideForm = function() { $scope.showForm = false; };


        this.helpers({
            binders() {
                return Binders.find({});
            }
        });
    }
}

export default angular.module('BinderList', [angularMeteor])
    .component('binderList', {
        templateUrl: template,
        controller: binderController
    });
