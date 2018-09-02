## Pure Modal
Pure Modal is a JS plugin made with Vanilla JS, this means that it has no dependencies and is fastest as possible.

## Usage
You can create a new modal from scratch
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
Or you can create from an existing element. This is interesting if you don't wanna do a new request to get the data and then load them into the modal. With this you can keep your data previously loaded.  
To accomplish that, your element must have the following structure
```html
<div class="pure-modal" id="pre_made_modal">
  <div class="pure-modal-content">
    <div class="pure-modal-header">
      <!-- 
        You can put some data without loose them , like below 
        <h3 class="title">Title</h3>
      -->
    </div>

    <div class="pure-modal-body">
        <!-- You can put some data without loose them -->
    </div>

    <div class="pure-modal-footer">
      <!-- 
        You can put some buttons without loose them, like below
        <button class="btn btn-primary" data-dismiss="modal">Cancelar</button>
        <button class="btn btn-success btn-confirm">Confirmar</button>
      -->
    </div>
  </div>
</div>
```
And then you only will need to do
```javascript
var pure_modal = new PureModal('#pre_made_modal');
```
or
```javascript
var pure_modal = new PureModal('#pre_made_modal', {
  // passing the options
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

## Important
To work as expected, you will need to put your main code inside an element with the **content-wrapper** class

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
