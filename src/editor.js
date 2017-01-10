var ace = require('brace');
require('brace/mode/javascript');
require('brace/theme/tomorrow_night');

function Editor (el, opts) {
  opts = opts || {};
  this.editor = ace.edit(el);
  this.session = this.editor.getSession();
  this.document = this.session.getDocument();
  this.editor.setTheme('ace/theme/tomorrow_night');

  this.editor.$blockScrolling = Infinity;

  this.editor.setShowPrintMargin(false);
  this.editor.commands.removeCommands(['gotoline', 'find']);
  this.session.setMode('ace/mode/javascript');

  this.session.setUseSoftTabs(true);
  this.session.setTabSize(2);
  this.session.setUseWorker(false);

  this.editor.setOption('scrollPastEnd', 0.33);
}

module.exports = Editor;
