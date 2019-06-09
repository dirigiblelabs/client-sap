/*eslint-disable no-extend-native */

var httpClientAsync = require("http/v4/clientAsync");
var clientAsync = httpClientAsync.getInstnace();

var method = ClientAsync.prototype;

function ClientAsync(configurations, path) {
	this.configurations = configurations;
	this.path = path;
}

method.getUrl = function(queryParameters, id) {
	return this.configurations.host + this.path + (id || "") + this.getQueryParameters(queryParameters);
};

method.getQueryParameters = function(parameters) {
	var queryParameters = "";
	if (parameters !== undefined && parameters !== null) {
		for (var i in parameters) {
			if (parameters[i] === "" || parameters[i] === null || parameters[i] === undefined) {
				continue;
			} else if (queryParameters === "") {
				queryParameters += "?";
			} else {
				queryParameters += "&";
			}
			queryParameters += i + "=" + parameters[i];
		}
	}
	return queryParameters;
};

method.getOptions = function(options, entity) {
	var defaultOptions = {
		headers: this.configurations.headers,
		sslTrustAllEnabled: true
	};
	if (entity !== undefined && entity !== null) {
		defaultOptions.headers.push({
			name: "Content-Type",
			value: "application/json"
		}, {
			name: "Accept",
			value: "application/json"
		});
		defaultOptions.text = JSON.stringify(entity);
		defaultOptions.characterEncodingEnabled = false;
	}
	Object.assign(defaultOptions, options);
	return defaultOptions;
};

method.listAsync = function(callback, queryParameters, options) {
	var url = this.getUrl(queryParameters);
	var requestOptions = this.getOptions(options);
	clientAsync.getAsync(url, callback, requestOptions);
};

method.getAsync = function(callback, id, queryParameters, options) {
	var url = this.getUrl(queryParameters, id);
	var requestOptions = this.getOptions(options);
	clientAsync.getAsync(url, callback, requestOptions);
};

method.createAsync = function(callback, entity, queryParameters, options) {
	var url = this.getUrl(queryParameters);
	var requestOptions = this.getOptions(options, entity);
	clientAsync.postAsync(url, callback, requestOptions);
};

method.updateAsync = function(callback, id, entity, queryParameters, options) {
	var url = this.getUrl(queryParameters, id);
	var requestOptions = this.getOptions(options, entity);
	clientAsync.putAsync(url, callback, requestOptions);
};

method.patchAsync = function(callback, entity, queryParameters, options) {
	var url = this.getUrl(queryParameters);
	var requestOptions = this.getOptions(options, entity);
	clientAsync.patchAsync(url, callback, requestOptions);
};

method.deleteAsync = function(callback, id, queryParameters, options) {
	var url = this.getUrl(queryParameters, id);
	var requestOptions = this.getOptions(options);
	clientAsync.deleteAsync(url, callback, requestOptions);
};

method.execute = function() {
	clientAsync.execute();
	clientAsync = httpClientAsync.getInstnace();
};

module.exports = ClientAsync;