(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict

$(window).scroll(function ()
{
    var content_height = $(document).height();
    var content_scroll_pos = $(window).scrollTop();
    var percentage_value = content_scroll_pos * 100 / content_height;
    const scrollToTopButton = document.getElementById('js-top');

    console.log(content_height + ' vs ' + content_scroll_pos);
    if(percentage_value >= 50)
    {
        console.log("the scroll is about 80% down.");
        scrollToTopButton.className = "gotopbtn show";
      } else {
        scrollToTopButton.className = "gotopbtn hide";
      }
});

console.clear();

ScrollIndicator = (function(){
	
	var scrollIndicator,
			sections;
	
	function onSectionClick(e) {
		
		e.preventDefault();
		
		if (!/li|a/.test(e.target.nodeName.toLowerCase())) {
			return false;
		}
		
		ScrollIt(e.target);
		
	}
	
	function addEventListeners() {
		scrollIndicator.addEventListener('click', onSectionClick);
	}
	
	function update(val) {
		
		var winOffset = window.innerHeight * 0.25;
		
		for (var i = 0; i < sections.length; i++) {
			var activeTitle = sections[i].getAttribute('data-title'),
					activeSection = scrollIndicator.querySelector('[data-title=' + activeTitle + ']');

			if (val >= (sections[i].offsetTop - winOffset) && val < sections[i].offsetTop + (sections[i].clientHeight - winOffset)) {
				activeSection.className = 'active';
			} else {
				activeSection.removeAttribute('class');
			}
		}
		
	}
	
	function init() {
		
		scrollIndicator = document.getElementById('scroll-indicator');
		sections = document.querySelectorAll('section');
		
		var ul = document.createElement('ul');
		
		//build the scroll nav
		for (var i = 0; i < sections.length; i++) {
			
			var count = (i < 10 ? '0' : '') + (i + 1),
					section = sections[i],
					li = document.createElement('li'),
					a = document.createElement('a'),
					id = section.id;
			
			li.setAttribute('data-title', section.getAttribute('data-title'));
			
			a.innerHTML = count;
			a.href = '#' + id;
			
			li.appendChild(a);
			ul.appendChild(li);
		}
		
		scrollIndicator.appendChild(ul);
		
		addEventListeners();
	}
	
	document.addEventListener('DOMContentLoaded', init);
	
	return {
		update: update
	}
	
})();



GlobalScroll = (function() {
	var scrollPos;
	
	function getValue() {
		return scrollPos;
	}
	
	function scrollVal() {
		scrollPos = window.pageYOffset || document.body.scrollTop;
		ScrollIndicator.update(scrollPos);
		requestAnimationFrame(scrollVal);
	}
	
	document.addEventListener('DOMContentLoaded', scrollVal);
	
})();



ScrollIt = function(target, time) {
	
	var targetId = target.href.split('#')[1],
			end = document.getElementById(targetId).offsetTop,
			start = window.pageYOffset,
			duration = time || 1000,
			distance = end - start,
			timeStart = Date.now(),
			timeEnd = timeStart + duration,
			tick, cachedTick;
	
	//https://en.wikipedia.org/wiki/Smoothstep
	function step(startTime, endTime, point) {
		if (point <= startTime) { return 0; }
		if (point >= endTime) { return 1; }
		var x = (point - startTime) / (endTime - startTime);
		return x*x*x*(x*(x*6 - 15) + 10);
	}
	
  (function loop() {
	
		var now = Date.now(),
				tick = start + (distance * step(timeStart, timeEnd, now));
		
		window.scrollTo(0, Math.floor(tick));

		if (now <= timeEnd) {
			requestAnimationFrame(loop);
		}
		
  })();
  
}