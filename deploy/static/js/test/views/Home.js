define(

	[
		"./Page",
		"../modules/Transitional",
		"$"
	],

	function (Page, Transitional, $) {

		"use strict";

		return Page.extend({

			load : function () {
				this.sup();
				this.testTransitional = new Transitional({
					$tr : $('.transitional')
				});

				$('body').on("click", this.proxy(function () {

					var color = '#' + Math.floor(Math.random() * 16777215).toString(16),
						item = '<li style="background-color:' + color + ';"><span>Random Item</span></li>';

					this.testTransitional.transition($(item));
					// var rand = Math.floor(Math.random() * 3);
					// this.testTransitional.transitionTo(rand);

				}));

			},

			transitionIn : function () {
				this.sup();
			},

			transitionOut : function () {
				this.sup();
			},

			destroy : function () {
				this.sup();
			}
		});
	}
);
