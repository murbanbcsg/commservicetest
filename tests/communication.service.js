/// <reference path="communication.service.js">
"use strict";

describe('Communication Service tests', function() {
	var comSrv, $httpBackend, $http;

	beforeEach(function() {
		module('communicationComponent');
		inject(function($injector) {
			comSrv = $injector.get('communicationService');
			$httpBackend = $injector.get('$httpBackend');
			$http = $injector.get('$http');
		});

		$httpBackend.when("GET", "/testapi").respond(200, {
			success: true
		});
		$httpBackend.when("GET", "/nonvalid").respond(500, {
			success: false
		});
		$httpBackend.when("POST", "/testapi").respond(200, {
			success: true
		});
		$httpBackend.when("POST", "/nonvalid").respond(500, {
			success: false
		});
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('Get request without URI gives an error exception', function() {
		expect(comSrv.get()).toEqual('URI not specified');
	});

	it('Get standard URI with callback', function() {
		comSrv.get('/testapi').success(function(response) {
			expect(response.success).toEqual(true);
		}).error(function(response) {
			expect(false).toEqual(true);
		});
		$httpBackend.flush();
	});

	it("Get request on valid URI (promise)", function() {
		var result;
		comSrv.get('/testapi', true).then(function(response) {
			result = response;
		});
		$httpBackend.flush();
		expect(result.success).toEqual(true);
	});

	it("Get request on non-valid URI (promise)", function() {
		var result;
		comSrv.get('/nonvalid', true).catch(function(response) {
			result = response;
		});
		$httpBackend.flush();
		expect(result).toEqual('AJAX Call Rejected');
	});



	it('Post request without URI gives an error exception', function() {
		expect(comSrv.post()).toEqual('URI not specified');
	});

	it('Post request without DATA gives an error exception', function() {
		expect(comSrv.post('/testapi')).toEqual('DATA is not specified');
	});

	it('Standard POST request with callback', function() {
		comSrv.post('/testapi', {
			data: [1, 2, 3]
		}).success(function(response) {
			expect(response.success).toEqual(true);
		}).error(function(response) {
			expect(false).toEqual(true);
		});
		$httpBackend.flush();
	});

	it('Post request on valid URI (promise)', function() {
		var result;
		comSrv.post('/testapi', {
			data: [1, 2, 3]
		}, true).then(function(response) {
			result = response;
		});
		$httpBackend.flush();
		expect(result.success).toEqual(true);
	});

	it('Post request on non-valid URI (promise)', function() {
		var result;
		comSrv.post('/nonvalid', {
			data: [1, 2, 3]
		}, true).catch(function(response) {
			result = response;
		});
		$httpBackend.flush();
		expect(result).toEqual('AJAX POST Rejected');
	});



	it('Set "Content-Type" to "application/x-www-form-urlencoded"', function() {
		comSrv.setHeader('Content-Type', 'application/x-www-form-urlencoded');
		expect($http.defaults.headers.common['Content-Type']).toBe('application/x-www-form-urlencoded');
	});

});