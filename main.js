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

    var rayTracerJSON = {"WindowDimension":{"Width":800,"Height":750},"CameraPosition":{"X":0,"Y":-450,"Z":-1000},"Depth":3,"Multithreading":{"Threads":4,"TotalTasks":150},"Shapes":[{"Type":"Plane","Normal":{"X":0,"Y":1,"Z":0},"Position":{"X":0,"Y":0,"Z":0},"Material":{"Type":"Phong","Color":{"R":0.7,"G":0.7,"B":0.7},"Diffuse":0.8,"Specular":1,"Shininess":64}},{"Type":"Sphere","Radius":50,"Position":{"X":0,"Y":-50,"Z":0},"Material":{"Type":"Reflective","Color":{"R":0.7,"G":0.7,"B":0.7},"Diffuse":1,"Specular":0.6,"Shininess":128,"Reflective":0.2}}],"Lights":[{"Type":"Ambient","Color":{"R":1,"G":1,"B":1},"Intensity":0.2,"Sampler":{"Sets":30,"Samples":30}},{"Type":"Area","Color":{"R":1,"G":1,"B":1},"Position":{"X":200,"Y":-550,"Z":-55},"Scale":{"X":40,"Y":40,"Z":40},"Attenuation":{"Constant":1,"Linear":0.00014,"Quadratic":7e-7},"Intensity":1,"Sampler":{"Sets":30,"Samples":30}}],"GenerateSphereSurroundedScene":{"TotalCircles":13,"TotalShapesPerCircle":11,"OffsetFromSphere":180,"OffsetRadiusX":80,"OffsetRadiusZ":100,"StartPosition":{"X":0,"Y":-55,"Z":0},"Scale":{"MinX":60,"MaxX":80,"MinY":95,"MaxY":135,"MinZ":60,"MaxZ":80},"Rotation":{"MinX":-0.5,"MaxX":0.5,"MinY":-0.6,"MaxY":0.4,"MinZ":-0.3,"MaxZ":0.7},"Material":{"Type":"Matte","Color":{"MinR":0.1,"MaxR":0.6,"MinG":0.1,"MaxG":0.6,"MinB":0.01,"MaxB":0.8},"Diffuse":0.8}},"BackgroundColor":{"R":0.49,"G":0.49,"B":0.49}};
    document.getElementById('rayTracerJSON').innerHTML = prettyPrint(rayTracerJSON);
    document.getElementById('rayTracerJSONBig').innerHTML = prettyPrint(rayTracerJSON);
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

/**
 * Pretty Print JSON Objects.
 * Inspired by http://jsfiddle.net/unLSJ/
 *
 * @return {string}    html string of the formatted JS object
 * @example:  var obj = {"foo":"bar"};  prettyPrint(obj);
 */
function prettyPrint(value)
{
    var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
    var replacer = function(match, pIndent, pKey, pVal, pEnd) {
        var key = '<span class="json-key" style="color: brown">',
            val = '<span class="json-value" style="color: navy">',
            str = '<span class="json-string" style="color: olive">',
            r = pIndent || '';
        if (pKey)
            r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
        if (pVal)
            r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
        return r + (pEnd || '');
    };

    return JSON.stringify(value, null, 3)
               .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
               .replace(/</g, '&lt;').replace(/>/g, '&gt;')
               .replace(jsonLine, replacer);
}
