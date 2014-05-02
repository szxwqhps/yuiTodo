/**
 * Created by xwq on 14-1-9.
 */

YUI.add('todoStatView', function(Y) {
    Y.namespace('todoapp');

    Y.todoapp.TodoStatView = Y.Base.create('todoStatView', Y.View, [], {
        template: '<span class="todo-count">' +
                  '<span class="todo-remaining">{numRemaining}</span>' +
                  '<span class="todo-remaining-label">{remainingLabel}</span> left.</span>' +
                  '<a href="#" class="todo-clear"> Clear <span class="todo-done">{numDone}</span>' +
                  'completed <span class="todo-done-label">{doneLabel}</span></a>',

        events: {
            '.todo-clear': {
                click: 'clearDone'
            }
        },

        setModel: function(done, remaining) {
            var model = this.get('model');

            model.set('done', done);
            model.set('remaining', remaining);
        },

        initializer: function() {
            var model = this.get('model');

            model.after('change', this.render, this);
        },

        destructor: function() {
        },

        render: function() {
            var container = this.get('container'),
                model = this.get('model'),
                done = model.get('done'),
                remaining = model.get('remaining');

            container.setHTML(Y.Lang.sub(this.template, {
                numDone: done,
                numRemaining: remaining,
                doneLabel: (done === 1) ? 'task' : 'tasks',
                remainingLabel: (remaining === 1) ? 'task' : 'tasks'
            }));

            if (!done) {
                container.one('.todo-clear').remove();
            }
        },

        clearDone: function(e) {
            // here we can't handle this event, so just post message
           this.fire('clearDone');
        }
    }, {
        ATTRS: {
            model: {
                valueFn: function() {
                    return new Y.Model({
                        done: 0,
                        remaining: 0
                    });
                }
            }
        }
    });
}, '0.0.1', {
    requires: ['node', 'view', 'model']
});