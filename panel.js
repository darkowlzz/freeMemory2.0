let self = require('sdk/self');
let panels = require("sdk/panel");
let { FreeMemory } = require('freememory');
let sp = require("sdk/simple-prefs");

let freeMemory = new FreeMemory();

// Magical constants.
const GC = "GC";
const CC = "CC";
const MM = "MM";
const ABOUTMEMORY = "about:memory";

// FreeMemPanel Class
function FreeMemPanel (hideHandler) {
  let that = this;

  this.panel = new panels.Panel({
    width: sp.prefs['width'],
    height: sp.prefs['height'],
    contentURL: self.data.url('freeMemory.html'),
    onHide: hideHandler || null,
  });

  this.panel.port.on(GC, function () {
    that.panel.hide();
    freeMemory.gc();
  });

  this.panel.port.on(CC, function () {
    that.panel.hide();
    freeMemory.cc();
  });

  this.panel.port.on(MM, function () {
    that.panel.hide();
    freeMemory.mm();
  });

  this.panel.on('clicked', function () {
    that.panel.hide();
  });

  this.panel.port.on(ABOUTMEMORY, function () {
    require("sdk/tabs").open(ABOUTMEMORY);
    that.panel.hide();
  });

  this.panelCheck = function () {
    that.panel.resize(sp.prefs['width'], sp.prefs['height']);
  };

  this.listen = function () {
    sp.on('height', that.panelCheck);
    sp.on('width', that.panelCheck);
  }
}
exports.FreeMemPanel = FreeMemPanel;