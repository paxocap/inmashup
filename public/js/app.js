YUI({
        gallery: 'gallery-2012.07.11-21-38',
        filter: 'raw',
        modules: {
            'socket-io': {
                fullpath: '/socket.io/socket.io.js'
            }
        },
    }).use('app', 'transition', 'charts', 'gallery-model-sync-socket', function (Y) {
    var SlideshowApp, Signal;

    SlideshowApp = Y.Base.create('slideshowApp', Y.App,  [], {
        
        initializer: function () {
            this.set('forwardSignal', new Signal({id: 1234});
            this.set('backwardSignal', new Signal({id: 4321});
            this.setHandler(0);
        },

        forwardTransition: function (selectOne, selectTwo) {
            var slideOne = Y.one('#' + selectOne + '-slide'),
                slideTwo = Y.one('#' + selectTwo + '-slide');

            slideOne.transition({
                easing: 'ease-out',
                duration: 0.75,
                left: '-1280px'
            });
            slideTwo.transition({
                easing: 'ease-out',
                duration: 0.75,
                left: '218px'
            });
        },

        backwardTransition: function (selectOne, selectTwo) {
            var slideOne = Y.one('#' + selectOne + '-slide'),
                slideTwo = Y.one('#' + selectTwo + '-slide');

            slideOne.transition({
                easing: 'ease-out',
                duration: 0.75,
                left: '1818px'
            });
            slideTwo.transition({
                easing: 'ease-out',
                duration: 0.75,
                left: '218px'
            });
        },

        setHandler: function (index) {
            var self = this,
                slides = this.get('slides'),
                forward = this.get('forwardSignal'),
                backward = this.get('backwardSignal');
                

            Y.once('keydown', function (e) {
                if (e.keyCode === 39) {
                    self.forwardTransition(slides[index], 
                                           slides[index+1]);
                    forward.set('message', new Date().toISOString());
                    forward.save();
                    self.setHandler(index + 1);
                } else if (e.keyCode === 37) {
                    self.backwardTransition(slides[index],
                                            slides[index-1]);
                    backward.set('message', new Date().toISOString());
                    backward.save();
                    self.setHandler(index - 1);
                } else {
                    self.setHandler(index);
                }
            });
        }
    }, {
        ATTRS: {
            slides: {
                value: ['intro', 'language', 'something', 'lol']
            },
            forwardSignal: {
                value: null
            },
            backwardSignal: {
                value: null
            }
        }
    });

    Signal = Y.Base.create('signal', Y.Model, [Y.ModelSync.Socket], {
        root: '/signals'
    }, {
        ATTRS: {
            id: '',
            message: ''
        }
    });

    new SlideshowApp();
});
