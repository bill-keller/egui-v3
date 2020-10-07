'use strict';

// Register `itemDetail` component, along with its associated controller and template
angular
  .module('itemDetail')
  .component('itemDetail', {
    templateUrl: 'templates/item-detail.template.html',
    controller: ['$http', '$routeParams',
      function ItemDetailController($http, $routeParams) {
        var self = this;

        // set mainImageUrl
        self.setImage = function setImage(imageUrl) {
          self.mainImageUrl = imageUrl;
        };

        // #############################################
        // get itemDetails from json file stored locally
        $http.get('items/item' + $routeParams.itemId + '.json')
          .then(function(response) {
            self.itemDetails = response.data;

            self.setImage(self.itemDetails.images[0]);
        });

        // #############################################
        // get inventory details from CICS applicaiton via REST API call to z/OS Connect
        $http.get('http://cap-sg-prd-4.securegateway.appdomain.cloud:20428/catalog/items/' + $routeParams.itemId,
          {
            headers: {Authorization: 'Basic YmtlbGxlcjpwYXNzdzByZA=='},
          } 
        ).then(function(response) {

            self.itemDetailsCICS = response.data.cics_single_resp.inquire_single.single_item;

        });

        // #############################################
        // get shipping information from VSAM file via REST API call to z/OS Connect and DVM
        $http.get('http://cap-sg-prd-4.securegateway.appdomain.cloud:20428/catalog_shipping/itemShipping?ITEMID=' + $routeParams.itemId,
          {
            headers: {Authorization: 'Basic YmtlbGxlcjpwYXNzdzByZA=='},
          }
        ).then(function(response) {
          
          self.itemShippingDetailsVSAM = response.data.Records[0];

        });

        // #############################################
        // get device dimensions from DB2 z/OS via REST API call to z/OS Connect and DB2 z/OS
        $http.get('cap-sg-prd-4.securegateway.appdomain.cloud:20428/catalog_device_dimensions/devices/' + $routeParams.itemId,
         {
            headers: {Authorization: 'Basic YmtlbGxlcjpwYXNzdzByZA=='},
         }  
        ).then(function(response) {

          console.log($routeParams.itemId);
          self.itemDeviceDimensionsDB2 = response.data['ResultSet Output'][0];

        });


      },
    ],
  });
