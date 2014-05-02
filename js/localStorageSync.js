/**
 * Created by xiawanqiang on 14-1-11.
 */

YUI.add('localStorageSync', function(Y) {
    Y.namespace('todoapp');

    Y.todoapp.localStorageSync = function(key) {
        var localStorage,
            data;

        if (!key) {
            Y.error('No storage key specified.');
        }

        if (Y.config.win.localStorage) {
            localStorage = Y.config.win.localStorage;
        }

        data = Y.JSON.parse((localStorage && localStorage.getItem(key)) || '{}');

        function destroy(id) {
            var modelHash = data[id];

            if (!Y.Lang.isUndefined(modelHash)) {
                delete data[id];
                save();
            }

            return modelHash;
        }

        function generateId() {
            var id = '',
                i  = 4;

            while (i > 0) {
                id += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                i -= 1;
            }

            return id;
        }

        function get(id) {
            return id ? data[id] : Y.Object.values(data);
        }

        function save() {
            localStorage && localStorage.setItem(key, Y.JSON.stringify(data));
        }

        function set(model) {
            var hash = model.toJSON(),
                idAttribute = model.idAttribute;

            if (!Y.Lang.isValue(hash[idAttribute])) {
                hash[idAttribute] = generateId();
            }

            data[hash[idAttribute]] = hash;
            save();

            return hash;
        }

        return function(action, options, callback) {
            var isModel = Y.Model && (this instanceof Y.Model);

            switch (action) {
                case 'create':
                    callback(null, set(this));
                    break;
                case 'update':
                    callback(null, set(this));
                    break;
                case 'read':
                    callback(null, get(isModel && this.get('id')));
                    break;
                case 'delete':
                    callback(null, destroy(isModel && this.get('id')));
                    break;
                default:
                    callback('Action type error.');
                    break;
            }
        };
    };
}, '0.0.1', {
    requires: ['base', 'model']
});