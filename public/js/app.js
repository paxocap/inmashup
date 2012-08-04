YUI().use('app', 'transition', 'event-custom', 'charts', 'gallery-model-sync-socket', function (Y) {
    var SlideshowApp, SlideModel, SlideList;

    SlideshowApp = Y.Base.create('slideshowApp', Y.App,  [], {
        
        slides: ['intro', 'language', 'something', 'lol'],

        initializer: function () {
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
            var self = this;
            Y.once('keydown', function (e) {
                if (e.keyCode === 39) {
                    self.forwardTransition(self.slides[index], 
                                           self.slides[index+1]);
                    Y.fire('slides:forward');
                    self.setHandler(index + 1);
                } else if (e.keyCode === 37) {
                    self.backwardTransition(self.slides[index],
                                            self.slides[index-1]);
                    Y.fire('slides:backward');
                    self.setHandler(index - 1);
                }
            });
        },
    });

    SlideModel = Y.Base.create('slideModel', Y.Model, [Y.ModelSync.Socket], {

    });

    new SlideshowApp();
});
