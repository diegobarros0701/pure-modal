(function() {
	// var last_button_index;
	this.PureModal = function() {
		var _this = this;
		
		var defaults = {
			id: null,
			classes: null,
			title: '',
			content: '',
			show_close_button: true,
			footer_buttons: [],
			close_modals_on_show: false,
			width: '80%',
			append_to_body: false,
			build_on_show: false, // TO DO
			wrap_content: {
				enabled: false,
				class: 'content-wrapper'
			}
		}

		if(typeof arguments[0] === "string") {

			if(typeof arguments[1] === "object") {
				_this.options = extendDefaults(defaults, arguments[1]);
			} else {
				_this.options = defaults;
			}

			var selector = arguments[0];
			_this.modal = document.querySelector(selector);

			_this.options.id = _this.modal.getAttribute('id');
			_this.options.classes = _this.modal.className;
			_this.options.title = _this.modal.querySelector('.pure-modal-header').innerHTML;
			_this.options.content = _this.modal.querySelector('.pure-modal-body').innerHTML;

			_this.modal.querySelectorAll('.pure-modal-footer button').forEach(function(button) {
				var remove_type = undefined;

				if(button.getAttribute('data-dismiss')) {
					remove_type = 'dismiss';
				} else if(button.getAttribute('data-destroy')) {
					remove_type = 'destroy';
				}

				_this.options.footer_buttons.push({
					classes: button.className,
					title: button.textContent,
					remove_type: remove_type
				});

				_this.last_button_index++;
			})

			// if(_this.options.wrap_content.enabled) {
			// 	var wrap_content_element = document.createElement('div');
			// 	wrap_content_element.className = _this.options.wrap_content.class;


			// 	document.body.appendChild(wrap_content_element);

			// 	_this.options.append_to_body = true;
			// }

			if(_this.options.append_to_body) {
				_this.modal.parentNode.removeChild(_this.modal);
				document.body.appendChild(_this.modal);
			}
		} else if(typeof arguments[0] === "object") {
			_this.options = extendDefaults(defaults, arguments[0]);
		} else {
			_this.options = defaults;
		}


		_this.last_button_index = _this.options.footer_buttons.length;
	}

	// PUBLIC METHODS


	PureModal.prototype.open = function() {
		build.call(this);
		initializeEvents.call(this);
	}

	PureModal.prototype.close = function() {
		document.body.className = document.body.className.replace('pure-modal-open', '');
		this.modal.className = this.modal.className.replace(/\s*.(visible)/g, ''	);
	}

	PureModal.prototype.destroy = function() {
		document.body.removeChild(this.modal);
		document.body.className = document.body.className.replace('pure-modal-open', '');
	}

	PureModal.prototype.setProperty = function(prop, value)  {
		this.options[prop] = value;
		updateModal.call(this, prop);
	}

	PureModal.prototype.setTitle = function(title) {
		this.options.title = '<h3 class="title">'+ title +'</h3>';
		updateModal.call(this, 'title');
	}

	PureModal.prototype.setContent = function(content) {
		this.options.content = content;
		updateModal.call(this, 'content');
	}

	PureModal.prototype.addFooterButton = function(classes, title, remove_type) {
		this.options.footer_buttons.push({
			classes: classes,
			title: title,
			remove_type: remove_type
		})

		updateModal.call(this, 'footer_buttons');

		this.last_button_index++;
	}

	// PRIVATE METHODS

	function extendDefaults(source, properties) {
		var property;
		for (property in properties) {
			if (properties.hasOwnProperty(property)) {
				source[property] = properties[property];
			}
		}
		return source;
	}

	function build() {
		var modal_content;
		var modal_header;
		var modal_body;
		var modal_footer;
		var close_button;

		if(this.modal === undefined) {

			this.modal = document.createElement('div');
			this.modal.className = 'pure-modal';
			if(this.options.id) this.modal.setAttribute('id', this.options.id);
			if(this.options.classes) {
				var _this = this;
				_this.options.classes.match(/\S+/g).forEach(function(class_found) {
					if(!_this.modal.className.includes(class_found)) {
						_this.modal.className += ' ' + class_found;
					}
				})
			}


			if(this.options.show_close_button) {
				this.close_button = document.createElement('button');
				this.close_button.className = 'pure-modal-close';
				this.close_button.innerHTML = '<span>x</span>'
				this.modal.appendChild(this.close_button);
			}

			modal_content = document.createElement('div');
			modal_content.className = 'pure-modal-content';
			if(this.options.width) modal_content.style.width = this.options.width;

			modal_header = document.createElement('div');
			modal_header.className = 'pure-modal-header';
			modal_header.innerHTML = this.options.title;
			modal_content.appendChild(modal_header);

			modal_body = document.createElement('div');
			modal_body.className = 'pure-modal-body';
			modal_body.innerHTML = this.options.content;
			modal_content.appendChild(modal_body);

			if(this.options.footer_buttons.length !== 0) {
				modal_footer = document.createElement('div');
				modal_footer.className = 'pure-modal-footer';

				var _this = this;
				this.options.footer_buttons.forEach(function(footer_button_data) {
					var btn_footer = createFooterButton.call(_this, footer_button_data);
					modal_footer.appendChild(btn_footer);

				})

				modal_content.appendChild(modal_footer);
			}

			this.modal.appendChild(modal_content);

			document.body.appendChild(this.modal);
		} 

		this.modal.className += ' visible';
		document.body.classList.add('pure-modal-open');
	}

	function updateModal(modal_part = 'all') {

		if(this.modal) {
			if(modal_part === 'all' || modal_part === 'title')
				this.modal.querySelector('.pure-modal-header').innerHTML = this.options.title;

			if(modal_part === 'all' || modal_part === 'content')
				this.modal.querySelector('.pure-modal-body').innerHTML = this.options.content;

			if(modal_part === 'all' || modal_part === 'footer_buttons') {
				var modal_footer = this.modal.querySelector('.pure-modal-footer');

				if(this.options.footer_buttons.length === 0) {
					modal_footer.innerHTML = '';
					this.last_button_index = 0;
				}

				for(var i = this.last_button_index; i < this.options.footer_buttons.length; i++) {
					var footer_button_data = this.options.footer_buttons[i];
					var btn_footer = createFooterButton.call(this, footer_button_data);

					modal_footer.append(btn_footer);
				}
			}

		}
	}

	function createFooterButton(footer_button_data) {
		var btn_footer = document.createElement('button');
		btn_footer.className = footer_button_data.classes;
		btn_footer.innerText = footer_button_data.title;

		if(footer_button_data.remove_type) {
			btn_footer.setAttribute('data-'+footer_button_data.remove_type, 'modal');
		}

		return btn_footer;
	}

	function transitionSelect() {
		var el = document.createElement("div");
		if (el.style.WebkitTransition) return "webkitTransitionEnd";
		if (el.style.OTransition) return "oTransitionEnd";
		return 'transitionend';
	}

	function initializeEvents() {
		var _this = this;

		if(_this.close_button) {
			_this.close_button.addEventListener('click', _this.close.bind(_this))
		}

		_this.modal.querySelectorAll('[data-dismiss="modal"]').forEach(function(field) {
			field.addEventListener('click', _this.close.bind(_this));
		})

		_this.modal.querySelectorAll('[data-destroy="modal"]').forEach(function(field) {
			field.addEventListener('click', _this.destroy.bind(_this));
		})
	}
}())