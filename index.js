let self = require('sdk/self');
let { ToggleButton } = require('sdk/ui/button/toggle');
let panels = require('sdk/panel');
let { Hotkey } = require('sdk/hotkeys');
let { FreeMemory } = require('freememory');
let { FreeMemPanel } = require('panel');
let hk = require('keys');
let { Timer } = require('timer');

let freeMemory = new FreeMemory();

// Panel at the center of the screen
let freePanel = new FreeMemPanel();

// Panel attached to button
let buttonPanel = new FreeMemPanel(handleHide);

hk.createHotkey(freePanel.panel);

hk.listen(freePanel.panel);

freePanel.listen();
buttonPanel.listen();

// Freemem button
let button = ToggleButton ({
  id: 'freemem-button',
  label: 'Free Mem',
  icon: self.data.url('freeMemory.png'),
  onChange: handleChange
});

let timer = new Timer();

function handleChange (state) {
  if (state.checked) {
    buttonPanel.panel.show({
      position: button
    });
  }
}

function handleHide () {
  button.state('window', {checked: false});
}