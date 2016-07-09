/**
 * Created by rch on 7/8/16.
 */
import angular from 'angular'
import angularMeteor from 'angular-meteor'
import template from './binderList.html'
import { Binders } from '../../../api/binders.js'

class binderController {
    constructor($scope) {
        $scope.viewModel(this);

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
