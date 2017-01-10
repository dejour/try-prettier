var StorageService = require('./storage');
var UriUtils = require('./uriutils');
var Editor = require('./editor');
var prettier = require('prettier');

function REPL () {
  this.storage = new StorageService();
  var state = this.storage.get('replState') || {};
  Object.assign(state, UriUtils.parseQuery());

  this.options = {};

  this.input = new Editor('editor').editor;
  this.input.setValue(UriUtils.decode(state.code || ''));

  this.output = new Editor('output').editor;
  this.output.setReadOnly(true);
  this.output.setHighlightActiveLine(false);
  this.output.setHighlightGutterLine(false);

  this.compile();
}

REPL.prototype.clearOutput = function () {
  this.setOutput('');
};

REPL.prototype.setOutput = function (output) {
  this.output.setValue(output, -1);
};

REPL.prototype.getSource = function () {
  return this.input.getValue();
};

REPL.prototype.persistState = function (state) {
  UriUtils.updateQuery(state);
  this.storage.set('replState', state);
};

REPL.prototype.compile = function () {
  this.output.session.setUseWrapMode(this.options.lineWrap);

  var transformed;
  var code = this.getSource();
  this.clearOutput();

  transformed = prettier.format(code, {
    printWidth: 80,
    tabWidth: 2,
    useFlowParser: false,
    singleQuote: false,
    trailingComma: false,
    bracketSpacing: true
  });

  this.setOutput(transformed);
};

/*
 * Initialize the REPL
 */
module.exports = REPL;
