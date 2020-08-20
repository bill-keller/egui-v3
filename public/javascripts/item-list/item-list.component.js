'use strict';

// Register `itemList` component, along with its associated controller and template
angular
  .module('itemList')
  .component('itemList', {
    templateUrl: 'templates/item-list.template.html',
    controller: ['$http', function ItemListController($http) {
      var self = this;
      self.orderProp = 'description';

      $http.get('http://cap-sg-prd-2.integration.ibmcloud.com:16598/catalog/items?startItemID=0010')
        .then(function(response) {

          self.items = response.data.cics_cat_resp.inquire_request.cat_item;

      });

    }],
  });
