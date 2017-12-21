var myApp = angular.module('helloworld', ['ui.router']);

myApp.config(function ($stateProvider) {
    //    var helloState = {
    //        name: 'hello',
    //        url: '/hello',
    //        template: '<h3>hello world!</h3>'
    //    }
    //
    //    var aboutState = {
    //        name: 'about',
    //        url: '/about',
    //        template: '<h3>Its the UI-Router hello world app!</h3>'
    //    }
    //
    //      $stateProvider.state(helloState);
    //      $stateProvider.state(aboutState);

    var states = [
        {
            name: 'root',
            abstract: true,
            url: '/',
            templateUrl: 'root.html'
    },

        {
            name: 'hello',
            url: '/hello',
            // Using component: instead of template:
            component: 'hello'
    },

        {
            name: 'about',
            url: '/about',
            component: 'about'
    },

        {
            name: 'people',
            url: '/people',
            component: 'people',
            // This state defines a 'people' resolve
            // It delegates to the PeopleService to HTTP fetch (async)
            // The people component receives this via its `bindings: `
            resolve: {
                people: function (PeopleService) {
                    return PeopleService.getAllPeople();
                }
            }
    },

        {
            name: 'person',
            // This state takes a URL parameter called personId
            url: '/people/{personId}',
            component: 'person',
            // This state defines a 'person' resolve
            // It delegates to the PeopleService, passing the personId parameter
            resolve: {
                person: function (PeopleService, $transition$) {
                    return PeopleService.getPerson($transition$.params().personId);
                }
            }
    }
  ]

    states.forEach(function (state) {
        $stateProvider.state(state);
    });
});



angular.module('helloworld').service('PeopleService', function ($http) {
    var service = {
        getAllPeople: function () {
            return $http.get('js/data.json', {
                cache: true
            }).then(function (resp) {
                return resp.data;
            });
        },

        getPerson: function (id) {
            function personMatchesParam(person) {
                return person.id === id;
            }

            return service.getAllPeople().then(function (people) {
                return people.find(personMatchesParam)
            });
        }
    }

    return service;
})
