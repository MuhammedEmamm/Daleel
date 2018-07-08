	/*$, $scope, $window*/
(function ($) {

	"use strict";


	/*------------------------------------------
	    = FUNCTIONS
	-------------------------------------------*/
	// Toggle mobile navigation
	function toggleMobileNavigation() {
		var navbar = $("#navbar");
		var navLinks = $("#navbar > ul > li > a:not(.dropdown-toggle)");
		var openBtn = $(".navbar-header .open-btn");
		var closeBtn = $("#navbar .close-navbar");

		openBtn.on("click", function () {
			if (!navbar.hasClass("slideInn")) {
				navbar.addClass("slideInn");
			}
			return false;
		});

		closeBtn.on("click", function () {
			if (navbar.hasClass("slideInn")) {
				navbar.removeClass("slideInn");
			}
			return false;
		});
	}

	toggleMobileNavigation();


	// Function for toggle small navigation class
	function ToggleMobileMenuClass() {
		var viportwidth = window.innerWidth;
		var navBar = $("#navbar > ul");

		if (viportwidth <= 991) {
			if (!navBar.hasClass("small-nav")) {
				navBar.addClass("small-nav");
			}
		} else {
			navBar.removeClass("small-nav");
		}
	}

	// Small navigation functionality
	function smallNavFunctionality() {
		if ($(".small-nav").length) {
			var smallNav = $(".small-nav"),
				subMenu = smallNav.find(".sub-menu"),
				subMenuLink = subMenu.find(" > a"),
				subSubMenu = smallNav.find(".sub-sub-menu"),
				subSubMenuLink = subSubMenu.find(" > a");

			subMenu.find("ul").hide();

			subMenuLink.on("click", function (e) {
				e.preventDefault();
				$(this).next().slideToggle();
				return false;
			});

			subSubMenuLink.on("click", function (e) {
				e.preventDefault();
				$(this).next().slideToggle();
				return false;
			});
		}
	}


	// Parallax background
	function bgParallax() {
		if ($(".parallax").length) {
			$(".parallax").each(function () {
				var height = $(this).position().top;
				var resize = height - $(window).scrollTop();
				var doParallax = -(resize / 5);
				var positionValue = doParallax + "px";
				var img = $(this).data("bg-image");

				$(this).css({
					backgroundImage: "url(" + img + ")",
					backgroundPosition: "50%" + positionValue,
					backgroundSize: "cover"
				});
			});
		}
	}


	// Hero slider background setting
	function sliderBgSetting() {
		if ($(".hero-slider .slide").length) {
			$(".hero-slider .slide").each(function () {
				var $this = $(this);
				var img = $this.children(img);
				var imgSrc = img.attr("src");

				$this.css({
					backgroundImage: "url(" + imgSrc + ")",
					backgroundSize: "cover",
					backgroundPosition: "center center"
				});
			});
		}
	}


	// set two coloumn height equial
	function setTwoColEqHeight($col1, $col2) {
		var firstCol = $col1,
			secondCol = $col2,
			firstColHeight = $col1.innerHeight(),
			secondColHeight = $col2.innerHeight();

		if (firstColHeight > secondColHeight) {
			secondCol.css({
				"height": firstColHeight + 1 + "px"
			});
		} else {
			firstCol.css({
				"height": secondColHeight + 1 + "px"
			});
		}
	}

	// toggle mini cart
	function toggleMiniCartBtn() {
		var miniCartBtn = $(".mini-cart-btn"),
			miniCart = $(".mini-cart");

		miniCart.hide();
		miniCartBtn.on("click", function (e) {
			e.preventDefault();
			miniCart.slideToggle();
			return false;
		});
	}

	if ($(".mini-cart-wrapper").length) {
		toggleMiniCartBtn();
	}


	/*------------------------------------------
	    = WOW ANIMATION SETTING
	-------------------------------------------*/
	var wow = new WOW({
		boxClass: 'wow', // default
		animateClass: 'animated', // default
		offset: 0, // default
		mobile: true, // default
		live: true // default
	});


	// Setting main hero slider
	function mainHeroSlider() {
		if ($(".hero-slider").length) {
			$(".hero-slider").owlCarousel({
				items: 1,
				autoplay: true,
				loop: true,
				mouseDrag: false,
				nav: true,
				navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
				autoplaySpeed: 700,
				navSpeed: 700,
				dotsSpeed: 700
			});
		}
	}


	/*------------------------------------------
	    = HIDE PRELOADER
	-------------------------------------------*/
	function preloader() {
		if ($('.preloader').length) {
			$('.preloader').delay(100).fadeOut(500, function () {
				//active wow
				wow.init();

				// active background image setting for hero slider
				sliderBgSetting();

				//Active heor slider
				mainHeroSlider();

				if ($(".home-style-four .hero-title").length) {
					var heroTitle = $(".home-style-four .hero-title");
					heroTitle.addClass("active-hero-title");
				}

				if ($(".home-style-five .main-banar .banar-title").length) {
					var heroTitle = $(".home-style-five .main-banar .banar-title");
					heroTitle.addClass("active-banar-title");
				}
			});
		}
	}


	/*------------------------------------------
	    = STICKY HEADER
	-------------------------------------------*/
	$(window).on("scroll", function () {
		var header = $("#header");
		var mainNavigation = $("#main-navigation");
		var scroll = $(window).scrollTop();
		var top = $(".top-bar").innerHeight();

		if ((scroll > top) && !header.hasClass("header-style-three")) {
			mainNavigation.addClass("sticky");
		} else {
			mainNavigation.removeClass("sticky");
		}
	});

	if ($(".header-style-three").length) {
		$(window).on("scroll", function () {
			var mainNavigation = $("#main-navigation");
			var scroll = $(window).scrollTop();
			var top = $(".topbar").innerHeight();

			if (scroll > top) {
				mainNavigation.addClass("sticky");
			} else {
				mainNavigation.removeClass("sticky");
			}
		});
	}


	/*------------------------------------------
	    = POPUP VIDEO
	-------------------------------------------*/
	if ($(".video-btn").length) {
		$(".video-btn").on("click", function () {
			$.fancybox({
				href: this.href,
				type: $(this).data("type"),
				'title': this.title,
				helpers: {
					title: {
						type: 'inside'
					},
					media: {}
				},

				beforeShow: function () {
					$(".fancybox-wrap").addClass("gallery-fancybox");
				}
			});
			return false;
		});
	}


	/*------------------------------------------
	    = POPULAR-CAMPAIGN METER
	-------------------------------------------*/
	function popularCampaignMeter() {
		if ($(".popular-campaign .meter").length) {
			var $meter = $('.meter');
			$meter.appear();
			$(document.body).on('appear', '.meter', function () {
				var current_item = $(this);
				if (!current_item.hasClass('appeared')) {
					current_item.addClass('appeared');
					$(".meter").circleProgress({
						size: 45,
						thickness: 2,
						fill: "#fff",
						animation: {
							duration: 2000
						}
					}).on('circle-animation-progress', function (event, progress, stepValue) {
						var $this = $(this);
						$this.find('span').html(Math.round(100 * stepValue) + '<i>%</i>');
					});
				}
			});
		}
	}

	popularCampaignMeter();


	/*------------------------------------------
	    = LATEST CAUSES PROGRESS BAR
	-------------------------------------------*/
	function causesProgressBar() {
		if ($(".progress-bar").length) {
			var $progress_bar = $('.progress-bar');
			$progress_bar.appear();
			$(document.body).on('appear', '.progress-bar', function () {
				var current_item = $(this);
				if (!current_item.hasClass('appeared')) {
					var percent = current_item.data('percent');
					current_item.append('<span>' + percent + '%' + '</span>').css('width', percent + '%').addClass('appeared');
				}

			});
		}
	}

	causesProgressBar();



	/*------------------------------------------
	    = EVENTS SLIDER
	-------------------------------------------*/
	if ($(".events-slider").length) {
		$(".events-slider").owlCarousel({
			autoplay: true,
			smartSpeed: 300,
			//items:5,
			loop: true,
			margin: 0,
			dots: false,
			center: true,
			autoplayHoverPause: true,
			nav: true,
			navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
			responsive: {
				0: {
					items: 2
				},

				600: {
					items: 3
				},

				991: {
					items: 3
				},

				992: {
					items: 5
				}
			}
		});
	}


	/*------------------------------------------
	    = LATEST NEWS SLIDER
	-------------------------------------------*/
	if ($(".latest-news-slider").length) {
		$(".latest-news-slider").owlCarousel({
			autoplay: true,
			smartSpeed: 300,
			items: 4,
			loop: true,
			responsive: {
				0: {
					items: 1
				},

				500: {
					items: 2
				},

				992: {
					items: 3
				},

				1200: {
					items: 4
				}
			}
		});
	}


	/*------------------------------------------
	    = URGENT SLIDER
	-------------------------------------------*/
	if ($(".urgent-slider").length) {
		$(".urgent-slider").owlCarousel({
			mouseDrag: false,
			smartSpeed: 300,
			items: 1,
			loop: true,
			margin: 0,
			center: true,
			autoplayHoverPause: true,
			nav: true,
			navText: ["<i class='fa fa-long-arrow-left'></i> PREV", "NEXT <i class='fa fa-long-arrow-right'></i>"]
		});
	}


	/*------------------------------------------
	    = FUNCTION FORM SORTING GALLERY
	-------------------------------------------*/
	function sortingGallery() {
		if ($(".sortable-gallery .gallery-filters").length) {
			var $container = $('.gallery-container');
			$container.isotope({
				filter: '*',
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			});

			$(".gallery-filters li a").on("click", function () {
				$('.gallery-filters li .current').removeClass('current');
				$(this).addClass('current');
				var selector = $(this).attr('data-filter');
				$container.isotope({
					filter: selector,
					animationOptions: {
						duration: 750,
						easing: 'linear',
						queue: false
					}
				});
				return false;
			});
		}
	}

	sortingGallery();


	/*------------------------------------------
	    = ACTIVE GALLERY POPUP IMAGE
	-------------------------------------------*/
	if ($(".popup-gallery").length) {
		$('.popup-gallery').magnificPopup({
			delegate: 'a',
			type: 'image',

			gallery: {
				enabled: true
			},

			zoom: {
				enabled: true,

				duration: 300,
				easing: 'ease-in-out',
				opener: function (openerElement) {
					return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});
	}


	/*------------------------------------------
	    = ACTIVE EVENT 3 COL FEATURED COUNTDOWN
	-------------------------------------------*/
	if ($("#countdown").length) {
		$('#countdown').ClassyCountdown({
			theme: "white",
			now: $.now() / 1000,
			end: '1493596800',

			// end: $.now() + 31556926 , 

			labelsOptions: {
				lang: {
					days: 'Days',
					hours: 'Hrs',
					minutes: 'Mins',
					seconds: 'Secs'
				}
			},

			// custom style for the countdown
			style: {
				element: '',
				labels: false,

				days: {
					gauge: {
						thickness: 0.03,
						bgColor: '#000',
						fgColor: '#fb5e1c',
						lineCap: 'butt'
					}
				},

				hours: {
					gauge: {
						thickness: 0.03,
						bgColor: '#000',
						fgColor: '#fb5e1c',
						lineCap: 'butt'
					}
				},

				minutes: {
					gauge: {
						thickness: 0.03,
						bgColor: '#000',
						fgColor: '#fb5e1c',
						lineCap: 'butt'
					}
				},

				seconds: {
					gauge: {
						thickness: 0.03,
						bgColor: '#000',
						fgColor: '#fb5e1c',
						lineCap: 'butt'
					}
				}
			}
		});
	}


	/*------------------------------------------
	    = SHOP DETAILS PRODUCT SLIDER
	-------------------------------------------*/
	if ($(".shop-single-slider-wrapper").length) {
		$('.slider-for').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			asNavFor: '.slider-nav'
		});
		$('.slider-nav').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			asNavFor: '.slider-for',
			focusOnSelect: true,
			prevArrow: '<i class="nav-btn nav-btn-lt fa fa-long-arrow-left"></i>',
			nextArrow: '<i class="nav-btn nav-btn-rt fa fa-long-arrow-right"></i>',

			responsive: [
				{
					breakpoint: 500,
					settings: {
						slidesToShow: 3,
						infinite: true
					}
                }
            ]

		});
	}


	/*------------------------------------------
	    = SHOP RANGE SLIDER
	-------------------------------------------*/
	if ($(".shop-page #range").length) {
		$(".shop-page #range").slider({
			min: 50,
			max: 1000,
			value: [85, 300],
			tooltip: "hide"
		});

		$(".shop-page #range").on("slide", function (v1) {
			$("#min-value").text("$" + v1.value[0]);
			$("#max-value").text("$" + v1.value[1]);
		});
	}


	/*------------------------------------------
	    = SHOP SINGLE PRODUCT QTY INPUT
	-------------------------------------------*/
	if ($("input[name='qty']").length) {
		$("input[name='qty']").TouchSpin();
	}


	/*------------------------------------------
	    = SHOP SINGLE UPSELL PRODUCT SLIDER
	-------------------------------------------*/
	if ($(".upsell-product-slider").length) {
		$(".upsell-product-slider").owlCarousel({
			smartSpeed: 300,
			items: 4,
			loop: true,
			responsive: {
				0: {
					items: 1
				},

				500: {
					items: 2
				},

				992: {
					items: 3
				},

				1200: {
					items: 4
				}
			}
		});
	}


	/*------------------------------------------
	    = ABOUT PAGE ACCRODIAN TOGGLE CALSS
	-------------------------------------------*/
	if ($(".about-us-st #accordion").length) {
		var panelHeading = $(".about-us-st #accordion .panel-heading > a");

		panelHeading.on("click", function () {
			var $this = $(this);
			if (!$this.closest(".panel").hasClass("current")) {
				$this.closest(".panel").addClass("current");
			} else {
				$this.closest(".panel").removeClass("current");
			}

			$this.closest(".panel").siblings().removeClass("current");
		});
	}


	/*------------------------------------------
	    = SPONSOR SLIDER
	-------------------------------------------*/
	if ($(".sponsor-slider").length) {
		$(".sponsor-slider").owlCarousel({
			smartSpeed: 300,
			loop: true,
			margin: 0,
			dots: false,
			center: true,
			autoplayHoverPause: true,
			nav: true,
			navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
			responsive: {
				0: {
					items: 1
				},

				450: {
					items: 3
				},

				650: {
					items: 5
				},

				992: {
					items: 3
				}
			}
		});
	}


	/*------------------------------------------
	    = HOME STYLE TWO URGENT DONATION METER
	-------------------------------------------*/
	if ($(".meter2").length) {
		var $meter = $('.meter2');
		$meter.appear();
		$(document.body).on('appear', '.meter2', function () {
			var current_item = $(this);
			if (!current_item.hasClass('appeared')) {
				current_item.addClass('appeared');
				$(".meter2").circleProgress({
					size: 200,
					thickness: 10,
					fill: "#fff",
					emptyFill: "transparent",
					lineCap: "round",
					animation: {
						duration: 2000
					}
				}).on('circle-animation-progress', function (event, progress, stepValue) {
					var $this = $(this);
					$this.find('span').html(Math.round(100 * stepValue) + '<i>%</i>');
				});
			}
		});
	}


	/*------------------------------------------
	    = HOME STYLE THREE PRODUCT SLIDER
	-------------------------------------------*/
	if ($(".latest-product-slider").length) {
		$(".latest-product-slider").owlCarousel({
			smartSpeed: 300,
			loop: true,
			responsive: {
				0: {
					items: 1
				},

				500: {
					items: 2
				},

				992: {
					items: 3
				},

				1200: {
					items: 4
				}
			}
		});
	}



	/*------------------------------------------
	    = EVENTS SLIDER
	-------------------------------------------*/
	if ($(".events-nearby-slider").length) {
		$(".events-nearby-slider").owlCarousel({
			autoplay: true,
			smartSpeed: 300,
			loop: true,
			autoplayHoverPause: true,
			responsive: {
				0: {
					items: 1
				},

				600: {
					items: 2
				},

				991: {
					items: 2
				},

				992: {
					items: 3
				}
			}
		});
	}


	/*------------------------------------------
	    = GOOGLE MAP
	-------------------------------------------*/
	function map() {

		var myLatLng = new google.maps.LatLng(30.085522, 31.325824);
		var mapProp = {
			center: myLatLng,
			zoom: 11,
			scrollwheel: false,
			mapTypeId: google.maps.MapTypeId.ROAD
		};

		var map = new google.maps.Map(document.getElementById("map"), mapProp);
		var marker = new google.maps.Marker({
			position: myLatLng,
			icon: 'images/map-marker.png'
		});

		marker.setMap(map);

		map.set('styles', [
			{
				"featureType": "administrative",
				"elementType": "all",
				"stylers": [
					{
						"saturation": "-100"
                        }
                    ]
                },
			{
				"featureType": "administrative.province",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "off"
                        }
                    ]
                },
			{
				"featureType": "landscape",
				"elementType": "all",
				"stylers": [
					{
						"saturation": -100
                        },
					{
						"lightness": 65
                        },
					{
						"visibility": "on"
                        }
                    ]
                },
			{
				"featureType": "poi",
				"elementType": "all",
				"stylers": [
					{
						"saturation": -100
                        },
					{
						"lightness": "50"
                        },
					{
						"visibility": "simplified"
                        }
                    ]
                },
			{
				"featureType": "road",
				"elementType": "all",
				"stylers": [
					{
						"saturation": "-100"
                        }
                    ]
                },
			{
				"featureType": "road.highway",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "simplified"
                        }
                    ]
                },
			{
				"featureType": "road.arterial",
				"elementType": "all",
				"stylers": [
					{
						"lightness": "30"
                        }
                    ]
                },
			{
				"featureType": "road.local",
				"elementType": "all",
				"stylers": [
					{
						"lightness": "40"
                        }
                    ]
                },
			{
				"featureType": "transit",
				"elementType": "all",
				"stylers": [
					{
						"saturation": -100
                        },
					{
						"visibility": "simplified"
                        }
                    ]
                },
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"hue": "#ffff00"
                        },
					{
						"lightness": -25
                        },
					{
						"saturation": -97
                        }
                    ]
                },
			{
				"featureType": "water",
				"elementType": "labels",
				"stylers": [
					{
						"lightness": -25
                        },
					{
						"saturation": -100
                        }
                    ]
                }
            ]);
	};


	/*------------------------------------------
	    = HOME STYLE THREE TOPBAR COUNTDOWN
	-------------------------------------------*/
	if ($("#clock").length) {
		$('#clock').countdown('2017/06/31', function (event) {
			var $this = $(this).html(event.strftime('' +
				'<div class="box"><div>%D</div> <span>Days</span> </div>' +
				'<div class="box"><div>%H</div> <span>Hours</span> </div>' +
				'<div class="box"><div>%M</div> <span>Mins</span> </div>' +
				'<div class="box"><div>%S</div> <span>Secs</span> </div>'));
		});
	}


	/*------------------------------------------
	    = CONTACT FORM SUBMISSION
	-------------------------------------------*/
	/*if ($("#contact-form").length) {
		$("#contact-form").validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				email: "required",

				subject: {
					required: true
				},

				message: {
					required: true
				}

			},

			messages: {
				name: "Please enter your name",
				email: "Please enter your email",
				subject: "What's the subject about contact?",
				message: "Type your message"
			},

			submitHandler: function (form) {
				$.ajax({
					type: "POST",
					url: "mail.php",
					data: $(form).serialize(),
					success: function () {
						$("#loader").hide();
						$("#success").slideDown("slow");
						setTimeout(function () {
							$("#success").slideUp("slow");
						}, 3000);
						form.reset();
					},
					error: function () {
						$("#loader").hide();
						$("#error").slideDown("slow");
						setTimeout(function () {
							$("#error").slideUp("slow");
						}, 3000);
					}
				});
				return false;
			}

		});
	}
*/

	/*------------------------------------------
	    = HOME STYLE TWO URGENT DONATION METER
	-------------------------------------------*/
	if ($(".meter3").length) {
		var $meter = $('.meter3');
		$meter.appear();
		$(document.body).on('appear', '.meter3', function () {
			var current_item = $(this);
			if (!current_item.hasClass('appeared')) {
				current_item.addClass('appeared');
				$(".meter3").circleProgress({
					size: 125,
					thickness: 7,
					fill: "#fff",
					emptyFill: "transparent",
					lineCap: "round",
					animation: {
						duration: 2000
					}
				}).on('circle-animation-progress', function (event, progress, stepValue) {
					var $this = $(this);
					$this.find('span').html(Math.round(100 * stepValue) + '<i>%</i>');
				});
			}
		});
	}


	/*------------------------------------------
	    = HOME STYLE FOUR EVENT COLCK
	-------------------------------------------*/
	if ($("#event-clock").length) {
		$('#event-clock').countdown('2017/06/31', function (event) {
			var $this = $(this).html(event.strftime('' +
				'<div class="box"><div>%D</div> <span>Days</span> </div>' +
				'<div class="box"><div>%H</div> <span>Hours</span> </div>' +
				'<div class="box"><div>%M</div> <span>Mins</span> </div>' +
				'<div class="box"><div>%S</div> <span>Secs</span> </div>'));
		});
	}


	/*------------------------------------------
	    = HOME STYLE FOUR CHART
	-------------------------------------------*/
	function raisedChart() {
		if ($(".raised-chart").length) {
			var $chart = $('.raised-chart');
			$chart.appear();
			$(document.body).on('appear', '.raised-chart', function () {
				var current_item = $(this);
				if (!current_item.hasClass('appeared')) {
					current_item.addClass('appeared');

					var ctx = $("#chart").get(0).getContext("2d");
					var myBarChart = new Chart(ctx, {
						type: 'bar',
						data: {
							labels: ["WATER", "FOOD", "SHELTER", "EDUCATION", "HEALTH"],
							datasets: [{
								backgroundColor: "#ff5c2e",
								fillColor: "#f20000",
								data: [65, 59, 80, 81, 95],
								borderWidth: 2,
								borderColor: "rgba(0,0,0, 0.1)"
                            }]
						},
						options: {
							maintainAspectRatio: false,
							legend: {
								display: false
							},
							title: {
								position: "top"
							},

							scales: {
								xAxes: [{
									gridLines: {
										display: false
									}
                                }],
								yAxes: [{
									gridLines: {
										display: false
									}
                                }]
							},
							animation: {
								duration: 2500,
							}


							// events: false,
							// tooltips: {
							//     enabled: false
							// },
							// hover: {
							//     animationDuration: 0
							// },
							// animation: {
							//     duration: 2500,
							//     onComplete: function () {
							//         var chartInstance = this.chart,
							//         ctx = chartInstance.ctx;
							//         ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
							//         ctx.textAlign = 'center';
							//         ctx.textBaseline = 'bottom';

							//         this.data.datasets.forEach(function (dataset, i) {
							//             var meta = chartInstance.controller.getDatasetMeta(i);
							//             meta.data.forEach(function (bar, index) {
							//                 var data = dataset.data[index];                            
							//                 ctx.fillText(data, bar._model.x, bar._model.y);
							//             });
							//         });
							//     }
							// }
						}

					});
				}
			});
		};
	}

	raisedChart();



	/*------------------------------------------
	    = FUNFACT
	-------------------------------------------*/
	if ($(".fun-fact").length) {
		$('.counter').appear();
		$(document.body).on('appear', '.counter', function (e) {
			var $this = $(this),
				countTo = $this.attr('data-count');

			$({
				countNum: $this.text()
			}).animate({
				countNum: countTo
			}, {
				duration: 3000,
				easing: 'linear',
				step: function () {
					$this.text(Math.floor(this.countNum));
				},
				complete: function () {
					$this.text(this.countNum);
				}
			});
		});
	}


	/*------------------------------------------
	    = TESTIMONIAL SLIDER
	-------------------------------------------*/
	if ($(".testimonials-slider").length) {
		$(".testimonials-slider").owlCarousel({
			autoplay: true,
			smartSpeed: 300,
			items: 2,
			loop: true,
			autoplayHoverPause: true,
			margin: 30,
			mouseDrag: false,
			responsive: {
				0: {
					items: 1
				},

				991: {
					items: 1
				},

				992: {
					items: 2
				}
			}
		});
	}


	/*------------------------------------------
	    = PARTNER SLIDER
	-------------------------------------------*/
	if ($(".partner-slider").length) {
		$(".partner-slider").owlCarousel({
			autoplay: true,
			smartSpeed: 300,
			items: 4,
			loop: true,
			autoplayHoverPause: true,
			mouseDrag: false,
			dots: false,
			nav: true,
			navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
			responsive: {
				0: {
					items: 1
				},

				400: {
					items: 2
				},

				600: {
					items: 3
				},

				992: {
					items: 4
				}
			}
		});
	}


	/*-------------------------------------------------------
	    = HOME STYLE FIVE URGENT CAUSES CLOCK, PROGRESS ETC
	-------------------------------------------------------*/
	if ($("#causes-end-time").length) {
		$('#causes-end-time').countdown('2017/04/31', function (event) {
			var $this = $(this).html(event.strftime('' +
				'<div class="box"><div>%D</div> <span>Days</span> </div>' +
				'<div class="box"><div>%H</div> <span>Hours</span> </div>' +
				'<div class="box"><div>%M</div> <span>Mins</span> </div>' +
				'<div class="box"><div>%S</div> <span>Secs</span> </div>'));
		});
	}

	function urgentCausesProgressBar() {
		if ($(".urgent-causes .progress-bar").length) {
			var progressBar = $(".urgent-causes .progress-bar");
			var percent = progressBar.data('percent');
			progressBar.css('width', percent + '%');

		};
	}


	// Toggle urgent causes section
	if ($(".urgent-causes-wrapper").length) {
		var urgentCauses = $(".urgent-causes-wrapper .urgent-causes");
		var urgentCausesOpnBtn = $(".urgent-causes-wrapper #toggle-causes");

		urgentCauses.hide();

		urgentCausesOpnBtn.on("click", function () {
			urgentCauses.slideToggle();
			urgentCausesProgressBar();
			urgentCausesOpnBtn.toggleClass("open");
			return false;
		})
	}


	/*------------------------------------------
	    = PARTNER SLIDER
	-------------------------------------------*/
	if ($(".event-s2-slider").length) {
		$(".event-s2-slider").owlCarousel({
			items: 2,
			loop: true,
			autoplayHoverPause: true,
			mouseDrag: false,
			responsive: {
				0: {
					items: 1
				},

				551: {
					items: 2
				}
			}
		});
	}


	/*------------------------------------------------------
	    = GOOGLE MAP FOR HOME STYLE FIVE ABOUT AREA
	----------------------------------------------------*/
	if ($(".map-link").length) {
		$('.map-link').magnificPopup({
			type: 'iframe'
		});
	}


	/*----------------------------------------------------
	    = HOME STYLE FIVE ABOUT ACCRODIAN TOGGLE CALSS
	--------------------------------------------------------*/
	if ($(".about-st3 #accordion").length) {
		var panelHeading = $(".about-st3 #accordion .panel-heading > a");

		panelHeading.on("click", function () {
			var $this = $(this);
			if (!$this.closest(".panel").hasClass("current")) {
				$this.closest(".panel").addClass("current");
			} else {
				$this.closest(".panel").removeClass("current");
			}

			$this.closest(".panel").siblings().removeClass("current");
		});
	}


	/*------------------------------------------
	    = MASONRY GALLERY SETTING
	-------------------------------------------*/
	function masonryGridSetting() {
		if ($('.masonry-gallery').length) {
			var $grid = $('.masonry-gallery').masonry({
				itemSelector: '.box',
				columnWidth: '.box',
				percentPosition: true
			});

			$grid.imagesLoaded().progress(function () {
				$grid.masonry('layout');
			});
		}
	}

	masonryGridSetting();



	/*==========================================================================
	    WHEN DOCUMENT LOADING 
	==========================================================================*/
	$(window).on('load', function () {

		preloader();

		ToggleMobileMenuClass();

		smallNavFunctionality();

		sliderBgSetting();

		bgParallax();

		popularCampaignMeter();

		causesProgressBar();

		sortingGallery();

		masonryGridSetting();

		// call map funciton
		if ($(".map").length) {
			map();
		}

		// set cta-2 two col equial
		if ($(".cta-2").length) {
			setTwoColEqHeight($(".cta-2 .join-us"), $(".cta-2 .sing-up"));
		}

		// set newsletter two col equial
		if ($(".newsletter").length) {
			setTwoColEqHeight($(".newsletter .children-holder"), $(".newsletter .subscribe"));
		}

		// set cancer text featured two col equal height
		if ($(".event-3col .featured").length) {
			setTwoColEqHeight($(".event-3col .featured .featured-promo"), $(".event-3col .featured .countdown-wrapper"));
		}

		// set sponsor row two colounm equal height
		if ($(".sponsor").length) {
			setTwoColEqHeight($(".sponsor .left-col"), $(".sponsor .right-col"));
		}

		// home style 4 about-st2 two col equal height
		if ($(".about-st2").length) {
			setTwoColEqHeight($(".about-st2 .left-col"), $(".about-st2 .right-col"));
		}
	});


	/*==========================================================================
	    WHEN WINDOW SCROLL
	==========================================================================*/
	$(window).on("scroll", function () {
		bgParallax();
	});


	/*==========================================================================
	    WHEN WINDOW RESIZE
	==========================================================================*/
	$(window).on("resize", function () {

		// set cta-2 two col equial
		if ($(".cta-2").length) {
			setTwoColEqHeight($(".cta-2 .join-us"), $(".cta-2 .sing-up"));
		}

		// set newsletter two col equial
		if ($(".newsletter").length) {
			setTwoColEqHeight($(".newsletter .children-holder"), $(".newsletter .subscribe"));
		}

		// set sponsor row tow colounm equal height
		if ($(".sponsor").length) {
			setTwoColEqHeight($(".sponsor .left-col"), $(".sponsor .right-col"));
		}

		// home style 4 about-st2 two col equal height
		if ($(".about-st2").length) {
			setTwoColEqHeight($(".about-st2 .left-col"), $(".about-st2 .right-col"));
		}
	});


})(window.jQuery);

