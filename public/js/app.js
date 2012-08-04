YUI().use('app', 'transition', 'node-event-delegate', function (Y) {
    var SlideshowApp;

    SlideshowApp = Y.Base.create('slideshowApp', Y.App,  [], {
        
        slides: ['intro', 'language', 'something', 'lol'],

        initializer: function () {
            this.setHandler(0);
        },

        slideTransition: function (selectOne, selectTwo) {
            var slideOne = Y.one('#' + selectOne + '-slide'),
                slideTwo = Y.one('#' + selectTwo + '-slide');

            slideOne.transition({
                easing: 'ease-out',
                duration: 0.75,
                left: '-1080px'
            });
            slideTwo.transition({
                easing: 'ease-out',
                duration: 0.75,
                left: '218px'
            });
        },

        setHandler: function (index) {
            var self = this;
            Y.on('click', function () {
                self.slideTransition(self.slides[index], self.slides[index+1]);
                self.setHandler(index + 1);
            });
        }
    });

    new SlideshowApp();
});
