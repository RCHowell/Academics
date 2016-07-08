import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import binderList from '../imports/ui/components/binderList/binderList'

angular.module('Academics', [
    angularMeteor,
    binderList.name
]);