var myapp = angular.module('MainApp', ["ngRoute", "ngSanitize", "ngMaterial", "ngMessages", "ngAnimate", "ngMap"]);
myapp.config(["$routeProvider","$locationProvider", function ($routeProvider, $locationProvider) {
	"use strict";
    $locationProvider.hashPrefix("");
//    $locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {
			templateUrl: "Home.html",
			controller : "Homectrl"
		})
		.when('/about', {
			templateUrl: "about.html",
			controller: "aboutCtrl"
		})
		.when('/cases', {
			templateUrl: "causes-list.html",
			controller: "causesCtrl"
		})
		.when('/cases/program/:ProgramID', {
			templateUrl: "causes-list.html",
			controller: "causesCtrl"
		})
	
		.when('/cases/keyword/:keywSearch/type/:typCaseSearch/org/:organSearch/area/:areaSearch', {
			templateUrl: "causes-list.html",
			controller: "causesCtrl"
		})
        .when('/case-details', {
			templateUrl: "causes-single.html",
			controller: "causesSingleCtrl"
		})
        .when('/case-details/:caseid', {
			templateUrl: "causes-single.html",
			controller: "causesSingleCtrl"
		})
		.when('/contact', {
			templateUrl: "contact.html",
			controller: "contactCtrl"
		})
		.when('/CSR', {
			templateUrl: "CSR.html",
			controller: "CSRctrl"
		})
		.when('/Events', {
			templateUrl: "Events.html",
			controller: "Eventsctrl"
		})
		.when('/programs', {
			templateUrl: "Program.html",
			controller: "Proctrl"
		})
		.when('/join-us', {
			templateUrl: "join us.html",
			controller:"join-usCtrl"
		})
		.when('/gallery', {
			templateUrl: "gallery.html",
            controller: "galleryCtrl"
		})
		.when('/EventsDetails', {
			templateUrl: "Event-details.html",
            controller: "eventDetailsCtrl"
		})
        .when('/EventsDetails/:eventById', {
			templateUrl: "Event-details.html",
            controller: "eventDetailsCtrl"
		})
		.when('/info', {
			templateUrl: "info.html",
			controller: "Infoctrl"
		})
        .when('/BloodBank', {
			templateUrl: "BloodBank.html",
			controller: "Infoctrl"
		})
		.when('/SeasonalProjects',{
			templateUrl:"SeasonalProjects.html",
			controller:"SeasonProjCtrl"
		})
		.when('/Organizations',{
			templateUrl:'Organizations.html' , 
			controller :'OrgsCtrl'
		})
		.otherwise({
			templateUrl: "error-404.html"
		});


}]);

