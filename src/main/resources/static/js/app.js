'use strict';

$(function() {

	 // Router
	function init() {
		// Routie is a routing library, more info: https://github.com/jgallen23/routie
		routie({
			'' : home,
			'cars': cars,
		});
	}
	// Views
	function home() {
		console.debug('home view');
		setView('home');
	}
	function cars() {
		console.debug('cars view');
		setView('cars');
	}

	// Helper functions
	function setView(view) {
		// Set active item
		$('.nav-item').removeClass('active');
		$('#' + view).addClass('active')

		// Download HTML and set page as active
		$.ajax({
			url: '/templates/' + view + '.html',
			cache: false
		}).done(function(html) {
			$('#content').html(html);
		});
	}

	init();
});
