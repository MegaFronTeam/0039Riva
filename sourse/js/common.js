"use strict";
const JSCCommon = { 
	modalCall() {
		const link = '[data-fancybox="modal"], .link-modal-js';
		Fancybox.bind(link, {
			arrows: false,
			// // infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			type: 'html',
			dragToClose: false,
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			showClass: "fancybox-throwOutUp",
			hideClass: "fancybox-throwOutDown",
			l10n: {
				CLOSE: "Закрыть",
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
				MODAL: "Вы можете закрыть это модальное окно с помощью клавиши ESC.",
				ERROR: "Что-то пошло не так. Пожалуйста, повторите попытку позже",
				IMAGE_ERROR: "Изображение не найдено",
				ELEMENT_NOT_FOUND: "HTML-элемент не найден",
				AJAX_NOT_FOUND: "Ошибка при загрузке AJAX: не найдено",
				AJAX_FORBIDDEN: "Ошибка при загрузке AJAX: запрещено",
				IFRAME_ERROR: "Ошибка загрузки iframe",
			},
			on: {
				done: (fancybox, slide) => {
					JSCCommon.inputMask() 
				}
			}
		});

		Fancybox.defaults = {
			autoFocus: false,
			placeFocusBack: false,
		};

		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		document.querySelectorAll(".modal-close-js").forEach(el=>{
			el.addEventListener("click", ()=>{
				Fancybox.close();
			})
		}) 
	},
	// /modalCall
	toggleMenu() {
    const toggle = document.querySelectorAll('.toggle-menu-mobile--js');
    const menu = document.querySelector('.menu-mobile--js');
    toggle.forEach((el) => el.classList.toggle('on'));
    menu.classList.toggle('active');
    [document.body, document.querySelector('html')].forEach((el) => el.classList.toggle('fixed'));
  },
  closeMenu() {
    const toggle = document.querySelectorAll('.toggle-menu-mobile--js');
    const menu = document.querySelector('.menu-mobile--js');
    toggle.forEach((element) => element.classList.remove('on'));
    if (menu) {
      menu.classList.remove('active');
      [document.body, document.querySelector('html')].forEach((el) => el.classList.remove('fixed'));
    }
  },
  mobileMenu() {
    document.addEventListener('click', (event) => {
        let container = event.target.closest('.menu-mobile--js'); // (1)
        let toggle = event.target.closest('.toggle-menu-mobile--js'); // (1)
        if (toggle) this.toggleMenu();
        if (!container && !toggle) this.closeMenu();
      },
      { passive: true },
    );

    window.addEventListener('resize', () => {
        if (window.matchMedia('(min-width: 992px)').matches) this.closeMenu();
      },
      { passive: true },
    );
  },

	// tabs  .
	tabscostume(tab) {
		// const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		// tabs.forEach(element => {
		// 	let tabs = element;
		// 	const tabsCaption = tabs.querySelector(".tabs__caption");
		// 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		// 	const tabsWrap = tabs.querySelector(".tabs__wrap");
		// 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		// 	const random = Math.trunc(Math.random() * 1000);
		// 	tabsBtn.forEach((el, index) => {
		// 		const data = `tab-content-${random}-${index}`;
		// 		el.dataset.tabBtn = data;
		// 		const content = tabsContent[index];
		// 		content.dataset.tabContent = data;
		// 		if (!content.dataset.tabContent == data) return;

		// 		const active = content.classList.contains('active') ? 'active' : '';
		// 		// console.log(el.innerHTML);
		// 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
		// 	})


		// 	tabs.addEventListener('click', function (element) {
		// 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
		// 		if (!btn) return;
		// 		const data = btn.dataset.tabBtn;
		// 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
		// 		const content = this.querySelectorAll(`[data-tab-content]`);
		// 		tabsAllBtn.forEach(element => {
		// 			element.dataset.tabBtn == data
		// 				? element.classList.add('active')
		// 				: element.classList.remove('active')
		// 		});
		// 		content.forEach(element => {
		// 			element.dataset.tabContent == data
		// 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
		// 				: element.classList.remove('active')
		// 		});
		// 	})
		// })

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]')); 
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask({"mask":"+7(999)999-99-99", showMaskOnHover: false}).mask(InputTel);
	},
	// /inputMask
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				Fancybox.close();
				Fancybox.show([{ src: "#modal-thanks", type: "inline" }]);
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});


		// async function submitForm(event) {
		// 	event.preventDefault(); // отключаем перезагрузку/перенаправление страницы
		// 	try {
		// 		// Формируем запрос
		// 		const response = await fetch(event.target.action, {
		// 			method: 'POST',
		// 			body: new FormData(event.target)
		// 		});
		// 		// проверяем, что ответ есть
		// 		if (!response.ok) throw (`Ошибка при обращении к серверу: ${response.status}`);
		// 		// проверяем, что ответ действительно JSON
		// 		const contentType = response.headers.get('content-type');
		// 		if (!contentType || !contentType.includes('application/json')) {
		// 			throw ('Ошибка обработки. Ответ не JSON');
		// 		}
		// 		// обрабатываем запрос
		// 		const json = await response.json();
		// 		if (json.result === "success") {
		// 			// в случае успеха
		// 			alert(json.info);
		// 		} else {
		// 			// в случае ошибки
		// 			console.log(json);
		// 			throw (json.info);
		// 		}
		// 	} catch (error) { // обработка ошибки
		// 		alert(error);
		// 	}
		// }
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;

		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next().fadeToggle('fast', function () {
				$(this).toggleClass("active")
			});
		})

		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	},
	makeDDGroup() {
		$('.dd-head-js').on('click', function () {
      let clickedHead = this;
      $(this).parent().toggleClass('active');
      $(this)
        .next()
        .slideToggle(function () {
          $(this).toggleClass('active');
        });
    });
		// let parents = document.querySelectorAll('.dd-group-js');
		// for (let parent of parents) {
		// 	if (parent) {
		// 		// childHeads, kind of funny))
		// 		let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
		// 		$(ChildHeads).click(function () {
		// 			let clickedHead = this;

		// 			$(ChildHeads).each(function () {
		// 				if (this === clickedHead) {
		// 					//parent element gain toggle class, style head change via parent
		// 					$(this.parentElement).toggleClass('active');
		// 					$(this.parentElement).find('.dd-content-js').slideToggle(function () {
		// 						$(this).toggleClass('active');
		// 					});
		// 				}
		// 				else {
		// 					$(this.parentElement).removeClass('active');
		// 					$(this.parentElement).find('.dd-content-js').slideUp(function () {
		// 						$(this).removeClass('active');
		// 					});
		// 				}
		// 			});

		// 		});
		// 	}
		// }
	},
	imgToSVG() {
    const convertImages = (query, callback) => {
			const images = document.querySelectorAll(query);
	
			images.forEach(image => {
				fetch(image.src)
					.then(res => res.text())
					.then(data => {
						const parser = new DOMParser();
						const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');
	
						if (image.id) svg.id = image.id;
						if (image.className) svg.classList = image.classList;
	
						image.parentNode.replaceChild(svg, image);
					})
					.then(callback)
					.catch(error => console.error(error))
			});
		};
	
		convertImages('.img-svg-js');
  },
	disabledBtn(input = '.form-wrap__policy input', btn = ".form-wrap__btn", parent = ".form-wrap") {
		$(document).on("change", input, function () {
			let btnDisabled = $(this).parents(parent).find(btn)
			if (this.checked) {
				btnDisabled.removeAttr('disabled');
			}
			else {
				btnDisabled.attr('disabled', 'disabled');
			}
		})
	}
};
const $ = jQuery;

