(function($){
	
	function Result(data, parentDom){

		this.data = data;
		this.parentDom = parentDom;
		
		var dom = this.dom = $('<div>',{"class":"js-movie"});
		
		dom.append(this.getPhoto());		
				
		dom.click(this,function(ev){
			ev.data.onClicked();
		});
	
		parentDom.append(this.dom);
	}
	
	Result.prototype.getPhoto = function(){
	
		var photo = $('<img>',{"class":"image"});
		var data = this.data;
		
		if(data.poster_path){
				photo[0].src = theMovieDb.common.getImage({size:"w185",file:data.poster_path});
			} else {
				photo[0].src = "assets/movie.png";
			}
		return photo;
	}	
	
	Result.prototype.onClicked = function(){
		var self = this;	
		var typeclass = theMovieDb.movies;	
		typeclass.getById({id:this.data.id}, function(data){self.displayModal(data)},function(err){self.displayErr(err)});
	}
	
	Result.prototype.displayModal = function(data){
				
		data = $.parseJSON(data);
		
		$('#myModalLabel').html(this.data.title + "<span class='rating'>Rating: " + this.data.vote_average + "/10" + "</span>");	
		$('#myModalBody').html(data.overview).append("</br>").append(this.getPhoto());		
		$('#myModal').modal();
		
	}

	window.Result = Result;

})(window.jQuery);