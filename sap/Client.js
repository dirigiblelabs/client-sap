/*eslint-disable no-extend-native */

var httpClient = require("http/v4/client");

var method = Client.prototype;

function Client(configurations, path) {
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

method.list = function(queryParameters, options) {
	var url = this.getUrl(queryParameters);
	var requestOptions = this.getOptions(options);
	var response = httpClient.get(url, requestOptions);
	return getResponseData(response);
};

method.get = function(id, queryParameters, options) {
	var url = this.getUrl(queryParameters, id);
	var requestOptions = this.getOptions(options);
	var response = httpClient.get(url, requestOptions);
	return getResponseData(response);
};

method.create = function(entity, queryParameters, options) {
	var url = this.getUrl(queryParameters);
	var requestOptions = this.getOptions(options, entity);
	var response = httpClient.post(url, requestOptions);
	return getResponseData(response);
};

method.update = function(id, entity, queryParameters, options) {
	var url = this.getUrl(queryParameters, id);
	var requestOptions = this.getOptions(options, entity);
	var response = httpClient.put(url, requestOptions);
	return getResponseData(response);
};

method.patch = function(entity, queryParameters, options) {
	var url = this.getUrl(queryParameters);
	var requestOptions = this.getOptions(options, entity);
	var response = httpClient.patch(url, requestOptions);
	return getResponseData(response);
};

method.delete = function(id, queryParameters, options) {
	var url = this.getUrl(queryParameters, id);
	var requestOptions = this.getOptions(options);
	var response = httpClient.delete(url, requestOptions);
	return getResponseData(response);
};

function getResponseData(response) {
	var text = response.text;
	if (isJsonResponse(response)) {
		return JSON.parse(text);
	}
	return text;
}

function isJsonResponse(response) {
	var contentTypeHeader = response.headers.filter(e => e.name === "Content-Type" || e.name === "content-type");
	return contentTypeHeader.length > 0 && contentTypeHeader[0].value.indexOf("application/json") >= 0;
}

module.exports = Client;