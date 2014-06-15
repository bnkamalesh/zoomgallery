ZoomGallery
===========

ZoomGallery is a simple JQuery plugin to display images in a full page, lightbox gallery, with basic navigation controls.


How to use
==========

To enable ZoomGallery on a particular set of images, there are 2 methods.

1. Call the `init` function with the image container.
	E.g: zoomGallery.init( $("#zoomG") );
	- Where `#zoomG` is the ID of any DOM element which contains a set of images. 
	  The caption/description of the image will be the value contained in the `alt` 
	  attribute of the image.

2. Call the `init` function with the list of images to be included in the gallery.
	E.g:

		image_list = [
			{ "url": "http://yourdomain.com/images/1.jpg", "description": "Picture 1" },
			{ "url": "http://yourdomain.com/images/2.jpg", "description": "Picture 2" }
		];
		zoomGallery.init(null, image_list);