var caseid;
//var eventById;

myapp.directive("owlCarousel", function () {
       return {
           restrict: 'E',
           transclude: false,
           link: function ($scope) {
               $scope.initCarousel = function (element) {
                   // provide any default options you want
                   var defaultOptions = {
                       autoplay: true,
                       autoplayHoverPause: true,
                       nav: true,
                       navText: ["<i class='fa fa-angle-left' aria-hidden='true'></i>", "<i class='fa fa-angle-right' aria-hidden='true'></i>"]

                   };
                   var customOptions = $scope.$eval($(element).attr('data-options'));
                   // combine the two options objects
                   for (var key in customOptions) {
                       defaultOptions[key] = customOptions[key];
                   }
                   // init carousel
                   $(element).owlCarousel(defaultOptions);
               };
           }
       };
   });
myapp.directive('owlCarouselItem', [function () {
       return {
           restrict: 'A',
           transclude: false,
           link: function ($scope, element) {
               // wait for the last item in the ng-repeat then call init
               if ($scope.$last) {
                   $scope.initCarousel(element.parent());
               }
           }
       };
   }]);

//Main index Controller
myapp.controller('Mainctrl', ['$scope', '$http', function ($scope, $http, NgMap) {
    window.scrollTo(0,0);
	
//	setInterval(function(){
//		console.clear() ;
//	} , 5000) ; 
//	
	
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/About/GetCharityInfo",
		headers: "content-type : application/json",
		data: {
			Lang: "ar"
		}
	}).then(function (response) {
				$scope.charityContact = response.data.Response;
			//($scope.charityContact);
		});
	$http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Sponsor/GetSponsor",
		headers: "content-type : application/json",
		data: {
			"Lang": "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.spons = response.data.Response;
			//($scope.spons);
		},
		function (response) {
			//("Error from server");
		});
    $scope.subsButton = function () {
        $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/User/Subscribe",
		headers: "content-type : application/json",
		data: {
			"Email": $scope.subsEmail
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.subsRes = response.data.Response;
			//($scope.subsRes);
		},
		function (response) {
			//("Error from server");
		});
        //($scope.subsEmail);
    };
        
}]);
//Map Service
/*myapp.service('Map', function($q) {
    
    this.init = function() {
        var options = {
            center: new google.maps.LatLng(30.044420, 31.235712),
            zoom: 13,
            disableDefaultUI: true    
        }
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
        this.places = new google.maps.places.PlacesService(this.map);
    }
    
    this.search = function(str) {
        var d = $q.defer();
        this.places.textSearch({query: str}, function(results, status) {
            if (status == 'OK') {
                d.resolve(results[0]);
            }
            else d.reject(status);
        });
        return d.promise;
    }
    
    this.addMarker = function(res) {
        if(this.marker) this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            map: this.map,
            position: res.geometry.location,
            animation: google.maps.Animation.DROP
        });
        this.map.setCenter(res.geometry.location);
    }
    
});
*/
//Home controller
myapp.controller('Homectrl' , ['$scope' , '$http', '$rootScope' , function($scope , $http, $window, $rootScope){
	
setTimeout(function(){ window.scrollTo(0, 0); }, 80);
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Region/GetGovernorate",
		headers: "content-type : application/json",
		data: {
			"Lang": "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.govs = response.data.Response;
			//($scope.govs);
		},
		function (response) {
			//("Error from server");
		
		});
	$scope.getregs = function(x){
			//(x) ; 
				$http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Region/GetRegions",
		headers: "content-type : application/json",
		data: {
			"GovernorateID":x,
			"Lang": "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.regs = response.data.Response;
			//($scope.regs);
		},
		function (response) {
			//("Error from server");
		});
		};

$http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Case/GetUrgentCases",
		headers: "content-type : application/json",
		data: {
			"Lang": "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.ucases = response.data.Response;
			//($scope.ucases);
		},
		function (response) {
			//("Error from server");
		});
	
	
	$scope.getCausesId = function (x) {
		//CaseId = x;
		//(x);
		caseid = x;
	};
    
	$http({
		method: 'POST',
		url: 'http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Category/GetCategory',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			Lang: 'ar'
		}
	}).then(function (response) {
		$scope.category = response.data.Response;
		//($scope.category);
	});
    
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Organization/GetOrganizationsName",
		headers: "content-type : application/json",
		data: {
			Lang: "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.orgns = response.data.Response;
            $scope.organizationCounter = $scope.orgns.length;
            
			//($scope.orgns);
		},
		function (response) {
			//("Error from server");
		});
    $http({
		method: 'POST',
		url: 'http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Case/GetRecentCases',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			Lang: 'ar'
		}
	}).then(function (response) {
		//(response.data);
		$scope.Result = response.data.Response;
        
        
	});
    $http({
		method: 'POST',
		url: 'http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Case/GetCases',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			Lang: 'ar'
		}
	}).then(function (response) {
        $scope.allCases = response.data.Response;
        $scope.casesCounter = $scope.allCases.length;
        //(casesCounter);
        
	});
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/BloodBank/GetBloodBanks",
		headers: "content-type : application/json",
		data: {
			"Lang": "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.bloodbanks = response.data.Response;
            $scope.bloodBanksCounter = $scope.bloodbanks.length;
            
			
		},
		function (response) {
			//("Error from server");
		});
        
   
