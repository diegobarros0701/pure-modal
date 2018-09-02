(function() {
	
	this.PureModal = function() {
		var _this = this;
		
		var defaults = {
			id: null,
			title: '',
			content: '',
			show_close_button: true,
			footer_buttons: [],
			close_modals_on_show: false,
			width: '80%'
		}

		if(typeof arguments[0] === "string") {

			if(typeof arguments[1] === "object") {
				_this.options = extendDefaults(defaults, arguments[1]);
			} else {
				_this.options = defaults;
			}

			var selector = arguments[0];
			var pre_made_modal = document.querySelector(selector);

			_this.options.title = pre_made_modal.querySelector('.pure-modal-header').innerHTML;
			_this.options.content = pre_made_modal.querySelector('.pure-modal-body').innerHTML;

			pre_made_modal.querySelectorAll('.pure-modal-footer button').forEach(function(button) {
					_this.options.footer_buttons.push({
						classes: button.className,
						title: button.textContent,
						dismiss: (button.getAttribute('data-dismiss') === 'modal')
					});
				})

			pre_made_modal.parentNode.removeChild(pre_made_modal);
		} else if(typeof arguments[0] === "object") {
			_this.options = extendDefaults(defaults, arguments[0]);
		} else {
			_this.options = defaults;
		}
	}

	// PUBLIC METHODS


	PureModal.prototype.open = function() {
		build.call(this);
		initializeEvents.call(this);
	}

	PureModal.prototype.close = function() {
		document.body.className = document.body.className.replace('pure-modal-open', '');
		// this.modal.className = this.modal.className.replace('visible', '');
		document.body.removeChild(this.modal);
	}

	PureModal.prototype.addFooterButton = function(classes, title) {
		this.options.footer_buttons.push({
			classes: classes,
			title: title
		})
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

		this.modal = document.createElement('div');
		this.modal.className = 'pure-modal visible';


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

		if(this.options.footer_buttons !== []) {
			modal_footer = document.createElement('div');
			modal_footer.className = 'pure-modal-footer';

			this.options.footer_buttons.forEach(function(footer_button) {
				var btn_footer = document.createElement('button');
				btn_footer.className = footer_button.classes;
				btn_footer.innerText = footer_button.title;

				if(footer_button.dismiss) {
					btn_footer.setAttribute('data-dismiss', 'modal');
				}

				modal_footer.appendChild(btn_footer);
				// modal_content += "<button class='"+ footer_button.classes + "' data-dismiss='modal'>"+ footer_button.title +"</button";
			})

			modal_content.appendChild(modal_footer);
		}

		this.modal.appendChild(modal_content);

		document.body.appendChild(this.modal);
		document.body.classList.add('pure-modal-open');
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
	}
}())