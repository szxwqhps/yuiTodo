/**
 * Created by xwq on 14-1-9.
 */

YUI.add('todoAppView', function(Y) {
    Y.namespace('todoapp');

    Y.todoapp.TodoAppView = Y.Base.create('TodoAppView', Y.View, [], {
        template: '<label class="todo-label" for="new-todo">What do you want to do today?</label> ' +
                  '<input type="text" id="new-todo" class="todo-input" placeholder="buy milk"> ' +
                  '<ul id="todo-list"></ul> ' +
                  '<div id="todo-stats"></div>',

        events: {
            '#new-todo': {
                keypress: 'createTodo'
            }
        },

        initializer: function() {
            var list = this.get('modelList'),
                container = this.get('container');

            container.setHTML(this.template);
            this.inputNode = container.one('#new-todo');
            this.todoStat = new Y.todoapp.TodoStatView();
            this.todoStat.addTarget(this);


            list.after('add', this.add, this);
            list.after('reset', this.reset, this);
            list.after(['add', 'reset', 'remove', '*:doneChange'], this.render, this);

            this.on('*:clearDone', this.clearDone, this);

            list.load();
        },

        destructor: function() {
        },

        render: function() {
            var container = this.get('container'),
                todoList = this.get('modelList'),
                stats = container.one('#todo-stats');

            if (todoList.isEmpty()) {
                stats.empty();
                return this;
            }

            this.todoStat.setModel(todoList.done().length, todoList.remaining().length);
            if (!this.todoStat.get('container').inDoc()) {
                stats.append(this.todoStat.get('container'));
            }
        },

        add: function(e) {
            var view = new Y.todoapp.TodoItemView({model: e.model});

            this.get('container').one('#todo-list').append(
                view.render().get('container')
            );
        },

        reset: function(e) {
            var fragment = Y.one(Y.config.doc.createDocumentFragment());

            Y.Array.each(e.models, function (model) {
                var view = new Y.todoapp.TodoItemView({model: model});
                fragment.append(view.render().get('container'));
            });

            this.get('container').one('#todo-list').setHTML(fragment);
        },

        clearDone: function(e) {
            var todoList = this.get('modelList'),
                done = todoList.done();

            e.preventDefault();

            // Remove all finished items from the list, but do it silently so as not
            // to re-render the app view after each item is removed.
            todoList.remove(done, {silent: true});

            // Destroy each removed TodoModel instance.
            Y.Array.each(done, function (todo) {
                todo.destroy({remove: true});
            });

            this.render();
        },

        createTodo: function(e) {
            var value;

            if (e.keyCode === 13) { // enter key
                value = Y.Lang.trim(this.inputNode.get('value'));

                if (!value) {
                    return;
                }

                // This tells the list to create a new TodoModel instance with the
                // specified text and automatically save it to localStorage in a
                // single step.
                this.get('modelList').create({text: value});

                this.inputNode.set('value', '');
            }
        }
    }, {
        ATTRS: {
            modelList: {
                valueFn: function() {
                    return new Y.todoapp.TodoList();
                }
            }
        }
    });
}, '0.0.1', {
    requires: ['node', 'view', 'todoItem', 'todoList', 'todoItemView', 'todoStatView']
});