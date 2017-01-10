/**
 * Code based of Babel REPL: https://github.com/babel/babel.github.io/blob/master/scripts/repl.js
 */

var REPL = require('./repl');

function onSourceChange () {
  var error;
  try {
    repl.compile();
  } catch(err) {
    error = err;
  }
  var code = repl.getSource();
  var state = Object.assign(repl.options, {
    code: code
  });
  repl.persistState(state);
  if (error) throw error;
}

var repl = new REPL();
repl.input.on('change', debounce(onSourceChange, 500));
// repl.$toolBar.on('change', onSourceChange);

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}
