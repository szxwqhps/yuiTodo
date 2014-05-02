/**
 * Created by xwq on 14-1-17.
 */

YUI.add("todoStatViewTest", function(Y) {
    var todoStat = Y.one('#todo-stat'),
        todoStatView = new Y.todoapp.TodoStatView();

    todoStat.append(todoStatView.get('container'));
    todoStatView.addTarget(todoStat);

    Y.Test.Runner.add(new Y.Test.TestCase({
        name: 'todoList test',

        _should: {
            ignore: {

            }
        },

        setUp: function() {
        },

        tearDown: function() {
        },

        testRender: function() {
            todoStatView.setModel(12, 23);
        },

        testClearDone: function() {
            todoStat.on('*:clearDone', function() {
                todoStatView.setModel(0, 35);
            });

            todoStatView.clearDone();
        }
    }));
}, '0.0.1', {
    requires: ['test', 'todoStatView', 'model']
})
