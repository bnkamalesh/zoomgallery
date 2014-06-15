/*
Author     : Kamaleshwar BN
Date  	   : August, 2013
Description: A JQuery plugin to create a fullscreen gallery of images.
*/
$ = jQuery;

var zoomGallery = new function() {
	var img_index;
	var zG_list = null;
	
	this.init = function (img_container, image_list, manual_launch) {
		var anim_duration = 550;

		// img_container is supposed to be a jquery object
		if(!img_container && !image_list) return false;

		// if a custom image_list is not sent to the function, new one is created.
		if(!image_list) {
			image_list = new Array();
			img_container.find("img").each(function() {
				image_list.push({ "url": $(this).attr("src"), "description": $(this).attr("alt") });
			});
		}

		zG_list = image_list;

		if(!manual_launch) {

			// binding click event to the images.
			img_container.find("img").on("click", function() {
				$("#zoomGallery .right-count").html( zG_list.length );
				show( $(this).attr("src") );
			});
			//===
		}

		$("#zoomGallery .close").click(function() {
			hide();
			return false;
		});

		$("#zoomGallery .prev").click(function() {
			prev(anim_duration);
			return false;
		});

		$("#zoomGallery .next").click(function() {
			next(anim_duration);
			return false;
		});

		$(document).keyup(function(e) {
			switch(e.keyCode) {
				case 27: // Esc
					$("#zoomGallery .close").removeClass("active");
					hide();
				break;
				
				case 37: // left arrow
					$("#zoomGallery .prev").removeClass("active");
					prev(anim_duration);
				break;

				case 39: // right arrow
					$("#zoomGallery .next").removeClass("active");
					next(anim_duration);
				break;
			}
		});

		$(document).keydown(function(e) {
			switch(e.keyCode) {
				case 27: // Esc
					$("#zoomGallery .close").addClass("active");
				break;
				
				case 37: // left arrow
					$("#zoomGallery .prev").addClass("active");
				break;

				case 39: // right arrow
					$("#zoomGallery .next").addClass("active");
				break;
			}
		});
	}; // init()

	this.manual_launch = function(img_src){
		$("#zoomGallery .right-count").html( zG_list.length );
		show(img_src);
	};

	function show(url, duration) {
		if(typeof duration == "undefined" || duration === null)
			duration = 300;

		$("#zoomGallery > div.content").height(  $(window).height() - 80 );

		img_index = -1;
		for(var i = 0; i < zG_list.length; i++) {
			if( zG_list[i].url == url )
				img_index = i;
		}

		$("#zoomGallery .left-count").html( img_index + 1 );
		
		
		$("#zoomGallery").fadeIn(duration, function() {
			$('body').addClass("noscroll");
			$('html, body').animate({scrollTop: 0}, 250);

			var img = '<img style="display: none;" src="'+zG_list[img_index].url+'" alt="'+zG_list[img_index].description+'"/>';
			$("#zoomGallery > .content").append(img);
			$("#zoomGallery > .content img").fadeIn(duration, function(){
				var item = $(this);
				item.animate({"margin-top": ($("#zoomGallery > .content").outerHeight() - item.outerHeight() ) / 2}, duration );
			});
		});

		$("#zoomGallery .left-count").html( img_index + 1 );
	}

	function hide(duration) {
		if(typeof duration == "undefined" || duration === null)
			duration = 300;

		$('body').removeClass('noscroll');
		$("#zoomGallery > .content img").remove();
		$("#zoomGallery").fadeOut(duration);
	}

	function next(duration, loop) {
		if(typeof duration == "undefined" || duration === null)
			duration = 300;
		
		if(!loop && loop!==false)
			loop = true;

		if(img_index < (zG_list.length - 1) || loop) {
			img_index++;
			if(img_index > (zG_list.length-1))
				img_index = 0;

			$("#zoomGallery > .content img").fadeOut(duration, function(){ 
				$(this).remove(); 

				var img = '<img style="display: none;" src="'+zG_list[img_index].url+'" alt="'+zG_list[img_index].description+'"/>';
				$("#zoomGallery > .content").append(img);
				$("#zoomGallery > .content img").each(function() {
					var item = $(this);
					item.css("margin-top", ($("#zoomGallery > .content").outerHeight() - item.outerHeight() ) / 2 );
				});

				$("#zoomGallery > .content img").fadeIn(duration);
				$("#zoomGallery .left-count").html( img_index + 1 );
			});
		}
		return false;
	}

	function prev(duration, loop) {
		if(typeof duration == "undefined" || duration === null)
			duration = 300;

		if(!loop && loop!==false)
			loop = true;

		if(img_index > 0 || loop) {
			img_index--;
			if(img_index < 0)
				img_index = zG_list.length - 1;

			$("#zoomGallery > .content img").fadeOut(duration, function(){
				$(this).remove();

				var img = '<img style="display: none;" src="'+zG_list[img_index].url+'" alt="'+zG_list[img_index].description+'"/>';
				$("#zoomGallery > .content").append(img);
				$("#zoomGallery > .content img").each(function(){
					var item = $(this);
					item.css("margin-top", ($("#zoomGallery > .content").outerHeight() - item.outerHeight() ) / 2 );
				});

				$("#zoomGallery > .content img").fadeIn(duration);

				$("#zoomGallery .left-count").html( img_index + 1 );
			});
		}
		return false;
	}
};