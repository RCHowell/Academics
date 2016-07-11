/**
 * Created by rch on 7/8/16.
 */
import angular from 'angular'
import angularMeteor from 'angular-meteor'
import template from './brotherList.html'
import { Brothers } from '../../../api/brothers.js'

class brotherController {
    constructor($scope) {
        $scope.viewModel(this);

        this.helpers({
            brothers() {
                return Brothers.find({});
            }
        });
    }
}

export default angular.module('BrotherList', [angularMeteor])
    .component('brotherList', {
        templateUrl: template,
        controller: brotherController
    });