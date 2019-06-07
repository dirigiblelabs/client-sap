/*eslint-disable no-extend-native */

var httpClientAsync = require("http/v4/clientAsync");
var clientAsync = httpClientAsync.getInstnace();

var method = ClientAsync.prototype;

function ClientAsync(configurations, path) {
	this.configurations = configurations;
	this.path = path;
}

method.getUrl = function() {
	return this.configurations.host + this.path;
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

method.getOptions = function(entity) {
	var options = {
		headers: this.configurations.headers,
		sslTrustAllEnabled: true
	};
	if (entity !== undefined && entity !== null) {
		options.headers.push({
			name: "Content-Type",
			value: "application/json"
		});
		options.text = JSON.stringify(entity);
	}
	return options;
};

method.listAsync = function(callback, queryParameters, options) {
	var url = this.getUrl() + this.getQueryParameters(queryParameters);
	var requestOptions = options ? options : this.getOptions();
	clientAsync.getAsync(url, callback, requestOptions);
};

method.getAsync = function(callback, id, queryParameters, options) {
	var url = this.getUrl() + id + this.getQueryParameters(queryParameters);
	var requestOptions = options ? options : this.getOptions();
	clientAsync.getAsync(url, callback, requestOptions);
};

method.createAsync = function(callback, entity, queryParameters, options) {
	var url = this.getUrl() + this.getQueryParameters(queryParameters);
	var requestOptions = options ? options : this.getOptions(entity);
	clientAsync.postAsync(url, callback, requestOptions);
};

method.updateAsync = function(callback, id, entity, queryParameters, options) {
	var url = this.getUrl() + id + this.getQueryParameters(queryParameters);
	var requestOptions = options ? options : this.getOptions(entity);
	clientAsync.putAsync(url, callback, requestOptions);
};

method.patchAsync = function(callback, entity, queryParameters, options) {
	var url = this.getUrl() + this.getQueryParameters(queryParameters);
	var requestOptions = options ? options : this.getOptions(entity);
	clientAsync.patchAsync(url, callback, requestOptions);
};

method.deleteAsync = function(callback, id, queryParameters, options) {
	var url = this.getUrl() + id + this.getQueryParameters(queryParameters);
	var requestOptions = options ? options : this.getOptions();
	clientAsync.deleteAsync(url, callback, requestOptions);
};

method.execute = function() {
	clientAsync.execute();
};

module.exports = ClientAsync;