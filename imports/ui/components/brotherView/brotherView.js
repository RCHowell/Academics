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
    }
}

export default angular.module('BrotherView', [angularMeteor])
    .component('brotherView', {
        templateUrl: template,
        controller: brotherViewController
    });
