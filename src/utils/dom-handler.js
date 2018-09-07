class DOMHandler {
	closest(node, parent_selector) {
		let parentNode = node.parentNode;

		if(parent_selector.startsWith('.')) {
			parent_selector = parent_selector.substring(1);

			while(parentNode && !parentNode.className.includes(parent_selector)) {
				parentNode = parentNode.parentNode;
			}
		} else if(parent_selector.startsWith('#')) {
			parent_selector = parent_selector.substring(1);

			while(parentNode && parentNode.getAttribute('id') !== parent_selector) {
				parentNode = parentNode.parentNode;
			}
		} else {
			while(parentNode && parentNode.nodeName.toLowerCase() !== parent_selector) {
				parentNode = parentNode.parentNode;
			}
		}

		return node.parentNode == parentNode ? parentNode : null;
	}

	index(node) {
		let siblings = 0;

		while(node) {
			node = node.previousSibling;
			siblings++;
		}

		siblings--; // para não contar o próprio elemento que originou a contagem

		return siblings;
	}

	isParent(parent, node) {
		while(node) {
			node = node.parentNode;

			if(node == parent)
				return true;
		}

		return false;
	}
}

const domHandler = new DOMHandler();
export { domHandler };