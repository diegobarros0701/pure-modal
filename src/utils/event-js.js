import { domHandler } from './dom-handler';

class EventJS {

	on(eventName, selector, callback) {
		this._element.addEventListener(eventName, (e) => {
			let element_selector = document.querySelector(selector);

			if(this._isTheTarget(e.target, element_selector)) {
				callback(e);
			}
		})
	}

	node(element) {
		this._element = element;

		return this;
	}

	// To be the target, needs to be the same as the target and must be child of the element caller
	_isTheTarget(target, element_selector) {
		return target == element_selector && domHandler.isParent(this._element, element_selector);
	}

}

const eventJS = new EventJS();
export { eventJS };