/**
 * Created by xwq on 14-1-15.
 */

YUI.add('todoItemViewTest', function(Y) {

    var listNode = Y.one('#todo-list'),
        todo = new Y.todoapp.TodoItem({text: 'hello, world'}),
        todoView = new Y.todoapp.TodoItemView({model: todo});

    listNode.append(todoView.render().get('container'));
    Y.Test.Runner.add(new Y.Test.TestCase({
        name: 'todoItemView test',

        _should: {
            ignore: {

            }
        },

        setUp: function() {
        },

        tearDown: function() {
        },

        testEnter: function() {
            var n = todoView.get('container').one('.todo-input');
            n.simulate('keypress', {keyCode: 13});
        },

        testEdit: function() {
            todoView.get('container').one('.todo-content').simulate('click');
            Y.Assert.isTrue(todoView.get('container').hasClass('editing'));
        },

        testToggleDone: function() {
            var done = todo.get('done');

            todoView.get('container').one('.todo-checkbox').simulate('click');
            Y.Assert.areEqual(todo.get('done'), !done);
        },


        testSave: function() {
            todoView.get('container').one('.todo-content').simulate('click');
            todoView.get('container').one('.todo-input').set('value', 'what is it?');
            todoView.get('container').one('.todo-content').simulate('blur');
            Y.Assert.areEqual(todo.get('text'), 'what is it?');
        },

        testRemove: function() {
            todoView.get('container').one('.todo-remove').simulate('click');
            Y.Assert.isUndefined(todo);
        }
    }));
}, '0.0.1', {
    requires: ['node', 'test', 'todoItemView', 'todoItem']
})