/**
 * Created by xwq on 14-1-15.
 */

YUI.add('todoListTest', function(Y) {
    var list = new Y.todoapp.TodoList();

    Y.Test.Runner.add(new Y.Test.TestCase({
        name: 'todoList test',

        _should: {
            ignore: {

            }
        },

        setUp: function() {
            list.load();
        },

        tearDown: function() {
        },

        testAdd: function() {
            var t,
                p,
                s = list.size();

            t = list.create({text: 'hello, world'});
            p = list.getById(t.get('id'));
            Y.Assert.areEqual(p.get('text'), t.get('text'));
            Y.Assert.areEqual(p.get('done'), t.get('done'));
            Y.Assert.areEqual(list.size(), s + 1);
        },

        testUpdate: function() {
            var t,
                p;

            t = list.create({text: 'hello, xwq'});
            t.set('text', 'What is it?');
            p = list.getById(t.get('id'));
            Y.Assert.areEqual(p.get('text'), 'What is it?');
        },

        testDelete: function() {
            var t,
                s = list.size();

            t = list.create({text: 'hi'});
            Y.Assert.areEqual(list.size(), s + 1)
            list.remove(t);
            Y.Assert.areEqual(list.size(), s);
        },

        testLoad: function() {
            var l2 = new Y.todoapp.TodoList();

            l2.load();
            Y.Assert.areEqual(list.size(), l2.size());
            Y.Assert.areEqual(list.item(0).get('text'), l2.item(0).get('text'));
        },

        testDoneAndRemaining: function() {
            var t = list.item(0),
                s = list.size();

            t.toggleDone();
            Y.Assert.areEqual(list.done().length, 1);
            Y.Assert.areEqual(list.remaining().length, s - 1);
            t.toggleDone();
            Y.Assert.areEqual(list.done().length, 0);
            Y.Assert.areEqual(list.remaining().length, s);
        }
    }));
}, '0.0.1', {
    requires: ['test', 'todoItem', 'todoList']
})