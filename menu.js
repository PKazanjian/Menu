/* 
   Author: Philip J. Kazanjian ~ Boston MA ~ 09/03/2020
   Src: https://github.com/PKazanjian/mobilemenu
   Desc: Controls CSS on Menu based on scroll position and click
*/
/*jshint esversion: 6 */
var click = 0;
$(document).ready(function() {
	$('#windows_menu').hide("slow");
	$('#windows_menu').addClass('hide');
	$('.dots input[type=checkbox]').each(function() {
		this.checked = false;
	});
	$('.dots').mousedown(function() {
		$('#windows_menu').toggle("slow");
		$('#windows_menu').removeClass('hide');
	});
	if ($(document).scrollTop() === 0 && window.location.hash === '') {
		$('#C0').addClass('here');
	}
});
$(".sLink").click(function() {
	$("html").removeClass("scroll");
	click = 1;
	$('#windows_menu').hide("slow");
	$('#windows_menu').addClass('hide');
	$('.dots input[type=checkbox]').each(function() {
		this.checked = false;
	});
	let j = $(this).index();
	if ($("#S" + j).offset().top <= 7000) {
		$("html, body").animate({
			scrollTop: $("#S" + j).offset().top
		}, 1000);
	}
	if ($("#S" + j).offset().top >= 7000) {
		$("html, body").animate({
			scrollTop: $("#S" + j).offset().top
		}, 2000);
	}
	let start = 0;
	let end = $('.sLink').length;
	for (let i = start; i <= end; i++) {
		$('#C' + i).removeClass('here');
	}
	$('#C' + j).addClass('here');
	setTimeout(function() {
		click = 0;
	}, 2100);
});
$(window).scroll(function() {
	var pos = [];
	if (click === 0) {
		let scrollPos = $(document).scrollTop();
		let end = $('section').length - 1;
		if ($(document).scrollTop() === 0) {
			for (let i = 1; i <= end; i++) {
				$('#C' + i).removeClass('here');
			}
			$('#C0').addClass('here');
		}
		for (let i = 1; i <= end; i++) {
			pos[i] = $('#S' + i).offset().top;
		}
		for (let i = 1; i <= end; i++) {
			let k = i + 1;
			if (scrollPos > pos[i] && scrollPos < pos[k]) {
				for (let i = 0; i <= end; i++) {
					$('#C' + i).removeClass('here');
				}
				$('#C' + i).addClass('here');
			}
		}
		if ($(window).scrollTop() + $(window).height() > $(document).height() - 300) {
			for (let i = 0; i <= end; i++) {
				$('#C' + i).removeClass('here');
			}
			$('#C' + end).addClass('here');
		}
	}
});
var RC = 0;
if (window.location.hash !== '') {
	click = 1;
	var A = window.location.hash;
	A = A.split('-').pop();
	$("html, body").animate({
		scrollTop: $("#S" + A).offset().top
	}, 1000);
	$('#C' + A).addClass('here');
	setTimeout(function() {
		history.pushState("", document.title, window.location.pathname);
	}, 100);
	setTimeout(function() {
		click = 0;
	}, 1100);
}
$('.dots').bind('contextmenu', function(e) {
	if (RC === 0) {
		$('.dots input[type=checkbox]').each(function() {
			this.checked = true;
		});
		RC = 1;
	} else {
		$('.dots input[type=checkbox]').each(function() {
			this.checked = false;
		});
		RC = 0;
	}
	e.preventDefault();
	return false;
});
var p = location.pathname;
p = p.split('.')[0];
p = 'Qs' + p + '_q1.html';
$("button").click(function() {
	window.open(p, '_self');
});
