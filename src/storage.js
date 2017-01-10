/*
 * Long term storage for persistence of state/etc
 */
function StorageService () {
  this.store = window.localStorage;
}

StorageService.prototype.get = function (key) {
  try {
    return JSON.parse(this.store.getItem(key));
  } catch(e) {}
};

StorageService.prototype.set = function (key, value) {
  try {
    this.store.setItem(key, JSON.stringify(value));
  } catch(e) {}
};

module.exports = StorageService;