//Search Map controller     
    /*$scope.place = {};
    $scope.search = function() {
        $scope.apiError = false;
        Map.search($scope.searchPlace)
        .then(
            function(res) { // success
                Map.addMarker(res);
                $scope.place.name = res.name;
                $scope.place.lat = res.geometry.location.lat();
                $scope.place.lng = res.geometry.location.lng();
            },
            function(status) { // error
                $scope.apiError = true;
                $scope.apiStatus = status;
            }
        );
    };
    Map.init();*/
    // Main Filter 
    
    //$scope.path = ["keyword/{{keywSearch}}", "/type/{{typCaseSearch}}", "/org/{{organSearch}}", "/area/{{areaSearch}}"];
    //$scope.path = $scope.path.filter(function (i) { return i !== null });
//    $scope.visitcause = function() {
//       
//    }
    
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Event/GetEventGallerys",
		headers: "content-type : application/json",
		
	}).then(function (response) {
				$scope.gall = response.data.Response;
			//($scope.gall);
		});
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/About/GetCharityInfo",
		headers: "content-type : application/json",
		data: {
			Lang: "ar"
		}
	}).then(function (response) {
				$scope.charityContact = response.data.Response;
			//($scope.charityContact);
		});
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Organization/GetOrganizations",
		headers: "content-type : application/json",
		data: {
			"Lang": "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.organization = response.data.Response;
			//($scope.organization);
		},
		function (response) {
			//("Error from server");
		});
    
        $scope.lat = 30.044420;
        $scope.long = 31.235712;
        
    
    $scope.selectRegion = function () {
        $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Organization/GetOrganizationsByRegion",
		headers: "content-type : application/json",
		data: {
			Lang: "ar",
            RegionID: $scope.regions
		}
	}).then(function (response) {
            $scope.orgByRegion = response.data.Response;
			//($scope.orgByRegion);
            //($scope.regions);
            
            
		});
        $scope.long = $scope.searchPlace;
        $scope.lat = $scope.searchPlace;
        $scope.places = $scope.orgByRegion;
        NgMap.getMap().then(function(map) {
            var cx = map.getCenter();
            $scope.map = map;
            });
        };
    $scope.search = function () {
            
        $scope.long = $scope.searchPlace.Longitude;
        $scope.lat = $scope.searchPlace.Latitude;
        $scope.places = $scope.orgByRegion;
        NgMap.getMap().then(function(map) {
            var cx = map.getCenter();
            $scope.map = map;
        });
    
        //definePopupClass();
        //($scope.searchPlace);
        //($scope.lat);
        //($scope.long);
        
    }
    
    
}]) ; 
// Map Controller
myapp.controller('newPlaceCtrl', function($scope, $http, NgMap) {
    
    
    window.scrollTo(0, 0);
    /*
    $scope.place = {};
    
    $scope.search = function() {
        $scope.apiError = false;
        Map.search($scope.searchPlace)
        .then(
            function(res) { // success
                Map.addMarker(res);
                $scope.place.name = res.name;
                $scope.place.lat = res.geometry.location.lat($scope.searchPlace.Latitude);
                $scope.place.lng = res.geometry.location.lng($scope.searchPlace.Longitude);
            },
            function(status) { // error
                $scope.apiError = true;
                $scope.apiStatus = status;
            }
        );
    }
    Map.init();*/
    
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Organization/GetOrganizations",
		headers: "content-type : application/json",
		data: {
			"Lang": "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.organization = response.data.Response;
			//($scope.organization);
		},
		function (response) {
			//("Error from server");
		});
    
        $scope.lat = 30.044420,
        $scope.long = 31.235712
        
    
    $scope.selectRegion = function () {
        
        $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Organization/GetOrganizationsByRegion",
		headers: "content-type : application/json",
		data: {
			Lang: "ar",
            RegionID: $scope.regions
		}
	}).then(function (response) {
            $scope.orgByRegion = response.data.Response;
			//($scope.orgByRegion);
            //($scope.regions);
            
            
		});
        $scope.long = $scope.searchPlace;
        $scope.lat = $scope.searchPlace;
        $scope.places = $scope.orgByRegion;
        NgMap.getMap().then(function(map) {
            var cx = map.getCenter();
            $scope.map = map;
            });
        };
    $scope.search = function () {
            
        $scope.long = $scope.searchPlace.Longitude;
        $scope.lat = $scope.searchPlace.Latitude;
        $scope.places = $scope.orgByRegion;
        NgMap.getMap().then(function(map) {
            var cx = map.getCenter();
            $scope.map = map;
        });
    
        //definePopupClass();
        //($scope.searchPlace);
        //($scope.lat);
        //($scope.long);
        
    }
           
       
});
//CSR Controller
myapp.controller('CSRctrl', ['$scope', '$http', function ($scope, $http, $rootScope) {
	window.scrollTo(0, 0);	
    
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/CSR/GetCSRs",
		headers: "content-type : application/json",
		data: {
			"Lang": "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.CSR = response.data.Response;
			//($scope.CSR);
		},
		function (response) {
			//("Error from server");
		});
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/About/GetCharityInfo",
		headers: "content-type : application/json",
		data: {
			Lang: "ar"
		}
	}).then(function (response) {
				$scope.charityContact = response.data.Response;
			//($scope.charityContact);
		});

}]);
//Programs Controller 
myapp.controller('Proctrl', ['$scope', '$http', function ($scope, $http) {
	window.scrollTo(0, 0);	
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/OurProgram/GetOurProgram",
		headers: "content-type : application/json",
		data: {
			"Lang": "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.progs = response.data.Response;
			//($scope.progs);
		},
		function (response) {
			//("Error from server");
		});
    
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/About/GetCharityInfo",
		headers: "content-type : application/json",
		data: {
			Lang: "ar"
		}
	}).then(function (response) {
				$scope.charityContact = response.data.Response;
			//($scope.charityContact);
		});
    
    
}]);
//events controller
myapp.controller('Eventsctrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {


	window.scrollTo(0, 0);
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Region/GetGovernorate",
		headers: "content-type : application/json",
		data: {
			"Lang": "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.govs = response.data.Response;
			//($scope.govs);
		},
		function (response) {
			//("Error from server");
		
		});
	$scope.getregs = function(x){
			//(x) ; 
				$http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Region/GetRegions",
		headers: "content-type : application/json",
		data: {
			"GovernorateID":x,
			"Lang": "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.regs = response.data.Response;
			//($scope.regs);
		},
		function (response) {
			//("Error from server");
		});
		};

