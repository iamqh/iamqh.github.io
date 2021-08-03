/**
 * Sets up Justified Gallery.
 */
if (!!$.prototype.justifiedGallery) {
  var options = {
    rowHeight: 140,
    margins: 4,
    lastRow: "justify"
  };
  $(".article-gallery").justifiedGallery(options);
}

$(document).ready(function() {

  /**
   * Shows the responsive navigation menu on mobile.
   */
  $("#header > #nav > ul > .icon").click(function() {
    $("#header > #nav > ul").toggleClass("responsive");
  });


  /**
   * Controls the different versions of  the menu in blog post articles 
   * for Desktop, tablet and mobile.
   */
  if ($(".post").length) {
    var menu = $("#menu");
    var nav = $("#menu > #nav");
    var menuIcon = $("#menu-icon, #menu-icon-tablet");

    /**
     * Display the menu on hi-res laptops and desktops.
     */
    if ($(document).width() >= 1440) {
      menu.css("visibility", "visible");
      menuIcon.addClass("active");
    }

    /**
     * Display the menu if the menu icon is clicked.
     */
    menuIcon.click(function() {
      if (menu.css("visibility") === "hidden") {
        menu.css("visibility", "visible");
        menuIcon.addClass("active");
      } else {
        menu.css("visibility", "hidden");
        menuIcon.removeClass("active");
      }
      return false;
    });

    /**
     * Add a scroll listener to the menu to hide/show the navigation links.
     */
    if (menu.length) {
      $(window).on("scroll", function() {
        var topDistance = menu.offset().top;

        // hide only the navigation links on desktop
        if (!nav.is(":visible") && topDistance < 50) {
          nav.show();
        } else if (nav.is(":visible") && topDistance > 100) {
          nav.hide();
        }

        // on tablet, hide the navigation icon as well and show a "scroll to top
        // icon" instead
        // if ( ! $( "#menu-icon" ).is(":visible") && topDistance < 50 ) {
        //   $("#menu-icon-tablet").show();
        //   $("#top-icon-tablet").hide();
        // } else if (! $( "#menu-icon" ).is(":visible") && topDistance > 100) {
        //   $("#menu-icon-tablet").hide();
        //   $("#top-icon-tablet").show();
        // }
      });
    }

    /**
     * Show mobile navigation menu after scrolling upwards,
     * hide it again after scrolling downwards.
     */
    if ($( "#footer-post").length) {
      var lastScrollTop = 0;
      $(window).on("scroll", function() {
        var topDistance = $(window).scrollTop();

        if (topDistance > lastScrollTop){
          // downscroll -> show menu
          $("#footer-post").hide();
        } else {
          // upscroll -> hide menu
          $("#footer-post").show();
        }
        lastScrollTop = topDistance;

        // close all submenu"s on scroll
        $("#nav-footer").hide();
        $("#toc-footer").hide();
        $("#share-footer").hide();

        // show a "navigation" icon when close to the top of the page, 
        // otherwise show a "scroll to the top" icon
        if (topDistance < 50) {
          $("#actions-footer > #top").hide();
          $('.scroll-top-wrapper').hide();
        } else if (topDistance > 100) {
          $("#actions-footer > #top").show();
          $('.scroll-top-wrapper').show();
        }
      });
    }
  }
});

function page_scroll2top() {
  $('html,body').animate({
    scrollTop: 0
  }, 'fast');
}

function detectColorScheme() {
  var theme = "light"; //default

  // get last used theme from local cache
  if(localStorage.getItem("theme")){
      if(localStorage.getItem("theme") === "dark"){
          theme = "dark";
      }
  } else if(!window.matchMedia) { 
      // matchMedia not supported  
      return false;
  } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // OS has set Dark Mode
      theme = "dark";
  }

  // set detected theme
  if (theme === "dark") {
      setThemeDark();
  } else {
      setThemeLight();
  }
}

const toggleTheme = document.querySelector('input#theme-switch[type="checkbox"]');

function setThemeDark() {
  localStorage.setItem('theme', 'dark');
  document.documentElement.setAttribute('data-theme', 'dark');
  toggleTheme.checked = true;
}
function setThemeLight() {
  localStorage.setItem('theme', 'light');
  document.documentElement.setAttribute('data-theme', 'light');
  toggleTheme.checked = false;
}

// Listener for theme change by toggle
toggleTheme.addEventListener('change', function(e) {
  if (e.target.checked) {
      setThemeDark();
  } else {
      setThemeLight();
  }
}, false);

// Listener for theme change by OS
var toggleOS = window.matchMedia('(prefers-color-scheme: dark)');
toggleOS.addEventListener('change', function (e) {
  if (e.matches) {
      setThemeDark();
  } else {
      setThemeLight();
  }
});

// call theme detection
detectColorScheme();