var app = angular.module('demo-project',['ngRoute']);

app.config(['$routeProvider',
    function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'templates/home.html',
		controller: 'HomeCtrl'
	}).
	when('/items', {
		templateUrl: 'templates/items.html',
		controller: 'ItemCtrl'
	});
}]);


app.controller('HomeCtrl', function($scope, service){
    
	service.init();
	
	service.request('items/load', {}, function(res){
		
    }).then(function (res){
	   $scope.items = res.data;
    });
   
   $scope.addItem = function(item){
	   service.addItem(item);
   }
	
});

app.controller('ItemCtrl', function($scope, service){
	
   service.getItems();
   
   $scope.clearItems = function(){
	   service.clearItems();
   }
   
   $scope.makePurchase = function(){
	   service.makePurchase($scope);
   }
   
});

app.factory('service', function($q, $rootScope){
	return {
		items: [],
		init: function(){
			var items = JSON.parse(localStorage.getItem('Items'));
			if (items != null){
				$rootScope.count = items.length;
				$rootScope.items = items;
				this.items = items;
			}
			else
			{
				$rootScope.count = 0;
				$rootScope.items = [];	
			}
			
			var mainObject = this;
			$rootScope.search = function(){
			   mainObject.search($rootScope.itemName);
			}
		},
		request : function (url, params) {
			var d = $q.defer();
			
			$.ajax({
				url : url,
				type : 'POST',
				dataType : 'json',
				data : params,
				cashe : false,
				success : function (data) {
					d.resolve(data);
				},
				error : function (err) {
					d.resolve(err);
				}
			});
			
			return d.promise;
		},
		addItem: function(item){
			var c = confirm("Add for sale?");
			if (c){
				
				this.items.push(item);
				localStorage.setItem('Items', JSON.stringify(this.items));
			}
			
		},
		getItems: function(){
			this.init();
		},
		
		clearItems: function(){
			var c = confirm("Are u sure?");
			if (c){
				this.clearCashe();
			}
		},
		clearCashe: function(){
			this.items = [];
			$rootScope.items = [];
			$rootScope.count = 0;
			localStorage.removeItem('Items');
			window.location = "#"
		},
		makePurchase: function($scope){

			var username = "";
			var email = "";
			var mainObject = this;
			
			if(typeof $scope.username != "undefined") {
				username = $scope.username;
			}
			else
			{
				$rootScope.response = "Invalid username";
				return false;
			}
			
			
			if(typeof $scope.email != "undefined") {
				email = $scope.email;
			
			}
			else
			{
				$rootScope.response = "Invalid email";
				return false;
			}
			
			
			var c = confirm("Are u sure?");
			if (c){
				
				var ItemCount = ($rootScope.items.length > 0) ? 1: 0;
				
				this.request('items/makePurchase/' + username + 
				"/" + encodeURIComponent(email) + "/" + ItemCount,
				{}, function(res){
			
			   }).then(function (res){
				   mainObject.response(username,res);
			   });
			}
			
		},
		response: function(username, res){
			switch(res.code) {
			  case 0:
				$rootScope.response = "Server error: no items, please select";
				break;
			  case 1:
				$rootScope.response = "Server error: username must be of minimum 6 characters";
				break;
				case 2:
				$rootScope.response = "Server error: Invalid email format";
				break;
				case 3:{
					$rootScope.response = username + " Thanks for purchase!";
					this.clearCashe();
					break;
				}
			  default:
				window.location = "#";
			}
			
		},
		
		search: function(itemName){
			
			this.request('items/search/' + itemName,
				{}, function(res){
			
			   }).then(function (res){
				   
				   $rootScope.item = res.data[0];
				   $rootScope.searchCount = res.data.length;
			   });
		}
		
	}
});