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

        $scope.toggleForm = function(binder) {
            $scope.showForm = true;
            $scope.formData = binder;
        };

        $scope.hideForm = function() { $scope.showForm = false; };

        this.helpers({
            brothers() {
                return Brothers.find({});
            }
        });
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
