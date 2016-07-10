import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import binderList from '../imports/ui/components/binderList/binderList';
import sidebar from '../imports/ui/components/sidebar/sidebar';

angular.module('Academics', [
    angularMeteor,
    binderList.name,
    sidebar.name,
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
                template: '<h1>Brothers</h1>'
            })
            .state('classes', {
                url: '/classes',
                template: '<h1>Classes</h1>'
            });
    }
]);