class SimpleAjax {
	constructor() {
		this.options = {
			method: 'GET',
			url: null,
			async: true,
			data: '',
			responseType: 'text',
			headers: [],
			onError: function(response, xhr) {},
			onSuccess: function(response, xhr) {},
			onComplete: function(response, xhr) {},
			beforeSend: function(xhr) {}
		}
	}

	_setRequestHeaders(xhr) {
		this.options.headers.forEach(header => xhr.setRequestHeader(header.name, header.value))
	}

	request(options = {}) {
		var _this = this;
		_this._overrideOptionsProperties(options);

		if(_this._isOptionsValid()) {
			let xhr = new XMLHttpRequest();
			xhr.open(_this.options.method, _this.options.url, _this.options.async);

			xhr.onreadystatechange = function() {
				let status = this.status.toString();

				if(this.readyState == 4) {
					let response = this.response;

					if(status.startsWith('2')) {
						if(_this.options.responseType === 'json') {
							response = JSON.parse(response);
						}

						_this.options.onSuccess(response, this);
					} else if(status.startsWith('4') || status.startsWith('5')) {
						console.error(status, ' - ', this.statusText);
						_this.options.onError(response, this);
					}

					_this.options.onComplete(response, this);

					console.log(xhr.getAllResponseHeaders());
				}
			}


			if(_this.options.method === 'POST' && typeof _this.options.data === 'string') {
				xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			}

			this._setRequestHeaders(xhr);
			this.options.beforeSend(xhr);

			xhr.send(_this.options.data);
		} else {
			console.error('ERROR - Specify the options correctly');
		}
	}

	_overrideOptionsProperties(custom_options) {
		for (var option_key in custom_options) {
			if (this.options.hasOwnProperty(option_key))
				this.options[option_key] = custom_options[option_key];
		}
	}

	_isOptionsValid() {
		if(typeof this.options.url !== 'string' || this.options.url == null || this.options.url.trim() === '')
			return false;

		return true;
	}
}

const simpleAjax = new SimpleAjax();
export { simpleAjax };