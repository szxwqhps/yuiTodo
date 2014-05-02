/**
 * Created by xwq on 14-1-9.
 */

YUI.add('todoList', function(Y) {
    Y.namespace('todoapp');

    Y.todoapp.TodoList = Y.Base.create('todoList', Y.ModelList, [], {
        model: Y.todoapp.TodoItem,

        sync: Y.todoapp.localStorageSync('todo'),

        done: function() {
            return this.filter(function(m) {
               return m.get('done');
            });
        },

        remaining: function() {
            return this.filter(function(m) {
               return !m.get('done');
            });
        }
    });
}, '0.0.1', {
    requires: ['base', 'model-list', 'todoItem', 'localStorageSync']
});