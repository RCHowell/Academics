/**
 * Created by rch on 7/10/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './sidebar.html';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

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
                title: 'Classes',
                href: '#classes',
                active: false
            }
        ];
    }

    toggleLogin() {
        if (!!Meteor.userId()) {
            Meteor.logout(function(){ console.log("Logged Out")});
        } else {
            Meteor.loginWithPassword("howell", prompt("Pass", ""), function(err) {
                if (err)  console.log("Failed to authenticate")
            });
        }
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