function eventHandler() { 
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.makeDDGroup();
	JSCCommon.disabledBtn();
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	// JSCCommon.animateScroll();
	
	// JSCCommon.CustomInputFile(); 
	// var x = window.location.host;
	// let screenName;
	// screenName = 'screen/'+document.body.dataset.bg;
	// if (screenName && x.includes("localhost:30")) {
	// 	document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(${screenName});"></div>`);
	// }

	$(document).on("click", ".catalog-block__toggle, .toggle-menu-main-js" , function(){
		$(".catalog-block__block").toggleClass("active");
		$('body').toggleClass("fixedCatalog")
	})

	$(document).on("click", ".has-children a", function(e){
		e.preventDefault();
		$(this).next().toggleClass("active");
	})

	
	$(document).on("click", ".has-children .toggle-menu-js", function(e){
		e.preventDefault();
		$(this).parents('ul').removeClass("active");
	})



	$(".dropdown-block__toggle, .dropdown-block .close-ul").on("click", function(){
		$(".dropdown-block .main-ul").toggleClass("active");
		$('body').toggleClass("fixed")
	})

	$(".topLine__show-search").on("click", function(){
		$(".form-wrap--mob").toggleClass("active");
		$(".form-wrap--mob .form-wrap__input").focus();
	})


	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
		
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();

	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiperTabs = new Swiper('.tabs-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});
	
	const swiperbreadcrumb = new Swiper('.breadcrumb-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});



	let listnav = document.querySelector('.sCatalog__bottom-tabs');
	if(listnav){

		const inst = priorityPlus(listnav,{
			innerToggleTemplate: "еще"
		});
	}
	
	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});

	const headerBlockSwiper = new Swiper('.headerBlock__slider--js', {
		slidesPerView: 1,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});

	const clientsSlider = new Swiper('.clients-slider', {
		slidesPerView: 1,
		spaceBetween: 30,
		navigation: {
			nextEl: '.clients-wrapper .swiper-button-next',
			prevEl: '.clients-wrapper .swiper-button-prev',
		},
		breakpoints: {
			// when window width is >= 480px
			480: {
			  slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
			992: {
				slidesPerView: 4,
			},
		},
	});

	const greetingsSlider = new Swiper('.greetings-slider', {
		slidesPerView: 1,
		spaceBetween: 30,
		navigation: {
			nextEl: '.greetings-wrapper .swiper-button-next',
			prevEl: '.greetings-wrapper .swiper-button-prev',
		},
		breakpoints: {
			// when window width is >= 480px
			480: {
			  slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
			992: {
				slidesPerView: 4,
			},
		},
	});

	const ourProjectsSwiper = new Swiper('.sOurProjects__slider--js', {
		spaceBetween: 30,
		slidesPerView: 1,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			// when window width is >= 480px
			480: {
			  slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
		},
	});
	function cardSliders(slider){

		const catalogCards = $(slider);
		for (const card of catalogCards) {
			
			const cardtSwiper = new Swiper(card.querySelector('.slider-card-js'), {
				slidesPerView: 1,
				spaceBetween: 0,
				speed: 600,
				pagination: {
					el: card.querySelector('.swiper-pagination'),
					type: 'bullets',
					clickable: false,
				},
			});
			//  при наведении меняется картинки на слайдере 
			$(card).on('mouseenter', '.swiper-pagination-bullet', function() {
				cardtSwiper.slideTo($(this).index()) ;
			});

		}
	}
	document.documentElement.style.setProperty('--project-card-h', $('.project-item .card-slider__slide').height()) 
	
	window.addEventListener('resize', () => {
		document.documentElement.style.setProperty('--project-card-h', $('.project-item .card-slider__slide').height())
	}, { passive: true });
	cardSliders('.card-slider');
	// modal window

	
  let  sliderWrap = document.querySelectorAll(".sProdCard__slider-wrap");
	sliderWrap.forEach((element) => {
		let thumbs = element.querySelector(".sProdCard__slider-thumbs--js");
		// let loopThumb = (thumbs.querySelector(".swiper-slide").length > 4) ? true : false;
		var sProdCardswiperThumbs = new Swiper(thumbs, {
			// init:false,
			// loop: loopThumb,
			loop: false,
			spaceBetween: 12,
			slidesPerView: 'auto',
			freeMode: true,
			observeParents: true, 
			watchSlidesProgress: true,
		});
		var sProdCardswiper2 = new Swiper(element.querySelector(".sProdCard__slider--js"), {
			loop: false,
			spaceBetween: 0,
			slidesPerView: 1, 
			loopFillGroupWithBlank: true,
			// autoplay: {
			// 	delay: 5000,
			// },
			watchOverflow: true,
			thumbs: {
				swiper: sProdCardswiperThumbs,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	});
 

	$(".range-wrap").each(function () {
		var _self = $(this);
		var $range = _self.find(".slider-js");
		var $inputFrom = _self.find(".minus");
		var $inputTo = _self.find(".plus");
		var instance;
		var min = +$inputFrom.val();
		var max = +$inputTo.val();
		var from = 0;
		var to = 0;

		$range.ionRangeSlider({
			skin: "round",
			type: "double",
			min: min,
			max: max,
			// from: 200,
			// to: 800,
			grid: false,
			grid_snap: false,
			hide_min_max: true,
			hide_from_to: true,
			onStart: updateInputs,
			onChange: updateInputs,
			onFinish: updateInputs
		});
		instance = $range.data("ionRangeSlider");

		function updateInputs(data) {
			from = data.from;
			to = data.to;

			$inputFrom.prop("value", from);
			$inputTo.prop("value", to);
		}

		$inputFrom.on("change input", function () {
			var val = $(this).prop("value");

			// validate
			if (val < min) {
				val = min;
			} else if (val > to) {
				val = to;
			}

			instance.update({
				from: val
			});

			$(this).prop("value", val);

		});

		$inputTo.on("change input", function () {
			var val = $(this).prop("value");

			// validate
			if (val < from) {
				val = from;
			} else if (val > max) {
				val = max;
			}

			instance.update({
				to: val
			});

			$(this).prop("value", val);
		});


	})

	$(document).on("click", '.toggle-filter-mobile-js', function () {
		$(this).next().slideToggle(300);
	})

	let container = document.querySelector('.container-tabs-js');

	if(container) {
		container.addEventListener('click', function (e) {
			let targetbtn = e.target.closest('[data-tabs-main]');
			if (targetbtn) {
				$('[data-tabs-main].active').removeClass('active');
				$(targetbtn).addClass('active')
				let id = targetbtn.getAttribute('data-tabs-main');
				if (id=='all') {
					$(`.sCatalog__col`).removeClass('d-none');
				}
				else{
					$(`[data-tab-main=${id}]`).removeClass('d-none');
					$(`.sCatalog__col:not([data-tab-main=${id}])`).addClass('d-none');
				}
			}
			let targetbtnsm = e.target.closest('[data-tabs-cat]');
			if (targetbtnsm) {
				e.preventDefault(); 
				$('[data-tabs-cat].active').removeClass('active');
				$(targetbtn).addClass('active')
				let idcat = targetbtnsm.getAttribute('data-tabs-cat'); 
				if (idcat=='all') {
					$(`.sCatalog__col`).removeClass('d-none-cat');
				}
				else{
					$(`[data-tab-cat=${idcat}]`).removeClass('d-none-cat');
					$(`.sCatalog__col:not([data-tab-cat=${idcat}])`).addClass('d-none-cat');
				}
			}


		})
	}

	$(document).on('click', '.search-toggle-js', function () {
		$('.topLine .form-wrap').toggleClass("active");
		$('.topLine .form-wrap input').trigger("focus");
	})

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }