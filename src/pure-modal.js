(function() {
	var _this;
	
	this.PureModal = function() {
		_this = this;
		// this.transitionEnd = transitionSelect();
		_this.close_button = null;
		var defaults = {
			// selector: 'modal'
			// className: 'fade-and-drop',
			// closeButton: true,
			// content: "",
			// maxWidth: 600,
			// minWidth: 280,
			// overlay: true
			id: null,
			title: '',
			content: '',
			close_button: {
				enabled: true,
				// content: '<button class="modal-close" data-dismiss="modal"><span>x</span></button>'
			},
			footer_buttons: [],
			close_modals_on_show: false,
			width: '80%'
		}

		// options structure

		// opt = {
		// 	footer_buttons: [
		// 		{
		// 			classes: 'btn btn-primary',
		// 			title: 'Cancelar'
		// 		},
		// 		{
		// 			classes: 'btn btn-success btn-confirm',
		// 			title: 'Confirmar'
		// 		}
		// 	]
		// }

		// console.log(arguments);

		// Create options by extending defaults with the passed in arugments
		// arguments is a global object that every function has
		if (arguments[0] && typeof arguments[0] === "object") {
			_this.options = extendDefaults(defaults, arguments[0]);
		} else {
			_this.options = defaults;
		}

		// build.call(this);

	}

	// PUBLIC METHODS


	PureModal.prototype.open = function() {
		build.call(_this);
		initializeEvents.call(_this);
		// this.modal.className += ' visible';
		// document.body.classList.add('modal-open');
	}

	PureModal.prototype.close = function() {
		document.body.className = document.body.className.replace('pure-modal-open', '');
		// this.modal.className = this.modal.className.replace('visible', '');
		document.body.removeChild(_this.modal);
	}

	PureModal.prototype.addFooterButton = function(classes, title) {
		_this.options.footer_buttons.push({
			classes: classes,
			title: title
		})
	}


	// PRIVATE METHODS

	// Utility method to extend defaults with user options
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


		_this.modal = document.createElement('div');
		_this.modal.className = 'pure-modal visible';


		if(_this.options.close_button.enabled) {
			_this.close_button = document.createElement('button');
			_this.close_button.className = 'pure-modal-close';
			_this.close_button.innerHTML = '<span>x</span>'
			_this.modal.appendChild(_this.close_button);
		}

		modal_content = document.createElement('div');
		modal_content.className = 'pure-modal-content';

		modal_header = document.createElement('div');
		modal_header.className = 'pure-modal-header';
		modal_header.innerHTML = _this.options.title;
		modal_content.appendChild(modal_header);

		modal_body = document.createElement('div');
		modal_body.className = 'pure-modal-body';
		modal_body.innerHTML = _this.options.content;
		modal_content.appendChild(modal_body);

		if(_this.options.footer_buttons !== []) {
			modal_footer = document.createElement('div');
			modal_footer.className = 'pure-modal-footer';

			_this.options.footer_buttons.forEach(function(footer_button) {
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

		_this.modal.appendChild(modal_content);

		document.body.appendChild(_this.modal);
		document.body.classList.add('pure-modal-open');
	}

	function transitionSelect() {
		var el = document.createElement("div");
		if (el.style.WebkitTransition) return "webkitTransitionEnd";
		if (el.style.OTransition) return "oTransitionEnd";
		return 'transitionend';
	}

	function initializeEvents() {
		if(_this.close_button) {
			_this.close_button.addEventListener('click', _this.close.bind(_this))
		}

		// console.log(this);
		_this.modal.querySelectorAll('[data-dismiss="modal"]').forEach(function(field) {
			// console.log(this);
			field.addEventListener('click', _this.close.bind(_this));
		})

	// 	document.querySelector('[data-toggle="modal"]').addEventListener('click', function() {
	// 		var modal_background = document.createElement('div');
	// 		modal_background.className = 'modal_background';

	// 		var target = this.dataset.target;
	// 		if(target !== undefined) modal_selector = target;

	// 		var body = document.querySelector('body');
	// 		body.classList.add('modal-open');
	// 		body.appendChild(modal_background);
	// 		// $(modal_selector).addClass('visible');
	// 	})
}
}())