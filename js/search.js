(function($){

	theMovieDb.common.api_key = "9e1b08f9af16f8d7c20c0dd0aeb4749a";	
	
	$(document).ready(function (){		

		var searchBar = $(".js-search-bar");				
		var results = new Results($('.js-wrapper'));

		//run the default search
		results.showPopular();		
	
		searchBar.bind('input propertychange', function() {

			var len = searchBar.val().length;
			
			if(len > 2) {
				results.search(searchBar.val());
			} else if (len === 0){
				results.showPopular();
			}
		});

	});	
	
	function Results(dom){
		this.dom = dom;
		this.resultsDom = $(".js-masonry",dom);		
	}	

	Results.prototype.showPopular = function(){
		var self = this;
		this.searchCall = theMovieDb.movies.getPopular;
		this.searchCall({query:null, adult:false, page:1}, function(data){self.bindDom(data)},function(data){self.error(data)});
	}	
	
	Results.prototype.search = function(text) {
		var self = this;	
		this.searchCall = theMovieDb.search.getMovie;
		this.searchCall({query:text, adult:false, page:1},function(data){self.bindDom(data)},function(data){self.error(data)});
	}

	Results.prototype.bindDom = function(data){
		
		this.dom.animate({"opacity":1},1500);
		var dom = $("<div>",{"class":"masonry"});
				
		var dataSet = $.parseJSON(data).results;
				
		for(var i = 0, len = dataSet.length; i < len; i ++){
			var r = new Result(dataSet[i],dom);
		}		
		
		this.resultsDom.replaceWith(dom);
		this.resultsDom = dom;		
	}

	Results.prototype.error = function(error){
		console.log("Something went wrong",error);
	}	

	window.Results = Results;
})(window.jQuery);
