/*global angular */
angular.module('shuffling', [])
	.controller('FormController', ['guestStorage', '$scope', function(guestStorage, $scope){



		this.storeGuest = function(){
			//Only enable below to clear localStorage
			// for (var item in localStorage){
			// 	localStorage.removeItem(item);
			// }
			//Check to see if someone is trying to register a guest that already exists
			if (localStorage.getItem(this.name) !== null){
				alert("It seems that this guest is already registered; please edit it from the \"Guests\" tab.");
				$scope.$emit('submitSuccess', false);

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
				}
				$scope.$emit('submitSuccess', true);

			}
		};
	}])
	.controller('TabController', ['$scope', 'guestParse', 'updateGuest', function($scope, guestParse, updateGuest){

		this.tab = 1;
		this.setTab = function(num){
			this.tab = num;
			console.log("changing tab to " + num);
			this.guests = guestParse.parseGuests();
			console.log(this.guests);
		};
		this.checkTab = function(num){
			return this.tab === num;
		};
		$scope.$on('submitSuccess', function(event, data){
			$scope.submitted = data;
		});
		//Had some trouble getting $scope.$on to call this.setTab so I'm just calling
		//this on submit to check whether the submit was successfull
		this.changeTabOnSubmit = function(){
			//console.log("Tab change? " + $scope.submitted);
			if ($scope.submitted === true){
				//console.log("submitted");
				this.tab = 2;
				this.guests = guestParse.parseGuests();
			}
		};
		this.guestUpdate = function(guest){
			updateGuest.updateGuestStore(guest);
			this.guests = guestParse.parseGuests();
			//console.log(localStorage);
		};

	}])
	.service('updateGuest', function(){
		this.updateGuestStore = function(guest){
			var guestOnDisk = JSON.parse(localStorage[guest.name]);
			var name = guest.name;
			var date = Date();  //Presumably employees will be filling out this update form on the
													//date of the escape/transition/whatever
			var status = guest.status;
			var oldStatus = guestOnDisk.status;
			//console.log(oldStatus);
			var location = guest.location;
			if (status == "delete"){
				localStorage.removeItem(guest.name);
			}
			else if (status == "update"){
				if (oldStatus == "Pick-Up" || oldStatus == "Drop-Off"){
					status = "Arrived";
				}
				else if (oldStatus == "Arrived"){
					status = "Pick-up";
				}
			//	console.log("status: " + status);
				updatedGuest = {name: name, date: date, status: status, location: location};
				newGuest = JSON.stringify(updatedGuest);
				localStorage.setItem(guest.name, newGuest);
			}
			else {
				//console.log("status: " + status);
				updatedGuest = {name: name, date: date, status: status, location: location};
				newGuest = JSON.stringify(updatedGuest);
				localStorage.setItem(guest.name, newGuest);
			}
		};
	})
	.service('createGuest', [function(){
		this.addGuest = function(name, date, status, location){
			//console.log("createGuest called");
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
	}])
	.service('guestParse', function(){
		this.parseGuests = function(){
			var guests = [];
			for (var item in localStorage){
				guests.push(JSON.parse(localStorage[item]));
			}
			return guests;
		};
	});
