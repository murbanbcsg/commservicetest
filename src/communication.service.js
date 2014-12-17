/**
 * Common Factory for basic HTTP communication
 * @author Miklos Urban <miklos.urban@bcsg.com>
 */
(function() {
	'use strict';
	angular.module('communicationComponent', [])
	/**
	 * @dependency	$http	AngularJS base http service wrapper
	 * @dependency	$q	AngularJS base Promise service wrapper
	 * @return	{[object]}
	 */
	.factory('communicationService', ['$http', '$q',
		function($http, $q) {
			return {
				/**
				 * Standard GET request using $http and $q[OPTION]
				 * @param	{[string]}	uri	URL address of request
				 * @param	{[bool]}	deferred	[OPTION] Bool flag of promised result
				 * @return	{[object]}	HTTP Request Object or Promise
				 * @example
				 * ```javascript
				 *     // promise based request
				 *     communicationService.get('/api/get', true)
				 *         .then(function(data) {
				 *             console.info('deferred result', data);
				 *         })
				 *         .catch(function(response) {
				 *             console.error('request rejected');
				 *         });
				 *
				 *     // standard request
				 *     communicationService.get('/api/get')
				 *         .success(function(response) {
				 *             console.info('result', response);
				 *         })
				 *         .error(function(response) {
				 *             console.error('request error');
				 *         });
				 * ```
				 */
				get: function get(uri, deferred) {
					var defResponse = null,
						request = null;
					deferred = (deferred === undefined) ? false : deferred;

					if (uri === undefined) {
						return 'URI not specified';
					}

					request = $http.get(uri);

					if (deferred === true) {
						defResponse = $q.defer();
						request
							.success(function(response) {
								defResponse.resolve(response);
							})
							.error(function(response) {
								defResponse.reject('AJAX Call Rejected');
							});
						return defResponse.promise;
					}
					return request;
				},
				/**
				 * Standard POST request using $http and $q[OPTION]
				 * @param  {[string]} uri      URL address of request
				 * @param  {[object]} data     JSON data object which going to send
				 * @param  {[bool]} deferred [OPTION] Bool flag of promised result
				 * @return {[object]}          HTTP Request Object or Promise
				 * @example
				 * ```javascript
				 *     // promise based request
				 *     communicationService.post('/api/post', {data:[1,2,3]}, true)
				 *         .then(function(data) {
				 *             console.info('deferred result', data);
				 *         })
				 *         .catch(function(response) {
				 *             console.error('request rejected');
				 *         });
				 *
				 *     // standard request
				 *     communicationService.post('/api/post', {data:[1,2,3]})
				 *         .success(function(response) {
				 *             console.info('result', response);
				 *         })
				 *         .error(function(response) {
				 *             console.error('request error');
				 *         });
				 * ```
				 */
				post: function post(uri, data, deferred) {
					var defResponse = null,
						request = null;
					deferred = (deferred === undefined) ? false : deferred;

					if (uri === undefined) {
						return 'URI not specified';
					}
					if (data === undefined) {
						return 'DATA is not specified';
					}

					request = $http.post(uri, data);

					if (deferred === true) {
						defResponse = $q.defer();
						request
							.success(function(response,a,b,c,d) {
								defResponse.resolve(response,a,b,c,d);
							})
							.error(function(response) {
								defResponse.reject('AJAX POST Rejected');
							});
						return defResponse.promise;
					}
					return request;
				},
				/**
				 * Header parameter setter method
				 * @param {[string]} key   Key name of parameter
				 * @param {[string]} value Value of paramerte
				 * @example
				 * ```javascript
				 *     // set accept header
				 *     communicationService.setHeader('Accept', 'application/json');
				 * ```
				 */
				setHeader: function setHeader(key, value) {  // TODO separated header setup for different HTTP methods
					$http.defaults.headers.common[key] = value;
				}
				//update: function update() {}
				//delete: function delete() {}
				//options: function options() {}
				//head: function head() {}
			};
		}
	]);
})();