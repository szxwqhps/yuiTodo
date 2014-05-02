/**
 * Created by xiawanqiang on 14-1-14.
 */

YUI.add('localStorageSyncTest', function(Y) {
    Y.PieModel = Y.Base.create('pieModel', Y.Model, [], {
        sync: Y.todoapp.localStorageSync('pie'),

        allGone: function() {
            return this.get('slices') === 0;
        }
    }, {
        ATTRS: {
            slices: {
                value: 6
            },
            type: {
                value: 'apple'
            }
        }
    });

    Y.Test.Runner.add(new Y.Test.TestCase({
        name: 'localStorageSync test',

        _should: {
            ignore: {

            }
        },

        setUp: function() {

        },

        tearDown: function() {
            Y.config.win.localStorage.removeItem('pie');
        },

        testCreate: function() {
            var p1 = new Y.PieModel({
                slices: 2,
                type: 'orange'
            });
            Y.Assert.isUndefined(p1.get('id'), 'new model id not defined');
            p1.save();
            Y.Assert.isNotUndefined(p1.get('id'), 'after saved, id is defined');
        },

        testUpdateAndRead: function() {
            var p1,
                p2;

            p1 = new Y.PieModel({
                slices: 3,
                type: 'tomato'
            });

            p1.save();

            p1.set('slices', 4);
            p1.save();

            p2 = new Y.PieModel({id: p1.get('id')});
            p2.load();

            Y.Assert.areEqual(p1.get('slices'), p2.get('slices'));
            Y.Assert.areEqual(p1.get('type'), p2.get('type'));
        },


        testDelete: function() {
            var p1,
                p2;

            p1 = new Y.PieModel({
                slices: 1,
                type:'peach'
            });

            p1.save();
            p2 = new Y.PieModel({id: p1.get('id')});
            p1.destroy({remove: true});
            p2.load();
            Y.Assert.areEqual(p2.get('slices'), 6);     // default value
            Y.Assert.areEqual(p2.get('type'), 'apple'); // default value
        }
    }));
}, '0.0.1', {
    requires: ['localStorageSync', 'test', 'base', 'model']
});