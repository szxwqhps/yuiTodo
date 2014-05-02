/**
 * Created by xwq on 14-1-9.
 */

YUI.add('todoItem', function(Y) {
    Y.namespace('todoapp');

    Y.todoapp.TodoItem = Y.Base.create('todoItem', Y.Model, [], {
        sync: Y.todoapp.localStorageSync('todo'),

        toggleDone: function() {
            this.set('done', !this.get('done'));
            this.save();
        }
    }, {
        ATTRS: {
            text: {
                value: ''
            },
            done: {
                value: false
            }
        }
    });
}, '0.0.1', {
    requires: ['base', 'model', 'localStorageSync']
});