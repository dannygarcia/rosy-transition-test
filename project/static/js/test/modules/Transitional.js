define(

	[
		"rosy/modules/Module",
		"$"
	],

	function (Module, $) {

		"use strict";

		return Module.extend({

			vars : {},

			events : {},

			$list : null,

			init : function (vars) {
				this.sup(vars);
				this.setupEvents();
				this.setupTransitional();
			},

			setupEvents : function () {

				var transEndEventNames = {
					'WebkitTransition' : 'webkitTransitionEnd',
					'MozTransition' : 'transitionend',
					'OTransition' : 'oTransitionEnd',
					'msTransition' : 'MSTransitionEnd',
					'transition' : 'transitionend'
				};

				this.events.transitionEnd = transEndEventNames[Modernizr.prefixed('transition')];
			},

			setupTransitional : function () {

				var $list = this.vars.$tr.find('.list'),
					$content = this.vars.$tr.find('.content');

				this.$list = $list.children();
				this.$content = $content;

				$list.remove();

				this.transitionTo(0);

			},

			transitionTo : function (index) {
				var $new = this.$list.eq(index).clone(true);
				this.transition($new);
			},

			transition : function ($to) {
				// First, transition existing items out.
				var $existing = this.$content.children();
				this.transitionOut($existing);
				this.transitionIn($to);
			},

			transitionOut : function ($out) {

				// Remove on transition out.
				this.onTransitionEnd($out, function ($el) {
					$el.remove();
				});

				$out.attr('data-state', "out");

			},

			transitionIn : function ($in) {

				$in.appendTo(this.$content).addClass('item');

				this.setTimeout(function () {
					$in.attr('data-state', "in");
				}, 0);

			},

			onTransitionEnd : function ($el, callback) {
				if (Modernizr.csstransitions) {
					$el.on(this.events.transitionEnd, this.proxy(function (e) {
						callback.apply(this, [$(e.currentTarget)]);
					}));
				} else {
					callback.apply(this, [$el]);
				}
			},

			destroy : function () {
				this.sup();
			}

		});
	}
);