(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      absract: true,
      templateUrl: 'src/public/html/menu.html'
    })
    .state('public.new', {
      url: '/',
      templateUrl: 'src/public/html/new.html',
      controller: 'NewPatientController',
      controllerAs: 'patientCtrl'
    })
    .state('public.opds', {
      url: '/opds',
      templateUrl: 'src/public/html/opds.html',
      controller: 'OPDController',
      controllerAs: 'opdCtrl'
    })
    .state('public.medicines', {
      url: '/medicnes',
      templateUrl: 'src/public/html/medicines.html',
      controller: 'MedicineController',
      controllerAs: 'medCtrl'
      
    })
    .state('public.tests', {
      url: '/tests',
      templateUrl: 'src/public/html/tests.html',
      controller: 'TestsController',
      controllerAs: 'testsCtrl'
      
    })
    .state('public.search', {
      url: '/search',
      templateUrl: 'src/public/html/search.html',
      controller: 'SearchController',
      controllerAs: 'searchCtrl'
      
    })
    // .state('public.menu', {
    //   url: '/menu',
    //   templateUrl: 'src/public/menu/menu.html',
    //   controller: 'MenuController',
    //   controllerAs: 'menuCtrl',
    //   resolve: {
    //     menuCategories: ['MenuService', function (MenuService) {
    //       return MenuService.getCategories();
    //     }]
    //   }
    // })
    // .state('public.menuitems', {
    //   url: '/menu/{category}',
    //   templateUrl: 'src/public/menu-items/menu-items.html',
    //   controller: 'MenuItemsController',
    //   controllerAs: 'menuItemsCtrl',
    //   resolve: {
    //     menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
    //       return MenuService.getMenuItems($stateParams.category);
    //     }]
    //   }
    // });
}
})();
