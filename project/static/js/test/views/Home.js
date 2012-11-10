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
					// this.testTransitional.transition($('<li>FAKE ITEM</li>'));
					var rand = Math.floor(Math.random() * 3);
					this.testTransitional.transitionTo(rand);
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
