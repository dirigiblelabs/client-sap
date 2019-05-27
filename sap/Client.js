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
	var response = httpClient.get(url, requestOptions);

	return getResponseData(response);
};

method.get = function(id, queryParameters, options) {
	var url = this.getUrl() + id + this.getQueryParameters(queryParameters);
	var requestOptions = options ? options : this.getOptions();
	var response = httpClient.get(url, requestOptions);
	return getResponseData(response);
};

method.create = function(entity, queryParameters, options) {
	var url = this.getUrl() + this.getQueryParameters(queryParameters);
	var requestOptions = options ? options : this.getOptions(entity);
	var response = httpClient.post(url, requestOptions);
	return getResponseData(response);
};

method.update = function(id, entity, queryParameters, options) {
	var url = this.getUrl() + id + this.getQueryParameters(queryParameters);
	var requestOptions = options ? options : this.getOptions(entity);
	var response = httpClient.put(url, requestOptions);
	return getResponseData(response);
};

method.patch = function(entity, queryParameters, options) {
	var url = this.getUrl() + this.getQueryParameters(queryParameters);
	var requestOptions = options ? options : this.getOptions(entity);
	var response = httpClient.patch(url, requestOptions);
	return getResponseData(response);
};

method.delete = function(id, queryParameters, options) {
	var url = this.getUrl() + id + this.getQueryParameters(queryParameters);
	var requestOptions = options ? options : this.getOptions();
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
	return response.headers.filter(e => e.name === "Content-Type")[0].value.indexOf("application/json") >= 0;
}

module.exports = Client;