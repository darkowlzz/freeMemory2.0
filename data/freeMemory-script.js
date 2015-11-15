/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Magical constants.
const GC = "GC";
const CC = "CC";
const MM = "MM";

const COMPLETED = "completed";
const CLICKED = "clicked";
const OPEN = "open";
const HELP = "HELP";

const ABOUTMEMORY = "about:memory";
const UP = 38, DOWN = 40;

var focusIndex = 0;
var optsMap = new WeakMap();

var options = document.getElementsByClassName('option');
options = [].slice.call(options);
var index = 0;
options.forEach(function (option) {
  optsMap.set(option, index);
  index += 1;
  option.addEventListener('mouseover', function (e) {
    e.target.focus();
  }, false);
})

document.onkeypress = function (event) {
  switch (event.keyCode) {
    case UP:
      moveUp();
      break;

    case DOWN:
      moveDown();
      break;

    default:
  }
}

function getFocusIndex () {
  var curElement = document.activeElement;
  return optsMap.get(curElement);
}

function moveDown () {
  var curFocus = getFocusIndex();
  if (curFocus < 3) {
    options[curFocus+1].focus();
  }
}

function moveUp () {
  var curFocus = getFocusIndex();
  if (curFocus > 0) {
    options[curFocus-1].focus();
  }
}

/**
 * Define onclick events on all the divs and
 * emit proper magic constants.
 */
var gc_div = document.getElementById("gc");
gc_div.onclick = function() {
  addon.port.emit(GC);
}

var cc_div = document.getElementById("cc");
cc_div.onclick = function() {
  addon.port.emit(CC);
}

var mm_div = document.getElementById("mm");
mm_div.onclick = function() {
  addon.port.emit(MM);
}

var about_div = document.getElementById("aboutmemory");
about_div.onclick = function() {
  addon.port.emit(CLICKED);
  addon.port.emit(ABOUTMEMORY);
  //window.open(aboutMemory);
}

/*
var help_div = document.getElementById("help");
help_div.onclick = function() {
  addon.port.emit(CLICKED);
  addon.port.emit(HELP);
}
*/

addon.port.on(OPEN, function() {
  var opt = document.getElementById("gc");
  opt.focus();
  focusIndex = 0;
});
