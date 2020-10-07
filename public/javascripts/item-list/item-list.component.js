'use strict';

// Register `itemList` component, along with its associated controller and template
angular
  .module('itemList')
  .component('itemList', {
    templateUrl: 'templates/item-list.template.html',
    controller: ['$http', function ItemListController($http) {
      var self = this;
      self.orderProp = 'description';
      
      $http.get('http://cap-sg-prd-4.securegateway.appdomain.cloud:20428/catalog/items?startItemID=0010',
      {
        headers: {Authorization: 'Basic YmtlbGxlcjpwYXNzdzByZA=='},
      }
      ).then(function(response) {

          self.items = response.data.cics_cat_resp.inquire_request.cat_item;

      });

    }],
  });
