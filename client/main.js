import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import binderList from '../imports/ui/components/binderList/binderList';
import brotherList from '../imports/ui/components/brotherList/brotherList';
import sidebar from '../imports/ui/components/sidebar/sidebar';
import classList from '../imports/ui/components/classList/classList';
import brotherView from '../imports/ui/components/brotherView/brotherView';

angular.module('Academics', [
    angularMeteor,
    binderList.name,
    sidebar.name,
    brotherList.name,
    classList.name,
    brotherView.name,
    uiRouter
]).config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/binders");

        $stateProvider
            .state('binders', {
                url: '/binders',
                template: '<binder-list></binder-list>'
            })
            .state('books', {
                url: '/books',
                template: '<h1>Books</h1>'
            })
            .state('brothers', {
                url: '/brothers',
                template: '<brother-list></brother-list>'
            })
            .state('brotherView', {
                url: '/brothers/:name_string',
                template: '<brother-view></brother-view>'
            })
            .state('classes', {
                url: '/classes',
                template: '<class-list></class-list>'
            });
    }
]);