$http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Case/GetUrgentCases",
		headers: "content-type : application/json",
		data: {
			"Lang": "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.ucases = response.data.Response;
			//($scope.ucases);
		},
		function (response) {
			//("Error from server");
		});
	

	$http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Category/GetCategory",
		headers: "content-type : application/json",
		data: {
			"Lang": "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.cases = response.data.Response;
			//($scope.cases);
		},
		function (response) {
			//("Error from server");
		})
	$scope.getEventsId = function (xId) {

		//(xId);
		eventById = xId;
	};
	$http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Organization/GetOrganizationsName",
		headers: "content-type : application/json",
		data: {
			"Lang": "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.orgns = response.data.Response;
			//($scope.orgns);
		},
		function (response) {
			//("Error from server");
		})

	$http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Event/GetEvents",
		headers: "content-type : application/json",
		data: {
			"Lang": "ar"
		}
	}).then(function (response) {

			$scope.Events = response.data.Response;
			//($scope.Events);
		},
		function (response) {
			//("Error from server");
		});

	$http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/About/GetCharityInfo",
		headers: "content-type : application/json",
		data: {
			Lang: "ar"
		}
	}).then(function (response) {
		$scope.charityContact = response.data.Response;
		//($scope.charityContact);
	});
	$scope.changingFun = function () {
		$http({
			method: "POST",
			url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Event/GetFilteredEvents",
			headers: "content-type : application/json",
			data: {
				Lang: "ar",
				OrganizationID: $scope.org.ID,
				RegionID: $scope.reg.ID,
				CategoryID: $scope.case.ID
			}
		}).then(function (response) {
			$scope.Events = response.data.Response;
			//($scope.Events);

		});
	};
	//$scope.formatedDate = $scope.myDate.format('d/mm/yyyy');
	$scope.myDateClick = function () {

		//($scope.selectedDay);
		$http({
			method: "POST",
			url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Event/GetEventByDate",
			headers: "content-type : application/json",
			data: {
				Lang: "ar",
				EventDate: $scope.selectedDay
			}
		}).then(function (response) {
				if (response.data.IsSuccess)
					$scope.Events = response.data.Response;
			},
			function (response) {
				//("Error from server");
			});

		//($scope.myDate);
		//($scope.Events);
	};
	var mydate = new Date();
	var month = mydate.getMonth() +1;
	var year = mydate.getFullYear() ; 
	var day = mydate.getDate() ; 
	//(year) ; 
	//(day) ; 
	//(month);
	$http({
		method:"POST",
		url:"http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Event/GetEventDays",
		headers: "content-type : application/json",
		data:{
			Month:month
		}

		
	}).then(function(response){
		$scope.days = response.data.Response.Days;
				//($scope.days);
		for(var i = 0 ; $scope.days!=undefined && i<$scope.days.length ; i++){
			if($scope.days[i] != day){
				//($scope.days[i]) ; 

			document.getElementById('md-0-month-'+year+'-'+(month-1)+'-'+$scope.days[i]).style.color="rgb(240, 143, 10)"  ;
			document.getElementById('md-0-month-'+year+'-'+(month-1)+'-'+$scope.days[i]).style.fontWeight="1000"  ;
			
			}
				
			
	}
		
	})
	$scope.setgen = function(){
		if($scope.eventsearch!=undefined)
		$scope.genSearch = $scope.eventsearch;
		else{
			$http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Event/GetEvents",
		headers: "content-type : application/json",
		data: {
			"Lang": "ar"
		}
	}).then(function (response) {

			$scope.Events = response.data.Response;
			//($scope.Events);
		},
		function (response) {
			//("Error from server");
		});
		}
		window.scrollTo(0,	document.getElementById('SearchRes').offsetTop ) ; 
	}
	$scope.js = function (x) {;
		(function ($, window, document, undefined) {




			// This is the default calendar template. This can be overridden.
			var clndrTemplate = "<div class='clndr-controls'>" +
				"<div class='clndr-control-button'><p class='clndr-previous-button'>previous</p></div><div class='month'><%= month %> <%= year %></div><div class='clndr-control-button rightalign'><p class='clndr-next-button'>next</p></div>" +
				"</div>" +
				"<table class='clndr-table' border='0' cellspacing='0' cellpadding='0'>" +
				"<thead>" +
				"<tr class='header-days'>" +
				"<% for(var i = 0; i < daysOfTheWeek.length; i++) { %>" +
				"<td class='header-day'><%= daysOfTheWeek[i] %></td>" +
				"<% } %>" +
				"</tr>" +
				"</thead>" +
				"<tbody>" +
				"<% for(var i = 0; i < numberOfRows; i++){ %>" +
				"<tr>" +
				"<% for(var j = 0; j < 7; j++){ %>" +
				"<% var d = j + i * 7; %>" +
				"<td class='<%= days[d].classes %>'><div class='day-contents'><%= days[d].day %>" +
				"</div></td>" +
				"<% } %>" +
				"</tr>" +
				"<% } %>" +
				"</tbody>" +
				"</table>";

			var pluginName = 'clndr';

			var defaults = {
				template: clndrTemplate,
				weekOffset: 0,
				startWithMonth: null,
				clickEvents: {
					click: null,
					nextMonth: null,
					previousMonth: null,
					nextYear: null,
					previousYear: null,
					today: null,
					onMonthChange: null,
					onYearChange: null
				},
				targets: {
					nextButton: 'clndr-next-button',
					previousButton: 'clndr-previous-button',
					nextYearButton: 'clndr-next-year-button',
					previousYearButton: 'clndr-previous-year-button',
					todayButton: 'clndr-today-button',
					day: 'day',
					empty: 'empty'
				},
				events: [],
				extras: null,
				dateParameter: 'date',
				multiDayEvents: null,
				doneRendering: null,
				render: null,
				daysOfTheWeek: null,
				showAdjacentMonths: true,
				adjacentDaysChangeMonth: false,
				ready: null,
				constraints: null
			};

			// The actual plugin constructor
			function Clndr(element, options) {
				this.element = element;

				// merge the default options with user-provided options
				this.options = $.extend(true, {}, defaults, options);

				// if there are events, we should run them through our addMomentObjectToEvents function
				// which will add a date object that we can use to make life easier. This is only necessary
				// when events are provided on instantiation, since our setEvents function uses addMomentObjectToEvents.
				if (this.options.events.length) {
					if (this.options.multiDayEvents) {
						this.options.events = this.addMultiDayMomentObjectsToEvents(this.options.events);
					} else {
						this.options.events = this.addMomentObjectToEvents(this.options.events);
					}
				}

				// this object will store a reference to the current month.
				// it's a moment object, which allows us to poke at it a little if we need to.
				// this will serve as the basis for switching between months & is the go-to
				// internally if we want to know which month we're currently at.
				if (this.options.startWithMonth) {
					this.month = moment(this.options.startWithMonth).startOf('month');
				} else {
					this.month = moment().startOf('month');
				}

				// if we've got constraints set, make sure the month is within them.
				if (this.options.constraints) {
					// first check if the start date exists & is later than now.
					if (this.options.constraints.startDate) {
						var startMoment = moment(this.options.constraints.startDate);
						if (this.month.isBefore(startMoment, 'month')) {
							this.month.set('month', startMoment.month());
							this.month.set('year', startMoment.year());
						}
					}
					// make sure the month (whether modified or not) is before the endDate
					if (this.options.constraints.endDate) {
						var endMoment = moment(this.options.constraints.endDate);
						if (this.month.isAfter(endMoment, 'month')) {
							this.month.set('month', endMoment.month()).set('year', endMoment.year());
						}
					}
				}

				this._defaults = defaults;
				this._name = pluginName;

				// Some first-time initialization -> day of the week offset,
				// template compiling, making and storing some elements we'll need later,
				// & event handling for the controller.
				this.init();
			}

			Clndr.prototype.init = function () {
				// create the days of the week using moment's current language setting
				this.daysOfTheWeek = this.options.daysOfTheWeek || [];
				if (!this.options.daysOfTheWeek) {
					this.daysOfTheWeek = [];
					for (var i = 0; i < 7; i++) {
						this.daysOfTheWeek.push(moment().weekday(i).format('dd').charAt(0));
					}
				}
				// shuffle the week if there's an offset
				if (this.options.weekOffset) {
					this.daysOfTheWeek = this.shiftWeekdayLabels(this.options.weekOffset);
				}

				// quick & dirty test to make sure rendering is possible.
				if (!$.isFunction(this.options.render)) {
					this.options.render = null;
					if (typeof _ === 'undefined') {
						throw new Error("Underscore was not found. Please include underscore.js OR provide a custom render function.");
					} else {
						// we're just going ahead and using underscore here if no render method has been supplied.
						this.compiledClndrTemplate = _.template(this.options.template);
					}
				}

				// create the parent element that will hold the plugin & save it for later
				$(this.element).html("<div class='clndr'></div>");
				this.calendarContainer = $('.clndr', this.element);

				// attach event handlers for clicks on buttons/cells
				this.bindEvents();

				// do a normal render of the calendar template
				this.render();

				// if a ready callback has been provided, call it.
				if (this.options.ready) {
					this.options.ready.apply(this, []);
				}
			};

			Clndr.prototype.shiftWeekdayLabels = function (offset) {
				var days = this.daysOfTheWeek;
				for (var i = 0; i < offset; i++) {
					days.push(days.shift());
				}
				return days;
			};

			// This is where the magic happens. Given a moment object representing the current month,
			// an array of calendarDay objects is constructed that contains appropriate events and
			// classes depending on the circumstance.
			Clndr.prototype.createDaysObject = function (currentMonth) {
				// this array will hold numbers for the entire grid (even the blank spaces)
				daysArray = [];
				var date = currentMonth.startOf('month');

				// filter the events list (if it exists) to events that are happening last month, this month and next month (within the current grid view)
				this.eventsLastMonth = [];
				this.eventsThisMonth = [];
				this.eventsNextMonth = [];

				if (this.options.events.length) {

					// MULTI-DAY EVENT PARSING
					// if we're using multi-day events, the start or end must be in the current month
					if (this.options.multiDayEvents) {
						this.eventsThisMonth = $(this.options.events).filter(function () {
							return this._clndrStartDateObject.format("YYYY-MM") == currentMonth.format("YYYY-MM") ||
								this._clndrEndDateObject.format("YYYY-MM") == currentMonth.format("YYYY-MM");
						}).toArray();

						if (this.options.showAdjacentMonths) {
							var lastMonth = currentMonth.clone().subtract('months', 1);
							var nextMonth = currentMonth.clone().add('months', 1);
							this.eventsLastMonth = $(this.options.events).filter(function () {
								return this._clndrStartDateObject.format("YYYY-MM") == lastMonth.format("YYYY-MM") ||
									this._clndrEndDateObject.format("YYYY-MM") == lastMonth.format("YYYY-MM");
							}).toArray();

							this.eventsNextMonth = $(this.options.events).filter(function () {
								return this._clndrStartDateObject.format("YYYY-MM") == nextMonth.format("YYYY-MM") ||
									this._clndrEndDateObject.format("YYYY-MM") == nextMonth.format("YYYY-MM");
							}).toArray();
						}
					}

					// SINGLE-DAY EVENT PARSING
					// if we're using single-day events, use _clndrDateObject
					else {
						this.eventsThisMonth = $(this.options.events).filter(function () {
							return this._clndrDateObject.format("YYYY-MM") == currentMonth.format("YYYY-MM");
						}).toArray();

						// filter the adjacent months as well, if the option is true
						if (this.options.showAdjacentMonths) {
							var lastMonth = currentMonth.clone().subtract('months', 1);
							var nextMonth = currentMonth.clone().add('months', 1);
							this.eventsLastMonth = $(this.options.events).filter(function () {
								return this._clndrDateObject.format("YYYY-MM") == lastMonth.format("YYYY-MM");
							}).toArray();

							this.eventsNextMonth = $(this.options.events).filter(function () {
								return this._clndrDateObject.format("YYYY-MM") == nextMonth.format("YYYY-MM");
							}).toArray();
						}
					}
				}

				// if diff is greater than 0, we'll have to fill in last days of the previous month
				// to account for the empty boxes in the grid.
				// we also need to take into account the weekOffset parameter
				var diff = date.weekday() - this.options.weekOffset;
				if (diff < 0) diff += 7;

				if (this.options.showAdjacentMonths) {
					for (var i = 0; i < diff; i++) {
						var day = moment([currentMonth.year(), currentMonth.month(), i - diff + 1]);
						daysArray.push(this.createDayObject(day, this.eventsLastMonth));
					}
				} else {
					for (var i = 0; i < diff; i++) {
						daysArray.push(this.calendarDay({
							classes: this.options.targets.empty + " last-month"
						}));
					}
				}

				// now we push all of the days in a month
				var numOfDays = date.daysInMonth();
				for (var i = 1; i <= numOfDays; i++) {
					var day = moment([currentMonth.year(), currentMonth.month(), i]);
					daysArray.push(this.createDayObject(day, this.eventsThisMonth))
				}

				// ...and if there are any trailing blank boxes, fill those in
				// with the next month first days
				if (this.options.showAdjacentMonths) {
					i = 1;
					while (daysArray.length % 7 !== 0) {
						var day = moment([currentMonth.year(), currentMonth.month(), numOfDays + i]);
						daysArray.push(this.createDayObject(day, this.eventsNextMonth));
						i++;
					}
				} else {
					i = 1;
					while (daysArray.length % 7 !== 0) {
						daysArray.push(this.calendarDay({
							classes: this.options.targets.empty + " next-month"
						}));
						i++;
					}
				}

				return daysArray;
			};

			Clndr.prototype.createDayObject = function (day, monthEvents) {
				var eventsToday = [];
				var now = moment();
				var self = this;

				var j = 0,
					l = monthEvents.length;
				for (j; j < l; j++) {
					// keep in mind that the events here already passed the month/year test.
					// now all we have to compare is the moment.date(), which returns the day of the month.
					if (self.options.multiDayEvents) {
						var start = monthEvents[j]._clndrStartDateObject;
						var end = monthEvents[j]._clndrEndDateObject;
						// if today is the same day as start or is after the start, and
						// if today is the same day as the end or before the end ...
						// woohoo semantics!
						if ((day.isSame(start, 'day') || day.isAfter(start, 'day')) &&
							(day.isSame(end, 'day') || day.isBefore(end, 'day'))) {
							eventsToday.push(monthEvents[j]);
						}
					} else {
						if (monthEvents[j]._clndrDateObject.date() == day.date()) {
							eventsToday.push(monthEvents[j]);
						}
					}
				}

				var extraClasses = "";

				if (now.format("YYYY-MM-DD") == day.format("YYYY-MM-DD")) {
					extraClasses += " today";
				}
				if (day.isBefore(now, 'day')) {
					extraClasses += " past";
				}
				if (eventsToday.length) {
					extraClasses += " event";
				}
				if (this.month.month() > day.month()) {
					extraClasses += " adjacent-month";

					this.month.year() === day.year() ?
						extraClasses += " last-month" :
						extraClasses += " next-month";

				} else if (this.month.month() < day.month()) {
					extraClasses += " adjacent-month";

					this.month.year() === day.year() ?
						extraClasses += " next-month" :
						extraClasses += " last-month";
				}

				// if there are constraints, we need to add the inactive class to the days outside of them
				if (this.options.constraints) {
					if (this.options.constraints.startDate && day.isBefore(moment(this.options.constraints.startDate))) {
						extraClasses += " inactive";
					}
					if (this.options.constraints.endDate && day.isAfter(moment(this.options.constraints.endDate))) {
						extraClasses += " inactive";
					}
				}

				// validate moment date
				if (!day.isValid() && day.hasOwnProperty('_d') && day._d != undefined) {
					day = moment(day._d);
				}

				// we're moving away from using IDs in favor of classes, since when
				// using multiple calendars on a page we are technically violating the
				// uniqueness of IDs.
				extraClasses += " calendar-day-" + day.format("YYYY-MM-DD");

				return this.calendarDay({
					day: day.date(),
					classes: this.options.targets.day + extraClasses,
					events: eventsToday,
					date: day
				});
			};

			Clndr.prototype.render = function () {
				// get rid of the previous set of calendar parts.
				// TODO: figure out if this is the right way to ensure proper garbage collection?
				this.calendarContainer.children().remove();
				// get an array of days and blank spaces
				var days = this.createDaysObject(this.month);
				// this is to prevent a scope/naming issue between this.month and data.month
				var currentMonth = this.month;

				var data = {
					daysOfTheWeek: this.daysOfTheWeek,
					numberOfRows: Math.ceil(days.length / 7),
					days: days,
					month: this.month.format('MMMM'),
					year: this.month.year(),
					eventsThisMonth: this.eventsThisMonth,
					eventsLastMonth: this.eventsLastMonth,
					eventsNextMonth: this.eventsNextMonth,
					extras: this.options.extras
				};

				// render the calendar with the data above & bind events to its elements
				if (!this.options.render) {
					this.calendarContainer.html(this.compiledClndrTemplate(data));
				} else {
					this.calendarContainer.html(this.options.render.apply(this, [data]));
				}

				// if there are constraints, we need to add the 'inactive' class to the controls
				if (this.options.constraints) {
					// in the interest of clarity we're just going to remove all inactive classes and re-apply them each render.
					for (target in this.options.targets) {
						if (target != this.options.targets.day) {
							this.element.find('.' + this.options.targets[target]).toggleClass('inactive', false);
						}
					}

					var start = null;
					var end = null;

					if (this.options.constraints.startDate) {
						start = moment(this.options.constraints.startDate);
					}
					if (this.options.constraints.endDate) {
						end = moment(this.options.constraints.endDate);
					}
					// deal with the month controls first.
					// are we at the start month?
					if (start && this.month.isSame(start, 'month')) {
						this.element.find('.' + this.options.targets.previousButton).toggleClass('inactive', true);
					}
					// are we at the end month?
					if (end && this.month.isSame(end, 'month')) {
						this.element.find('.' + this.options.targets.nextButton).toggleClass('inactive', true);
					}
					// what's last year looking like?
					if (start && moment(start).subtract('years', 1).isBefore(moment(this.month).subtract('years', 1))) {
						this.element.find('.' + this.options.targets.previousYearButton).toggleClass('inactive', true);
					}
					// how about next year?
					if (end && moment(end).add('years', 1).isAfter(moment(this.month).add('years', 1))) {
						this.element.find('.' + this.options.targets.nextYearButton).toggleClass('inactive', true);
					}
					// today? we could put this in init(), but we want to support the user changing the constraints on a living instance.
					if ((start && start.isAfter(moment(), 'month')) || (end && end.isBefore(moment(), 'month'))) {
						this.element.find('.' + this.options.targets.today).toggleClass('inactive', true);
					}
				}


				if (this.options.doneRendering) {
					this.options.doneRendering.apply(this, []);
				}
			};

			Clndr.prototype.bindEvents = function () {
				var $container = $(this.element);
				var self = this;

				// target the day elements and give them click events
				$container.on('click', '.' + this.options.targets.day, function (event) {
					if (self.options.clickEvents.click) {
						var target = self.buildTargetObject(event.currentTarget, true);
						self.options.clickEvents.click.apply(self, [target]);
					}
					// if adjacentDaysChangeMonth is on, we need to change the month here.
					if (self.options.adjacentDaysChangeMonth) {
						if ($(event.currentTarget).is(".last-month")) {
							self.backActionWithContext(self);
						} else if ($(event.currentTarget).is(".next-month")) {
							self.forwardActionWithContext(self);
						}
					}
				});
				// target the empty calendar boxes as well
				$container.on('click', '.' + this.options.targets.empty, function (event) {
					if (self.options.clickEvents.click) {
						var target = self.buildTargetObject(event.currentTarget, false);
						self.options.clickEvents.click.apply(self, [target]);
					}
					if (self.options.adjacentDaysChangeMonth) {
						if ($(event.currentTarget).is(".last-month")) {
							self.backActionWithContext(self);
						} else if ($(event.currentTarget).is(".next-month")) {
							self.forwardActionWithContext(self);
						}
					}
				});

				// bind the previous, next and today buttons
				$container
					.on('click', '.' + this.options.targets.previousButton, {
						context: this
					}, this.backAction)
					.on('click', '.' + this.options.targets.nextButton, {
						context: this
					}, this.forwardAction)
					.on('click', '.' + this.options.targets.todayButton, {
						context: this
					}, this.todayAction)
					.on('click', '.' + this.options.targets.nextYearButton, {
						context: this
					}, this.nextYearAction)
					.on('click', '.' + this.options.targets.previousYearButton, {
						context: this
					}, this.previousYearAction);
			}

			// If the user provided a click callback we'd like to give them something nice to work with.
			// buildTargetObject takes the DOM element that was clicked and returns an object with
			// the DOM element, events, and the date (if the latter two exist). Currently it is based on the id,
			// however it'd be nice to use a data- attribute in the future.
			Clndr.prototype.buildTargetObject = function (currentTarget, targetWasDay) {
				// This is our default target object, assuming we hit an empty day with no events.
				var target = {
					element: currentTarget,
					events: [],
					date: null
				};
				// did we click on a day or just an empty box?
				if (targetWasDay) {
					var dateString;

					// Our identifier is in the list of classNames. Find it!
					var classNameIndex = currentTarget.className.indexOf('calendar-day-');
					if (classNameIndex !== 0) {
						// our unique identifier is always 23 characters long.
						// If this feels a little wonky, that's probably because it is.
						// Open to suggestions on how to improve this guy.
						dateString = currentTarget.className.substring(classNameIndex + 13, classNameIndex + 23);
						target.date = moment(dateString);
					} else {
						target.date = null;
					}

					// do we have events?
					if (this.options.events) {
						// are any of the events happening today?
						if (this.options.multiDayEvents) {
							target.events = $.makeArray($(this.options.events).filter(function () {
								// filter the dates down to the ones that match.
								return ((target.date.isSame(this._clndrStartDateObject, 'day') || target.date.isAfter(this._clndrStartDateObject, 'day')) &&
									(target.date.isSame(this._clndrEndDateObject, 'day') || target.date.isBefore(this._clndrEndDateObject, 'day')));
							}));
						} else {
							target.events = $.makeArray($(this.options.events).filter(function () {
								// filter the dates down to the ones that match.
								return this._clndrDateObject.format('YYYY-MM-DD') == dateString;
							}));
						}
					}
				}

				return target;
			}

			// the click handlers in bindEvents need a context, so these are wrappers
			// to the actual functions. Todo: better way to handle this?
			Clndr.prototype.forwardAction = function (event) {
				var self = event.data.context;
				self.forwardActionWithContext(self);
			};

			Clndr.prototype.backAction = function (event) {
				var self = event.data.context;
				self.backActionWithContext(self);
			};

			// These are called directly, except for in the bindEvent click handlers,
			// where forwardAction and backAction proxy to these guys.
			Clndr.prototype.backActionWithContext = function (self) {
				// before we do anything, check if there is an inactive class on the month control.
				// if it does, we want to return and take no action.
				if (self.element.find('.' + self.options.targets.previousButton).hasClass('inactive')) {
					return;
				}

				// is subtracting one month going to switch the year?
				var yearChanged = !self.month.isSame(moment(self.month).subtract('months', 1), 'year');
				self.month.subtract('months', 1);

				self.render();

				if (self.options.clickEvents.previousMonth) {
					self.options.clickEvents.previousMonth.apply(self, [moment(self.month)]);
				}
				if (self.options.clickEvents.onMonthChange) {
					self.options.clickEvents.onMonthChange.apply(self, [moment(self.month)]);
				}
				if (yearChanged) {
					if (self.options.clickEvents.onYearChange) {
						self.options.clickEvents.onYearChange.apply(self, [moment(self.month)]);
					}
				}
			};

			Clndr.prototype.forwardActionWithContext = function (self) {
				// before we do anything, check if there is an inactive class on the month control.
				// if it does, we want to return and take no action.
				if (self.element.find('.' + self.options.targets.nextButton).hasClass('inactive')) {
					return;
				}

				// is adding one month going to switch the year?
				var yearChanged = !self.month.isSame(moment(self.month).add('months', 1), 'year');
				self.month.add('months', 1);

				self.render();

				if (self.options.clickEvents.nextMonth) {
					self.options.clickEvents.nextMonth.apply(self, [moment(self.month)]);
				}
				if (self.options.clickEvents.onMonthChange) {
					self.options.clickEvents.onMonthChange.apply(self, [moment(self.month)]);
				}
				if (yearChanged) {
					if (self.options.clickEvents.onYearChange) {
						self.options.clickEvents.onYearChange.apply(self, [moment(self.month)]);
					}
				}
			};

			Clndr.prototype.todayAction = function (event) {
				var self = event.data.context;

				// did we switch months when the today button was hit?
				var monthChanged = !self.month.isSame(moment(), 'month');
				var yearChanged = !self.month.isSame(moment(), 'year');

				self.month = moment().startOf('month');

				// fire the today event handler regardless of whether the month changed.
				if (self.options.clickEvents.today) {
					self.options.clickEvents.today.apply(self, [moment(self.month)]);
				}

				if (monthChanged) {
					// no need to re-render if we didn't change months.
					self.render();

					self.month = moment();
					// fire the onMonthChange callback
					if (self.options.clickEvents.onMonthChange) {
						self.options.clickEvents.onMonthChange.apply(self, [moment(self.month)]);
					}
					// maybe fire the onYearChange callback?
					if (yearChanged) {
						if (self.options.clickEvents.onYearChange) {
							self.options.clickEvents.onYearChange.apply(self, [moment(self.month)]);
						}
					}
				}
			};

			Clndr.prototype.nextYearAction = function (event) {
				var self = event.data.context;
				// before we do anything, check if there is an inactive class on the month control.
				// if it does, we want to return and take no action.
				if (self.element.find('.' + self.options.targets.nextYearButton).hasClass('inactive')) {
					return;
				}

				self.month.add('years', 1);
				self.render();

				if (self.options.clickEvents.nextYear) {
					self.options.clickEvents.nextYear.apply(self, [moment(self.month)]);
				}
				if (self.options.clickEvents.onMonthChange) {
					self.options.clickEvents.onMonthChange.apply(self, [moment(self.month)]);
				}
				if (self.options.clickEvents.onYearChange) {
					self.options.clickEvents.onYearChange.apply(self, [moment(self.month)]);
				}
			};

			Clndr.prototype.previousYearAction = function (event) {
				var self = event.data.context;
				// before we do anything, check if there is an inactive class on the month control.
				// if it does, we want to return and take no action.
				if (self.element.find('.' + self.options.targets.previousYear).hasClass('inactive')) {
					return;
				}

				self.month.subtract('years', 1);
				self.render();

				if (self.options.clickEvents.previousYear) {
					self.options.clickEvents.previousYear.apply(self, [moment(self.month)]);
				}
				if (self.options.clickEvents.onMonthChange) {
					self.options.clickEvents.onMonthChange.apply(self, [moment(self.month)]);
				}
				if (self.options.clickEvents.onYearChange) {
					self.options.clickEvents.onYearChange.apply(self, [moment(self.month)]);
				}
			};

			Clndr.prototype.forward = function (options) {
				this.month.add('months', 1);
				this.render();
				if (options && options.withCallbacks) {
					if (this.options.clickEvents.onMonthChange) {
						this.options.clickEvents.onMonthChange.apply(this, [moment(this.month)]);
					}

					// We entered a new year
					if (this.month.month() === 0 && this.options.clickEvents.onYearChange) {
						this.options.clickEvents.onYearChange.apply(this, [moment(this.month)]);
					}
				}

				return this;
			}

			Clndr.prototype.back = function (options) {
				this.month.subtract('months', 1);
				this.render();
				if (options && options.withCallbacks) {
					if (this.options.clickEvents.onMonthChange) {
						this.options.clickEvents.onMonthChange.apply(this, [moment(this.month)]);
					}

					// We went all the way back to previous year
					if (this.month.month() === 11 && this.options.clickEvents.onYearChange) {
						this.options.clickEvents.onYearChange.apply(this, [moment(this.month)]);
					}
				}

				return this;
			}

			// alternate names for convenience
			Clndr.prototype.next = function (options) {
				this.forward(options);
				return this;
			}

			Clndr.prototype.previous = function (options) {
				this.back(options);
				return this;
			}

			Clndr.prototype.setMonth = function (newMonth, options) {
				// accepts 0 - 11 or a full/partial month name e.g. "Jan", "February", "Mar"
				this.month.month(newMonth);
				this.render();
				if (options && options.withCallbacks) {
					if (this.options.clickEvents.onMonthChange) {
						this.options.clickEvents.onMonthChange.apply(this, [moment(this.month)]);
					}
				}
				return this;
			}

			Clndr.prototype.nextYear = function (options) {
				this.month.add('year', 1);
				this.render();
				if (options && options.withCallbacks) {
					if (this.options.clickEvents.onYearChange) {
						this.options.clickEvents.onYearChange.apply(this, [moment(this.month)]);
					}
				}
				return this;
			}

			Clndr.prototype.previousYear = function (options) {
				this.month.subtract('year', 1);
				this.render();
				if (options && options.withCallbacks) {
					if (this.options.clickEvents.onYearChange) {
						this.options.clickEvents.onYearChange.apply(this, [moment(this.month)]);
					}
				}
				return this;
			}

			Clndr.prototype.setYear = function (newYear, options) {
				this.month.year(newYear);
				this.render();
				if (options && options.withCallbacks) {
					if (this.options.clickEvents.onYearChange) {
						this.options.clickEvents.onYearChange.apply(this, [moment(this.month)]);
					}
				}
				return this;
			}

			Clndr.prototype.setEvents = function (events) {
				// go through each event and add a moment object
				if (this.options.multiDayEvents) {
					this.options.events = this.addMultiDayMomentObjectsToEvents(events);
				} else {
					this.options.events = this.addMomentObjectToEvents(events);
				}

				this.render();
				return this;
			};

			Clndr.prototype.addEvents = function (events) {
				// go through each event and add a moment object
				if (this.options.multiDayEvents) {
					this.options.events = $.merge(this.options.events, this.addMultiDayMomentObjectsToEvents(events));
				} else {
					this.options.events = $.merge(this.options.events, this.addMomentObjectToEvents(events));
				}

				this.render();
				return this;
			};

			Clndr.prototype.addMomentObjectToEvents = function (events) {
				var self = this;
				var i = 0,
					l = events.length;
				for (i; i < l; i++) {
					// stuff a _clndrDateObject in each event, which really, REALLY should not be
					// overriding any existing object... Man that would be weird.
					events[i]._clndrDateObject = moment(events[i][self.options.dateParameter]);
				}
				return events;
			}

			Clndr.prototype.addMultiDayMomentObjectsToEvents = function (events) {
				var self = this;
				var i = 0,
					l = events.length;
				for (i; i < l; i++) {
					events[i]._clndrStartDateObject = moment(events[i][self.options.multiDayEvents.startDate]);
					events[i]._clndrEndDateObject = moment(events[i][self.options.multiDayEvents.endDate]);
				}
				return events;
			}

			Clndr.prototype.calendarDay = function (options) {
				var defaults = {
					day: "",
					classes: this.options.targets.empty,
					events: [],
					date: null
				};
				return $.extend({}, defaults, options);
			}

			$.fn.clndr = function (options) {
				if (!$.data(this, 'plugin_clndr')) {
					var clndr_instance = new Clndr(this, options);
					$.data(this, 'plugin_clndr', clndr_instance);
					return clndr_instance;
				}
			}

		})(jQuery, window, document);

	};

}]);

