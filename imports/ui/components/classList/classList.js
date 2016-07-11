/**
 * Created by rch on 7/11/16.
 */
import angular from 'angular'
import angularMeteor from 'angular-meteor'
import template from './classList.html'
import { Classes } from '../../../api/classes.js'

class classesController {
    constructor($scope) {
        $scope.viewModel(this);
        
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