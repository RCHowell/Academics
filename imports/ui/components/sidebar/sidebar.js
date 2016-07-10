/**
 * Created by rch on 7/10/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './sidebar.html';

class sidebarController {
    constructor($scope) {
        $scope.viewModel(this);

        this.links = [
            {
                title: 'Binders',
                href: '#binders',
                active: true
            },
            {
                title: 'Books',
                href: '#books',
                active: false
            },
            {
                title: 'Brothers',
                href: '#brothers',
                active: false
            },
            {
                title: 'Class',
                href: '#classes',
                active: false
            }
        ];
    }

    setActive(link) {
        this.links.forEach(function(l, index, links) {
           l.active = false;
        });
        link.active = true;
    }
}

export default angular.module('sidebar', [angularMeteor])
    .component('sidebar', {
        templateUrl: template,
        controller: sidebarController
    });
