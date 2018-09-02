## Pure Modal
Pure Modal is a JS plugin made with Vanilla JS, this means that it has no dependencies and is fastest as possible.

## Usage
```javascript
var pure_modal = new PureModal({
  id: 'myPureModalId',
  classes: 'class1 class2 class3',
  title: 'Modal title',
  content: 'My modal content',
  close_button: {
    enabled: true
  },
  footer_buttons: [],
  close_modals_on_show: false,
  width: '80%',
  auto_open: false,
  onOpen: function() {},
  onClose: function() {}
});
```

### Footer buttons
If you want to set the footer buttons on the constructor, do as shown below
```javascript
var pure_modal = new PureModal({
  // another properties
  footer_buttons: [
    {
      classes: 'btn btn-succes',
      title: 'Confirm'
    },
    {
      classes: 'btn btn-danger',
      title: 'Cancel'
    }
  ],
  // another properties
});
```

## Methods

#### open()
Open the modal
```javascript
pure_modal.open();
```

#### close()
Close the modal
```javascript
pure_modal.close();
```

#### addFooterButton(classes, title)
Add a new button to the modal footer
```javascript
pure_modal.addFooterButton('btn btn-success', 'Confirm');
```

## Events
The events can be setted in the pure modal constructor or by calling the matching method

#### onOpen
Event fired on open the modal
```javascript
pure_modal.onOpen(function() {
  // do something
});
```

#### onClose
Event fired on close the modal
```javascript
pure_modal.onClose(function() {
  // do something
});
```
