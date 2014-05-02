/**
 * Created by xwq on 14-1-9.
 */

var YUI_config = {
    debug: true,
    filter: 'debug',
    groups: {
        'todo-modules': {
            base: '/js/',
            modules: {
                'localStorageSync': {
                    fullpath: 'js/localStorageSync.js',
                    requires: ['base', 'model']
                },
                'todoApp': {
                    fullpath: 'js/TodoApp.js',
                    requires: ['app', 'todoAppView']
                },
                'todoAppView': {
                    fullpath: 'js/TodoAppView.js',
                    requires: ['node', 'view', 'todoItem', 'todoList', 'todoItemView', 'todoStatView']
                },
                'todoStatView': {
                    fullpath: 'js/TodoStatView.js',
                    requires: ['node', 'view','model']
                },
                'todoItemView': {
                    fullpath: 'js/TodoItemView.js',
                    requires: ['node', 'view', 'todoItem']
                },
                'todoItem': {
                    fullpath: 'js/TodoItem.js',
                    requires: ['localStorageSync', 'model']
                },
                'todoList': {
                    fullpath: 'js/TodoList.js',
                    requires: ['localStorageSync', 'todoItem']
                }
            }
        }
    }
};
