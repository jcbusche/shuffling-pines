/*global angular */
angular.module('shuffling', [])
	.controller('FormController', ['guestStorage', 'TabController', function(guestStorage, TabController){

		this.storeGuest = function(){
			//Check to see the form is completely filled out
			if (this.name === null || this. date === null || this.satus === null || this.location ===null){
				alert("Please complete the form before submitting.");
				//Not clearing form here because that could potentially be very annoying.
			}
			//Check to see if someone is trying to register a guest that already exists
			else if (localStorage.getItem(this.name) !== null){
				alert("It seems that this guest is already registered; please edit it from the \"Guests\" tab.");
			}
			else {
				guestStorage.storeGuest(this.name, this.date, this.status, this.location);

				this.name = '';
				this.date = '';
				this.status = '';
				this.location = '';
				guestNum = 0;
				for (var key in localStorage){
					console.log("Guest " + guestNum + ": " + key + localStorage[key]);
					guestNum++;
					//Only enable below to clear localStorage
					//localStorage.removeItem(key);
				}
				TabController.setTab(2);
			}
		};
	}])
	.controller('TabController', [function(){

		this.tab = 1;

		this.setTab = function(num){
			this.tab = num;
			console.log("tab = " + num);
		};
		this.checkTab = function(num){
			return this.tab === num;
		};

	}])
	.controller('ListController', [function(){
		guestList = localStorage;
	}])
	.service('createGuest', [function(){
		this.addGuest = function(name, date, status, location){
			console.log("createGuest called");
			newGuest = {name: name, date: date, status: status, location: location};
			return newGuest;
		};
	}])
	.service('guestStorage', ['createGuest', function(createGuest){
		this.storeGuest = function(name, date, status, loc){
			console.log('guestStorage called');
			guestToStore = createGuest.addGuest(name, date, status, loc);
			stringGuest = JSON.stringify(guestToStore);
			localStorage.setItem(name, stringGuest);
		};
	}]);