//Event-Details Controller
myapp.controller('eventDetailsCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    window.scrollTo(0,0);
    
    
    console.log($routeParams.eventById);
    $http({
		method: 'POST',
		url: 'http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Event/GetEventDetailsByID',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
            Lang: 'ar',
			EventID: $routeParams.eventById
		}
	}).then(function (response) {
		$scope.EventsDetails = response.data.Response;
		console.log($scope.EventsDetails);
	});
}]);
//info Controller
myapp.controller('Infoctrl', ['$scope', '$http', function ($scope, $http) {
	window.scrollTo(0, 0);	
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Information/GetInformations",
		headers: "content-type : application/json",
		data: {
			"Lang": "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.getInfo = response.data.Response;
			//($scope.getInfo);
		},
		function (response) {
			//("Error from server");
    });
    
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/BloodBank/GetBloodBanks",
		headers: "content-type : application/json",
		data: {
			"Lang": "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.bloodbanks = response.data.Response;
			//($scope.bloodbanks);
		},
		function (response) {
			//("Error from server");
		});
	$scope.getbd = function (x) {
		//(x);
		$http({
			method: "POST",
			url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/BloodBank/GetBloodBankDetails",
			headers: "content-type : application/json",
			data: {
				Lang: "ar",
				ID: x
			}
		}).then(function (response) {
				if (response.data.IsSuccess)
					$scope.bdetail = response.data.Response;
				//($scope.bdetail);
			},
			function (response) {
				//("Error from server");
			});
	};
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/About/GetCharityInfo",
		headers: "content-type : application/json",
		data: {
			Lang: "ar"
		}
	}).then(function (response) {
				$scope.charityContact = response.data.Response;
			//($scope.charityContact);
		});
    
}]);
//contact-us controller 
myapp.controller("contactCtrl", function ($scope, $http, cantactService) {
	"use strict";
	window.scrollTo(0, 0);	
    var d = {
		lang: "ar"
	};
	$http({
		"url": "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/About/GetCharityInfo",
		"method": "POST",
		"headers": {
			"content-type": "application/json"
		},
		"data": JSON.stringify(d)
	}).then(function (response) {

		$scope.charityData = response.data.Response;
        $scope.charityContact = response.data.Response;
		//($scope.charityData);
	});
	$scope.sendMessage = function (user) {
		cantactService.addMessage(user);
		//("x");
	};
})
    .factory("cantactService", ["$http", function ($http, $scope, user) {
	"use strict";
	var fac = {};
	fac.addMessage = function (user) {
		var res = {
			Lang: "ar",
			Email: user.Email,
			Mobile: "user.Mobile",
			DonorIn: user.Subject,
			Message: user.Message,
            Name: user.Name
		};
		$http({
			"url": "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/User/ContactUs",
			"method": "POST",
			"headers": {
				"content-type": "application/json"
			},
			"data": JSON.stringify(res)
		}).then(function (response) {

			//$scope.messageData = response.data.Response;

			//(response.data);
		});
	};
	return fac;
    
}]);
//about controller 
myapp.controller('aboutCtrl', function ($scope, $http) {
	'use strict';
    window.scrollTo(0, 0);	
	$http({
		method: 'POST',
		url: 'http://yakensolution.cloudapp.net:80/DaleelElkheir/api/About/GetAbout',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			Lang: 'ar'
		}
	}).then(function (response) {
		//(response.data);
		$scope.aboutResult = response.data.Response;
		//($scope.aboutResult);
		/*if (response.data.isSuccess){
		    $scope.Beif = response.data.Response.Beif;
		    $scope.Vision = response.data.Response.Vision;
		} else {
		    $scope.serverMessage = response.data.errorMessage;
		}*/
	});
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/TrusteesBoard/GetTrusteesBoard",
		headers: "content-type : application/json",
		data: {
			"Lang": "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.board = response.data.Response;
			//($scope.board);
		},
		function (response) {
			//("Error from server");
		});
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/About/GetCharityInfo",
		headers: "content-type : application/json",
		data: {
			Lang: "ar"
		}
	}).then(function (response) {
        $scope.charityContact = response.data.Response;
			//($scope.charityContact);
		});
    
});
//cases controller 
myapp.controller('causesCtrl', function ($scope, $http, $rootScope, $routeParams) {
	'use strict';
    window.scrollTo(0, 0);	
$scope.submitted = false  ; 
	var y ; 
    
    if($scope.genSearch === ' ') {
            $scope.genSearch = '';
        }
    
	$scope.genSearch = $routeParams.keywSearch;
        
	if($routeParams.areaSearch === ' ')
		$scope.reg  = undefined;
	else
		$scope.reg = $routeParams.areaSearch ; 
	
	if($routeParams.typCaseSearch === ' ')
		$scope.case  = undefined;
	else
		$scope.case = $routeParams.typCaseSearch ; 
	
	if($routeParams.organSearch === ' ')
		$scope.org  = undefined;
	else
		$scope.org = $routeParams.organSearch ; 
	
        $scope.program = $routeParams.programID;
    	
	if($scope.genSearch === ' ') {
            $scope.genSearch = '';
        }
//	console.log($routeParams.areaSearch) ; 
//	console.log($routeParams.keywSearch) ; 
//	console.log($routeParams.organSearch) ; 
//	console.log($routeParams.typCaseSearch) ; 
	
	if($routeParams.ProgramID!=undefined){
	//	alert('sadasda'  ) ; 
	
	$http({
		method: 'POST',
		url: 'http://yakensolution.cloudapp.net:80/DaleelElkheir/api/OurProgram/GetCasesForProgram',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			Lang: 'ar',
			ProgramID:$routeParams.ProgramID
		}
	}).then(function (response) {
		//(response.data);
		$scope.Result = response.data.Response;
		$scope.Events = response.data.Response;
		/*$scope.CausesSearch = function () {
		    $scope.Events = response.data.Response;
		};
		if (response.data.isSuccess){
		    $scope.Beif = response.data.Response.Beif;
		    $scope.Vision = response.data.Response.Vision;
		} else {
		    $scope.serverMessage = response.data.errorMessage;
		}*/
        
	});
	}
	else if ( $scope.reg!=undefined || $scope.case != undefined || $scope.org !=undefined){
		alert('ss') ; 
		$http({
			method : 'POST' , 
			url : 'http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Case/GetFilteredCases' ,
			headers: {
				'Content-Type': 'application/json'
			},
			data : {
				lang : 'ar',
				OrganizationID : $scope.org,
				CategoryID : $scope.case , 
				RegionID: $scope.reg
			}
		}).then(function(response){
			console.log(response.Response) ;
			//console.log(response.Response.length) ;
			
			$scope.Result = response.data.Response;
			$scope.Events = response.data.Response;
			
		} , 
		function(reponse){
			
		}) ;
	}
	else{
			$http({
		method: 'POST',
		url: 'http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Case/GetCases',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			Lang: 'ar'
		}
	}).then(function (response) {
		//(response.data);
		$scope.Result = response.data.Response;
		$scope.Events = response.data.Response;
				$scope.genSearch = $routeParams.keywSearch ; 
		/*$scope.CausesSearch = function () {
		    $scope.Events = response.data.Response;
		};
		if (response.data.isSuccess){
		    $scope.Beif = response.data.Response.Beif;
		    $scope.Vision = response.data.Response.Vision;
		} else {
		    $scope.serverMessage = response.data.errorMessage;
		}*/
        
	});
	}

	$http({
		method: 'POST',
		url: 'http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Category/GetCategory',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			Lang: 'ar'
		}
	}).then(function (response) {
		$scope.category = response.data.Response;
         var Regionspace = {ID: "", Name: ""}
            $scope.category.push(Regionspace);
		//($scope.category);
	});
    //($scope.reg);
    //($scope.case);
    //($scope.org);
    /*
    $scope.changecity = function() {
        if($scope.reg != undefined && $scope.reg != 'مكان الحالة' ) {
         var comainx = $scope.reg.search(',') ;
        if(comainx != -1 && $scope.reg != undefined && $scope.reg != 'نوع الحالة ') {
            $scope.city = $scope.reg.substr(0,comainx);
        };
        if($scope.reg == null) {
            $scope.reg == undefined;
        };
        if($scope.reg == undefined) {
            $scope.city == undefined;
        };
       
        
        //($scope.reg);
        };
        
    } ;*/
        
    $scope.changeCaseTyp = function() {
        
        if($scope.case != -1 && $scope.case != undefined && $scope.case != 'نوع الحالة ')
            $scope.case = $scope.case.substr();
        if($scope.case == 'نوع الحالة ') {
            $scope.this == undefined;
        };
        //($scope.case);
        
        
    } ;
	    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Region/GetGovernorate",
		headers: "content-type : application/json",
		data: {
			"Lang": "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.govs = response.data.Response;
						            var govspace = {ID: undefined, Name: ""}
            $scope.govs.push(govspace);
			//($scope.govs);
		},
		function (response) {
			//("Error from server");
		
		});
	$scope.getregs = function(x){
		console.log(x) ;
		 y = x; 
		$scope.reg = undefined ;
		$scope.regid = undefined ; 
		if(x!=undefined){
					$http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Region/GetRegions",
		headers: "content-type : application/json",
		data: {
			"GovernorateID":x,
			"Lang": "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.regs = response.data.Response;
					            var Regionspace = {ID: undefined, Name: ""}
            $scope.regs.push(Regionspace);
			//($scope.regs);
		},
		function (response) {
			//("Error from server");
		});		
		}
		else{$scope.regs=[];}
	
		};


        
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Organization/GetOrganizationsName",
		headers: "content-type : application/json",
		data: {
			Lang: "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.orgns = response.data.Response;
            var Regionspace = {ID: "", Name: ""}
            $scope.orgns.push(Regionspace);
			//($scope.orgns);
        
		},
		function (response) {
			//("Error from server");
		});
    
	$http({
		method: 'POST',
		url: 'http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Case/GetRecentCases',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			Lang: 'ar'
		}
	}).then(function (response) {
		$scope.Causes = response.data.Response;

	});
	$scope.getCausesId = function (x) {
		
		//(x);
		caseid = x;
	};
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Case/GetUrgentCases",
		headers: "content-type : application/json",
		data: {
			"Lang": "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.ucases = response.data.Response;
			//($scope.ucases);
		},
		function (response) {
			//("Error from server");
		});
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/About/GetCharityInfo",
		headers: "content-type : application/json",
		data: {
			Lang: "ar"
		}
	}).then(function (response) {
        $scope.charityContact = response.data.Response;
        //($scope.charityContact);
		});
    /*$scope.casesChanges = function () {
        if($scope.regs.ID == 0 && $scope.case.ID == 0 && $scope.org.ID == 0) {
            $http({
            method: 'POST',
            url: 'http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Case/GetCases',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                Lang: 'ar'
            }
        }).then(function (response) {
            //(response.data);
            $scope.Result = response.data.Response;
            $scope.Events = response.data.Response;

            });
            
        };
    };*/

    $scope.casesChanges = function () {
		$scope.submitted = true ; 
            $scope.genSearch = $scope.casesearch ; 
		
        for(var i = 0 ; i <$scope.orgns.length ; i++){
                if($scope.org == $scope.orgns[i].Name){
                    $scope.orgid = $scope.orgns[i].ID ; 
                    break ; 
                }
            }

        for(var i = 0 ; i <$scope.category.length ; i++){
                if($scope.case == $scope.category[i].Name){
                    $scope.caseid = $scope.category[i].ID ; 
                    break ; 
                }
            }
		if(y != undefined && $scope.reg != undefined ){
			console.log('-'+$scope.reg+'-') ; 
			
			$http({
            method: "POST",
            url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Case/GetFilteredCases",
            headers: "content-type : application/json",
            data: {
                Lang: "ar",
                OrganizationID: $scope.orgid,
                CategoryID: $scope.caseid,
                RegionID: $scope.reg
            }
        }).then(function (response) {
                $scope.Result = response.data.Response;
                //($scope.Result);
            });
		}
		else if(y == undefined && $scope.reg == undefined ){
				
			$http({
            method: "POST",
            url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Case/GetFilteredCases",
            headers: "content-type : application/json",
            data: {
                Lang: "ar",
                OrganizationID: $scope.orgid,
                CategoryID: $scope.caseid,
                RegionID: $scope.regid
            }
        }).then(function (response) {
                $scope.Result = response.data.Response;
                //($scope.Result);
            });
		}
            
        
        };
    
});
//case detail controller
myapp.controller('causesSingleCtrl', function ($scope, $http, $routeParams) {
	'use strict';
	window.scrollTo(0, 0);	
    //($routeParams.caseid ) ; 
    $http({
		method: 'POST',
		url: 'http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Case/GetCaseDetail',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			ID: $routeParams.caseid,
			Lang: 'ar'
		}
	}).then(function (response) {
		$scope.CausesDetails = response.data.Response;
		//($scope.CausesDetails);
        //($scope.CausesDetails.CategoryID);
        $scope.relatedCases($scope.CausesDetails.CategoryID);
	});
    $scope.relatedCases = function (x) {
            $http({
            method: 'POST',
            url: 'http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Case/GetFilteredCases',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "Lang":"ar",
                "OrganizationID":"",
                "CategoryID": x,
                "RegionID":""
            }
            }).then(function (response) {
                $scope.relativeCases = response.data.Response;
                //($scope.relativeCases);
                //(x);
	       });
            
        };
        
	//window.location.href = "causes-single.html";
	//};
