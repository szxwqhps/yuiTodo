/**
 * Created by xwq on 14-1-9.
 */

YUI.add('todoApp', function(Y) {
    Y.namespace('todoapp');

    Y.todoapp.TodoApp = Y.Base.create('todoApp', Y.App, [], {
        views: {
            homePage: {
                type: Y.todoapp.TodoAppView
            }
        },

        initializer: function() {
            console.log('App startup!');
            this.once('ready', function (e) {
                this.showView('homePage');
            });
        },

        destructor: function() {
            console.log('App terminate.')
        },

        run: function() {
            this.showView('homePage');
        }
    }, {
        ATTRS: {

        }
    });
}, '0.0.1', {
    requires: ['app', 'todoAppView']
});
