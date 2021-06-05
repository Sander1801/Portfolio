var currentPage = "projects";

$(document).ready(function()
{
  var blackMenuColor = false;

  const navLinks = document.querySelectorAll('.nav-item')
  const menuToggle = document.getElementById('navbarSupportedContent')
  const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false })
  navLinks.forEach((l) => 
  {
      l.addEventListener('click', () => 
      { 
        const width = $(window).width();

        if (width < 992)
        {
          bsCollapse.toggle(); 
        }
      })
  })

  SetProjectsLayout();

  $(window).on('resize', function()
  {
    SetProjectsLayout();
  });

  $(".navbar-toggler").click(function()
  {
    if ($(this).hasClass("collapsed") && blackMenuColor) 
    {
      $(".nav-link").css("color", "white");
    }
    else if (!$(this).hasClass("collapsed") && blackMenuColor) 
    {
      setTimeout(
        function() 
        {
          $(".nav-link").css("color", "black");
        }, 
        1500
      );
    }
  });

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
		currentPage = $(this).attr("data-page");
		const slideDuration = 600;

		// Slide a div before the selected page will be displayed.
	  $("pageswitcher").animate({ left: "0" }, slideDuration, function() 
  	{
  		// Hide all page classes.
  		// Could be optimized by doing it once and storing the elements.
  		$('*.page').hide();

  		// Display the selected page.
	    $(currentPage).show();

	    // Slide the 'pageswitcher' away from the screen.
	    $("pageswitcher").animate({ left: "-100%" }, slideDuration, function()
    	{
    		// Set the 'pageswitcher' back to the begin position.
    		$("pageswitcher").css("left", "100%");

        if (currentPage == "about")
        {
          $(".skillsetOpenBar").css("animation", "skillsetButtonAnimation 3s");
        }
    	});
  	});

  	setTimeout(function()
  	{ 
      const win = $(this);

	  	if (currentPage == "projects" && win.width() >= 992) 
	  	{
	    	$('verticalLineLeft').show();
	    	$('verticalLineRight').show();
			}
			else
			{
				$('verticalLineLeft').hide();
				$('verticalLineRight').hide();
			}

			if (currentPage == "jobs" || currentPage == "certificates") 
	  	{
	  		$(".titleName").css("color", "black");
	  		$(".nav-link").css("color", "black");
        $(".navbar-toggler").css("border-color", "black");
        $(".navbar-toggler-icon").addClass("navbar-toggler-icon-black");
        $(".navbar-toggler-icon").removeClass("navbar-toggler-icon-white");

	  		$(".jobRow").trigger("focus");
        blackMenuColor = true;
	  	}
	  	else
	  	{
	  		$(".titleName").css("color", "white");
	  		$(".nav-link").css("color", "white");
        $(".navbar-toggler").css("border-color", "white");
        $(".navbar-toggler-icon").removeClass("navbar-toggler-icon-black");
        $(".navbar-toggler-icon").addClass("navbar-toggler-icon-white");
	  	}
  	}, slideDuration / 1);
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
  		const differenceID = -newProjectID;
  		const percentageToSlide = differenceID * 100;
  		const slideDuration = 600;

    		// Slide a div before the selected page will be displayed.
		  $("projects").animate({ top: percentageToSlide + "%" }, slideDuration, function() 
	  	{});
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

  	var skillsetOpen = false;

  	$('.skillsetOpenBar').click(function()
  	{
  		if (skillsetOpen) skillsetOpen = false;
  		else skillsetOpen = true;

  		const slideDuration = 600;
      const width = $(window).width();

      var responsivePercentage;

      if (width > 1100)
      {
        responsivePercentage = "45%";
      }
      else if (width > 890)
      {
        responsivePercentage = "55%";
      }
      else if (width > 750)
      {
        responsivePercentage = "65%";
      }
      else if (width > 650)
      {
        responsivePercentage = "75%";
      }
      else
      {
        responsivePercentage = "82%";

        $('.skills .skill .skill-title').css("margin-top", "-2px");
        $('.skillset').css("height", "530px");
        $('.skillset').css("top", "calc(50% - 215px)");
        $('.skills-tools').css("width", "280px");
      }

  		$('.skillsetOpenBar').animate({ right: (skillsetOpen) ? responsivePercentage : "0%" }, slideDuration, function() { });
  	});
});

function SetProjectsLayout()
{
  const win = $(this);

  if (win.width() < 992) 
  {
    $(".projectsSmallScreen").show();
    $(".projectsBigScreen").hide();
    $("verticalLineLeft").hide();
    $("verticallineRight").hide();
  }
  else
  {
    $(".projectsSmallScreen").hide();
    $(".projectsBigScreen").show();

    if (currentPage == "projects")
    {
      $("verticalLineLeft").show();
      $("verticallineRight").show();
    }
  }
}