//    $scope.CategID = $scope.CausesDetails.CategoryID
//    //($scope.CategID);
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/About/GetCharityInfo",
		headers: "content-type : application/json",
		data: {
			Lang: "ar"
		}
	}).then(function (response) {
        $scope.charityContact = response.data.Response;
        //($scope.charityContact);
		});
    //($scope.categID);
    
     
});
// Gallery Controller
myapp.controller('galleryCtrl', ['$scope', '$http', function ($scope, $http) {
	window.scrollTo(0, 0);	
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Event/GetEventGallery",
		headers: "content-type : application/json",
		data:{
			lang:"ar"
		}
	}).then(function (response) {
        $scope.gall = response.data.Response;
        //($scope.gall);
        
		});
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Event/GetEvents",
		headers: "content-type : application/json",
		data: {
			Lang: "ar"
		}
	}).then(function (response) {
        //if (response.data.IsSuccess)
        $scope.eventNa = response.data.Response;
        //($scope.eventNa);
         var Regionspace = {ID: "", Title: ""}
            $scope.eventNa.push(Regionspace);
            //($scope.eventNa);
		//},
		//function (response) {
		//	//("Error from server");
		});
    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/About/GetCharityInfo",
		headers: "content-type : application/json",
		data: {
			Lang: "ar"
		}
	}).then(function (response) {
        $scope.charityContact = response.data.Response;
        //($scope.charityContact);
        
		});
    $scope.eventsNames = function () {
        $http({
            method: "POST",
            url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Event/GetEventGallery",
            headers: "content-type : application/json",
            data: {
                Lang: "ar",
                EventID: $scope.eventName
            }
        }).then(function (response) {
                $scope.gall = response.data.Response;
                //($scope.gall);
            });
        //($scope.eventName);
        //($scope.gall);
//        try {
//            adddlert("Welcome guest!");
//        }
//        catch(err) {
//            document.getElementById("demo").innerHTML = "There Is No Matched Results";
//}
    };
