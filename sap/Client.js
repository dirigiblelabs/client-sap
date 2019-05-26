/*eslint-disable no-extend-native */

var httpClient = require("http/v4/client");

var method = Client.prototype;

function Client(configurations, path) {
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

method.list = function(queryParameters, options) {
	var url = this.getUrl() + this.getQueryParameters(queryParameters);
	var requestOptions = options ? options : this.getOptions();
	return httpClient.get(url, requestOptions);
};

method.get = function(id, queryParameters, options) {
	var url = this.getUrl() + id + this.getQueryParameters(queryParameters);
	var requestOptions = options ? options : this.getOptions();
	return httpClient.get(url, requestOptions);
};

method.create = function(entity, queryParameters, options) {
	var url = this.getUrl() + this.getQueryParameters(queryParameters);
	var requestOptions = options ? options : this.getOptions(entity);
	return httpClient.post(url, requestOptions);
};

method.update = function(id, entity, queryParameters, options) {
	var url = this.getUrl() + id + this.getQueryParameters(queryParameters);
	var requestOptions = options ? options : this.getOptions(entity);
	return httpClient.put(url, requestOptions);
};

method.patch = function(entity, queryParameters, options) {
	var url = this.getUrl() + this.getQueryParameters(queryParameters);
	var requestOptions = options ? options : this.getOptions(entity);
	return httpClient.patch(url, requestOptions);
};

method.delete = function(id, queryParameters, options) {
	var url = this.getUrl() + id + this.getQueryParameters(queryParameters);
	var requestOptions = options ? options : this.getOptions();
	return httpClient.delete(url, requestOptions);
};

module.exports = Client;