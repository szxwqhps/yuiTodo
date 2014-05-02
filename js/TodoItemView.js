/**
 * Created by xwq on 14-1-9.
 */

YUI.add('todoItemView', function(Y) {
    Y.namespace('todoapp');

    Y.todoapp.TodoItemView = Y.Base.create('todoItemView', Y.View, [], {
        containerTemplate: '<li class="todo-item" />',

        template: '<div class="todo-view">' +
                  '<input type="checkbox" class="todo-checkbox" {checked}>' +
                  '<span class="todo-content" tabindex="0">{text}</span>' +
                  '</div>' +
                  '<div class="todo-edit">' +
                  '<input type="text" class="todo-input" value="{text}">' +
                  '</div>' +
                  '<a href="#" class="todo-remove" title="Remove this task">' +
                  '<span class="todo-remove-icon"></span>' +
                  '</a>',

        events: {
            '.todo-checkbox': {
                click: 'toggleDone'
            },

            '.todo-content': {
                click: 'edit',
                focus: 'edit'
            },

            '.todo-input': {
                blur: 'save',
                keypress: 'enter'
            },

            '.todo-remove': {
                click: 'remove'
            },

            '.todo-item': {
                mouseover: 'hoverOn',
                mouseout : 'hoverOff'
            }
        },

        initializer: function() {
            var model = this.get('model');

            model.after('change', this.render, this);
            model.after('destroy', function() {
                this.destroy({remove: true});
            }, this);
        },

        destructor: function() {
        },

        render: function() {
            var container = this.get('container'),
                model = this.get('model'),
                done = model.get('done');

            container.setHTML(Y.Lang.sub(this.template, {
                checked: done? 'checked': '',
                text: model.getAsHTML('text')
            }));

            if (done) {
                container.addClass('todo-done');
            } else {
                container.removeClass('todo-done');
            }

            this.set('inputNode', container.one('.todo-input'));

            return this;
        },

        toggleDone: function() {
            this.get('model').toggleDone();
        },

        edit: function() {
            this.get('container').addClass('editing');
            this.get('inputNode').focus();
        },

        save: function() {
            this.get('container').removeClass('editing');
            this.get('model').set('text', this.get('inputNode').get('value')).save();
        },

        enter: function(e) {
            if (e.keyCode === 13) {
                Y.one('#new-todo').focus();
            }
        },

        remove: function(e) {
            e.preventDefault();

            this.constructor.superclass.remove.call(this);
            this.get('model').destroy({remove: true});
        },

        hoverOff: function(e) {
            e.currentTarget.removeClass('todo-hover');
        },

        hoverOn: function(e) {
            e.currentTarget.addClass('todo-hover');
        }
    });
}, '0.0.1', {
    requires: ['node', 'view', 'todoItem']
});