/*global angular */
angular.module('shuffling', [])
	.controller('FormController', [function(){
		this.guests = [];
		var myStorage;

		this.addguest = function(){
			if (this.name === null || this.date === null || this.status === null){
				alert("You must fill out all fields of the form");
			}
			else {
				newGuest = {name: this.name, date: this.date, status: this.status, location: this.location};
				guestKey = this.name;
				this.name = '';
				this.date = '';
				this.status = '';
				this.location = '';
				guest = JSON.stringify(newGuest);
				localStorage.setItem(guestKey, guest);
				guestNum = 0;
				for (var key in localStorage){
					console.log("Guest " + guestNum + ": " + key + localStorage[key]);
					guestNum++;
				}
			}
		};

	}])
	.controller('TabController', [function(){

	}]);
	//.factory('addguest', )
