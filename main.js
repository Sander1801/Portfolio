$(document).ready(function()
{
	var currentProjectID = -1;

	// Find the active project ID.
	$('#projectsList li').each(function(i, obj) 
	{
    		currentProjectID++;

    		// Found the active class, stop the each loop.
    		if ($(this).hasClass("active")) return false;
	});

  	$('ul#menu li a').click(function()
  	{ 
  		// The selected menu item is already active.
  		if ($(this).hasClass("active")) return

  		// Remove 'active' and add it to the selected menu item.
    		$('#menu li a').removeClass("active");
    		$(this).addClass("active");

    		// Get the name of the page we should display.
    		const newPageName = $(this).attr("data-page");
    		const slideDuration = 600;

    		// Slide a div before the selected page will be displayed.
		$("pageswitcher").animate({ left: "0" }, slideDuration, function() 
	  	{
	  		// Hide all page classes.
	  		// Could be optimized by doing it once and storing the elements.
	  		$('*.page').hide();

	  		// Display the selected page.
		    	$(newPageName).show();

		    	// Slide the 'pageswitcher' away from the screen.
		    	$("pageswitcher").animate({ left: "-100%" }, slideDuration, function()
	    		{
	    			// Set the 'pageswitcher' back to the begin position.
	    			$("pageswitcher").css("left", "100%");
	    		});
	  	});
	});

	$('ul#projectsList li').click(function()
  	{
  		// The selected project item is already active.
  		if ($(this).hasClass("active")) return

  		// Stop the animation if one is currently playing.
  		$("projects").stop();

		// Remove 'active' and add it to the selected project item.
    		$('#projectsList li').removeClass("active");
    		$(this).addClass("active");

    		// Get the name of the page we should display.
    		const newProjectID = $(this).attr("data-id");
    		const differenceID = currentProjectID - newProjectID;
    		const percentageToSlide = differenceID * 100;
    		const slideDuration = 600;

    		// Slide a div before the selected page will be displayed.
		$("projects").animate({ top: percentageToSlide + "%" }, slideDuration, function() 
	  	{
  			console.log("shit");
  		});
  	});

  	$('ul.projectImagesList li').click(function()
  	{
  		// The selected project item is already active.
  		if ($(this).hasClass("active")) return
  		
  		// Get images element.
  		$imagesElement = $(this).parent().parent().find('images');

  		// Stop the animation if one is currently playing.
  		$imagesElement.stop();

		// Remove 'active' and add it to the selected project item.
    		$(this).addClass('active').siblings().removeClass('active');

    		// Get the name of the page we should display.
    		const newProjectID = $(this).attr("data-id");
    		const percentageToSlide = newProjectID * -100;
    		const slideDuration = 600;

    		// Slide a div before the selected page will be displayed.
		$imagesElement.animate({ top: percentageToSlide + "%" }, slideDuration, function() { });
  	});

  	$('.jobDetails').click(function()
  	{
  		$clickedJob = this;

  		$(".jobDetails").each(function()
  		{
  			if ($clickedJob != this)
  			{
				$(this).prop("checked", false);
			}
	    	});
  	});


  	function hex_initial_animation() {
		$(".hex-wrap,.hover-notify").velocity("transition.expandIn", { stagger: 150 });
		$(".hex-wrap").velocity("callout.pulse");
		$(".hoverblock").velocity("fadeOut", { delay: 3000, duration: 0 });
	}
	hex_initial_animation();

	var hoverdetect = setInterval(function(){ hovernotify() }, 3000);
	function hovernotify() {
	    	$(".hover-notify").velocity("callout.tada");
	}
	function myStopFunction() {
		$(".hover-notify").velocity('stop', true).velocity("fadeOut");
	    	clearInterval(hoverdetect);
	}

	$(".hex-init").mouseenter(function () 
	{
		myStopFunction();

		var title_color =  $(this).parent().attr("data-color");
		var title_name = $(this).parent().attr("data-title");
		var desc_name = $(this).parent().attr("data-content");

			function hex_description() {
				$('.code-description').velocity('stop', true).velocity("transition.slideRightBigIn");
				$('.' + desc_name).siblings().removeClass('desc-active');
					setTimeout(function() {
						$('.' + desc_name).addClass('desc-active');
						$('.code-descriptopn > div, .desc-active').children().velocity('stop', true).velocity("transition.slideRightBigIn", { stagger: 300 });
						$('.code-title, .desc-active span').velocity({color: title_color}, { queue: false });
						$('.code-title').text(title_name)
					}, 0);
		    }
		    hex_description();

			$(this).parent().addClass('hexactive'); 
			$('.hexactive').velocity({scaleX:"1.1",scaleY:"1.1"}, { duration: 200 });

	}).mouseleave(function () {
		 $('.hexactive').velocity('stop', true).velocity('reverse').removeClass('hexactive');
	});
});