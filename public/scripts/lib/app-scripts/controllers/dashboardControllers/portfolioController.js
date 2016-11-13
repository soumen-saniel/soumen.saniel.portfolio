define(function(){
	var app = angular.module("coreModule");
	app.registerController('portfolioController',["appService", "logService", portfolioController]);
	function portfolioController(appService, logService){
		//-----------------------------------------------------------------------------------------------
		//Veriables
		//-----------------------------------------------------------------------------------------------
		var ctrl = this;
		ctrl.projects = [];
		ctrl.newProjectName = "";
		ctrl.projectsSub = {};
		var dummyDocumentMain = {
			name : "",
			overview : "",
			technology : [],
			url : "",
			category : "",
			client : "",
			role : "",
			complete : false,
			image : "/img/dummy.png"
		}
		
		var dummyDocumentSub = {
			image : "/img/dummy.png",
			key : "",
			name : "",
			description : ""
		}
		//-----------------------------------------------------------------------------------------------
		//Configuration
		//-----------------------------------------------------------------------------------------------
		ctrl.url = {
			db : {
				main : "/api/portfolio/main",
				sub : "/api/portfolio/sub"
			},
			fs : '/api/portfolio/img'
		}
		ctrl.fsDir = '/img/project/';
		//-----------------------------------------------------------------------------------------------
		//Inetial get
		//-----------------------------------------------------------------------------------------------
		appService.get(ctrl.url.db.main).then(
	        function(response) {
	        	console.log(response.data);
	        	ctrl.projects = response.data;
	        	deleteFoldersOnLoad(response.data, './public/img/project/');
	        }, 
	        function(err) {
	            //logService.failed('appService.get()', err);
	        }
	    );
	    //-----------------------------------------------------------------------------------------------
		//Helper functions
		//-----------------------------------------------------------------------------------------------
		
		ctrl.openPoject = function(index){
			ctrl.openedProject = index;
			if(ctrl.projects[index]._id){
				if(!ctrl.projectsSub.hasOwnProperty(ctrl.projects[index]._id)){
					console.log(ctrl.projects[index]);
					getSub(ctrl.projects[index]);
				}
			}
		}
		function deleteFoldersOnLoad(value, path){
			var arr = [];
            angular.forEach(value, function (val, key){
            	val = val.name;
            	arr.push(val);
            });
        	appService.delete(ctrl.url.fs, {file : arr, path : path, folder : true}).then(
	    		function(response){
	    			//logService.success('appService.delete()', response);
	    		},function(err){
	    			logService.failed('appService.delete()', err);
	    		}
    		);
		}
		function deleteResourcesOnLoad(data, response, path){
			debugger;
			var imgArr = [];
			var mainImg = data.image;
			mainImg = mainImg.split("/");
			mainImg = mainImg[mainImg.length - 1];
			imgArr.push(mainImg);
            angular.forEach(value, function (val, key){
            	val = val.image;
            	val = val.split("/");
            	val = val[val.length - 1];
            	imgArr.push(val);
            });
        	appService.delete(ctrl.url.fs, {file : imgArr, path : path, folder : false}).then(
	    		function(response){
	    			//logService.success('appService.delete()', response);
	    		},function(err){
	    			//logService.failed('appService.delete()', err);
	    		}
    		);
		}
		ctrl.addNewProject = function(){
			var nameExists = false;
			angular.forEach(ctrl.projects, function (val, key){
				if(val.name === ctrl.newProjectName){
					nameExists = true;
				}
			});
			if(nameExists){
				alert("Name already exists!");
				ctrl.newProjectName = "";
			}else{
				var newProj = angular.copy(dummyDocumentMain);
				newProj.name = angular.copy(ctrl.newProjectName);
		    	ctrl.projects.push(newProj);
		    	ctrl.newProjectName = "";
		    }
	    }
	    ctrl.addNewSub = function(data){
	    	if(data._id){
				var newSub = angular.copy(dummyDocumentSub);
				newSub.key = data._id;
				newSub.name = data.name;
				if(ctrl.projectsSub.hasOwnProperty(data._id)){
					ctrl.projectsSub[data._id].push(newSub);
				}else{
					ctrl.projectsSub[data._id] = [];
					ctrl.projectsSub[data._id].push(newSub);
				}
				console.log(ctrl.projectsSub);
			}else{
				alert("First save the project!");
			}
	    }
	    //-----------------------------------------------------------------------------------------------
		//CRUD Operations
		//-----------------------------------------------------------------------------------------------
		ctrl.save = function(data){
	    	if(data._id){
	    		appService.put(ctrl.url.db.main, data).then(
		    		function(response){
		    			ctrl.projects = response.data;
		    			alert("Data updated.");
		    			logService.success('appService.post()', response);
		    		},function(err){
		    			alert("Update failed due to : "+err);
		    			logService.failed('appService.post()', err);
		    		}
	    		);

	    	}else{
		    	appService.post(ctrl.url.db.main, data).then(
		    		function(response){
		    			ctrl.projects = response.data;
		    			alert("Data saved.");
		    			logService.success('appService.post()', response);
		    		},function(err){
		    			alert("Save failed due to : "+err);
		    			logService.failed('appService.post()', err);
		    		}
	    		);
		    }
	    }

	    function getSub(data){
	    	if(data._id){
	    		appService.getQuery(ctrl.url.db.sub, data._id).then(
		    		function(response){
		    			console.log(response);
		    			if(response.data[0]){
		    				if(ctrl.projectsSub.hasOwnProperty(response.data[0].key)){
		    					deleteResourcesOnLoad(data, response.data, './public/img/project/'+data.name+'/');
								ctrl.projectsSub[response.data[0].key] = response.data;
			    				logService.success('appService.post()', response);
			    				
							}else{
								deleteResourcesOnLoad(data, response.data, './public/img/project/'+data.name+'/');
								ctrl.projectsSub[response.data[0].key] = [];
								ctrl.projectsSub[response.data[0].key] = response.data;
			    				logService.success('appService.post()', response);
							}
			    		}
		    		},function(err){
		    			logService.failed('appService.post()', err);
		    		}
	    		);
	    	}
	    }
	    ctrl.saveSub = function(data){
	    	if(data._id){
	    		appService.put(ctrl.url.db.sub, data).then(
		    		function(response){
		    			ctrl.projectsSub[response.data[0].key] = response.data;
		    			alert("Data updated.");
		    			logService.success('appService.post()', response);
		    		},function(err){
		    			alert("Update failed due to : "+err);
		    			logService.failed('appService.post()', err);
		    		}
	    		);

	    	}else{
		    	appService.post(ctrl.url.db.sub, data).then(
		    		function(response){
		    			ctrl.projectsSub[response.data[0].key] = response.data;
		    			alert("Data saved.");
		    			logService.success('appService.post()', response);
		    		},function(err){
		    			alert("Save failed due to : "+err);
		    			logService.failed('appService.post()', err);
		    		}
	    		);
		    }
	    }
	}
});