//    $scope.openLightboxModal = function (index) {
//    Lightbox.openModal($scope.gall, index);
//    };
    }]);
//});
myapp.controller('join-usCtrl',['$scope', '$http', function ($scope, $http) {
    window.scrollTo(0,0 );
	$scope.cat =  [] ; 
	$scope.matched=[] ; 
	$scope.cat1= [] ; 
	$scope.matched1 = [] ; 
	$scope.DaysA = [] ; 
	$http({
		method:"POST",
		url:"http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Category/GetCategory", 
			headers:{
			'Content-Type' : 'application/json'
		},
		data:{
			lang:"ar"
		}
	}).then(function(response){
		$scope.categories = response.data.Response;
	})
	
	$scope.showcat = function(){
		//($scope.cat) ; 
	}
	$scope.showcat1 = function(){
		//($scope.cat1) ; 
	}
	
	$scope.Register = function(){
		for(var i = 0 ; i<$scope.categories.length ; i++){
			if($scope.cat[i]){
				$scope.matched.push($scope.categories[i].ID) ; 
			}
		}
		//($scope.matched) ; 
		
		$http({
			method:"POST",
			url:"http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Volunteer/AddVolunteer",
			headers:{
				'Content-Type' : 'application/json'
			},
			data:{
				Name:$scope.VName,
				Email:$scope.VEmail,
				Contact:$scope.VContact,
				Categories : $scope.matched 
			}
		}).then(function(response){
			if(response.data.IsSuccess){
				$("#Done").modal("show") ; 
				$scope.cat=[] ;  
				$scope.VName = "" ; 
				$scope.VEmail = "" ; 
				$scope.VContact="" ;

			}
		})
	} ; 
	$scope.getCityId = function(){
			$http({
		method :"POST",
		url:"http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Region/GetRegions",
		headers:{
			'Content-Type' : 'application/json'
		},
		data:{
			GovernorateID :$scope.City,
			lang:'ar'
		}
	}).then(function(response){
		if(response.data.IsSuccess){
			$scope.Regions = response.data.Response ; 
		}
	}) ;
	} ; 
	
	$scope.RegisterOrg = function(){
		for(var i = 0 ; i<$scope.categories.length ; i++){
			if($scope.cat1[i]){
				$scope.matched1.push($scope.categories[i].ID) ; 
			}
		}
		//($scope.matched1) ; 
		//($scope.City) ; 
		//($scope.Region) ; 
		
		
			$http({
		method :"POST",
		url:"http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Organization/RegisterOrganization",
		headers:{
			'Content-Type' : 'application/json'
		},
		data:{
			NameEn:$scope.OrgNameEn,
			NameAr:$scope.OrgNameAr,
			UserName:$scope.UserName,
			Password:$scope.Password,
			DescriptionEn:$scope.DescEn,
			DescriptionAr:$scope.DescAr,
			AddressEn:$scope.AddressEn,
			AddressAr:$scope.AddressAr,
			AreaID:$scope.City,
			CityID:$scope.Region,
			CategoryList:$scope.matched1
		}
	}).then(function(response){
		if(response.data.IsSuccess){
				$("#Done").modal("show") ; 
				    window.scrollTo(0,0 );

				$scope.cat1= [] ; 
				$scope.OrgNameEn = "" ; 
				$scope.OrgNameAr = "" ; 
				$scope.UserName="" ; 
				$scope.Password="" ; 
				$scope.DescEn="" ; 
				$scope.DescAr="" ; 
				$scope.AddressEn="" ; 
				$scope.AddressAr="" ; 
				$scope.City=0 ; 
				$scope.Region=0 ; 
				$scope.matched1=[] ; 
		}
				
	}) ;	
	} ;
		$http({
		method :"POST",
		url:"http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Region/GetGovernorate",
		headers:{
			'Content-Type' : 'application/json'
		},
		data:{
			lang:'ar'
		}
	}).then(function(response){
		if(response.data.IsSuccess){
			$scope.Cities = response.data.Response ; 
		}
	}) ;
	


}])

myapp.controller('SeasonProjCtrl',['$scope', '$http', function ($scope, $http) {
    window.scrollTo(0,0 );
	
	$http({
		method :"POST",
		url:"http://yakensolution.cloudapp.net:80/DaleelElkheir/api/SeasonalProject/GetSeasonalProjects",
		headers:{
			'Content-Type' : 'application/json'
		},
		data:{
			lang:'ar'
		}
	}).then(function(response){
		if(response.data.IsSuccess){
			$scope.SPro = response.data.Response ; 
			console.log($scope.SPro) ; 
		}
	})

}])

myapp.controller('OrgsCtrl',['$scope', '$http', function ($scope, $http) {
    window.scrollTo(0,0 );
			$scope.totalDisplayed = 5;
			$scope.load = false ; 

	$scope.loadMore = function () {
			  $scope.totalDisplayed += 5;  
		};
	$scope.loadless = function () {
			  $scope.totalDisplayed -= 5;  
		};
		
	$http({
		method :"POST",
		url:"http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Organization/GetOrganizations",
		headers:{
			'Content-Type' : 'application/json'
		},
		data:{
			lang:'ar'
		}
	}).then(function(response){
		if(response.data.IsSuccess){
			$scope.load = true ; 
			$scope.Orgs = response.data.Response ; 
		}
	}) ; 
	

		$http({
		method:"POST",
		url:"http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Category/GetCategory", 
			headers:{
			'Content-Type' : 'application/json'
		},
		data:{
			lang:"ar"
		}
	}).then(function(response){
		$scope.categories = response.data.Response;
	})
		    $http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Region/GetGovernorate",
		headers: "content-type : application/json",
		data: {
			"Lang": "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.govs = response.data.Response;
						            var govspace = {ID: "", Name: ""}
            $scope.govs.push(govspace);
			//($scope.govs);
		},
		function (response) {
			//("Error from server");
		
		});
	$scope.getregs = function(x){
			//(x) ; 
		if(x!=""){
				
				$http({
		method: "POST",
		url: "http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Region/GetRegions",
		headers: "content-type : application/json",
		data: {
			"GovernorateID":x,
			"Lang": "ar"
		}
	}).then(function (response) {
			if (response.data.IsSuccess)
				$scope.regs = response.data.Response;
					            var Regionspace = {ID: "", Name: ""}
            $scope.regs.push(Regionspace);
			//($scope.regs);
		},
		function (response) {
			//("Error from server");
		});
		}
		else{
			$scope.regs= [] ; 
		}
		};


	$scope.getfilterd = function(){
		$scope.genSearch = $scope.orgsearch ;
		//($scope.genSearch) ; 
		//($scope.reg) ; 
		if($scope.reg!=undefined && $scope.reg!=""){
			
			$http({
		method :"POST",
		url:"http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Organization/GetFilterOrganizations",
		headers:{
			'Content-Type' : 'application/json'
		},
		data:{
			lang:'ar',
			RegionID:$scope.reg
		}
	}).then(function(response){
		if(response.data.IsSuccess){
			$scope.Orgs = response.data.Response ;
			$scope.load = true ; 
		}
	}) ; 
		}
		else{
			$scope.regs =[] ;
	$http({
		method :"POST",
		url:"http://yakensolution.cloudapp.net:80/DaleelElkheir/api/Organization/GetOrganizations",
		headers:{
			'Content-Type' : 'application/json'
		},
		data:{
			lang:'ar'
		}
	}).then(function(response){
		if(response.data.IsSuccess){
			$scope.Orgs = response.data.Response ; 
			$scope.load = true ; 
		}
	}) ; 
		}
	}
	

}])

