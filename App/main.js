var myApp=angular.module('myApp',[]);
myApp.controller('mainCtrl', function($scope,$http){
//	$scope.shoppingList=[{itemType:'bag',itemName:'Boy',itemBrand:'Chanel',itemPrice:'$4500',itemComment:'2years'}];
	$scope.itemTypeList=['Cloth','Shoes','Bag','Makeup','Skin Care','Electronics','Jewel'];
	
	$scope.addBtnOff=false;
	$scope.updateBtnOff=true;
	$scope.cancelBtnOff=true;

	var refresh=function(){
		$http.get('/shoppingList').success(function(response){
			console.log("GET request - response successfully");
			$scope.shoppingList=response;
			$scope.itemInput="";
		});
	};
	refresh();

	$scope.cancel=function(){
		$scope.itemInput="";
		$scope.addBtnOff=false;
		$scope.updateBtnOff=true;
		$scope.cancelBtnOff=true;
	};

	$scope.addItem=function(){
		if($scope.itemInput.itemName==undefined){
			alert("Input cannot be empty!");
		}else{
		console.log("addItem(): "+$scope.itemInput);
		$http.post('/shoppingList',$scope.itemInput).success(function(response){
			console.log("POST request - get response successfully.");
			console.log(response);
			refresh();
		});
	}//else
	};

	$scope.removeItem=function(id){
		console.log(id);
		$http.delete('/shoppingList/'+id).success(function(response){
			console.log("DELETE request - get response successfully.");
			refresh();
		});
	};

	$scope.editItem=function(id){
		console.log(id);
		$http.get('/shoppingList/'+id).success(function(response){
			console.log("GET One request - successfully.");
			$scope.itemInput=response;
			$scope.updateBtnOff=false;
			$scope.cancelBtnOff=false;
			$scope.addBtnOff=true;
		});
	};

	$scope.updateItem=function(id){
		console.log(id);
		$http.put('/shoppingList/'+id,$scope.itemInput).success(function(response){
			console.log(response);
			refresh();
			$scope.updateBtnOff=true;
			$scope.cancelBtnOff=true;
			$scope.addBtnOff=false;
		});
	};
});