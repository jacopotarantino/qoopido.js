;(function(definition, window, document, undefined) {
	'use strict';

	var namespace  = 'qoopido',
		name       = 'support/css/transform/2d',
		initialize = function initialize() {
			[].push.apply(arguments, [ window, document, undefined ]);

			window[namespace] = window[namespace] || { };

			return (window[namespace][name] = definition.apply(null, arguments));
		};

	if(typeof define === 'function' && define.amd) {
		define([ 'qoopido/support', 'qoopido/support/css/transform' ], initialize);
	} else {
		initialize(window[namespace].support, window[namespace]['support/css/transform']);
	}
}(function(mSupport, mSupportCssTransform, window, document, undefined) {
	'use strict';

	mSupport.addTest('/css/transform/2d', function(deferred) {
		mSupportCssTransform()
			.then(function() {
				var element = mSupport.getElement('div', true);

				element.style.property = 'rotate(30deg)';

				((/rotate/).test(element.style.property)) ? deferred.resolve() : deferred.reject();
			})
			.fail(function() {
				deferred.reject();
			});
	});

	return mSupport.test['/css/transform/2d'];
}, window, document));