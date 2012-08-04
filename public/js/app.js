YUI().use('transition', 'node-event-delegate', function (Y) {
    var slides = ['intro', 'language', 'something', 'lol']

    function slideTransition (selectOne, selectTwo) {
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
    };

    function setHandler (index) {
        Y.on('click', function () {
            slideTransition(slides[index], slides[index + 1]);
            setHandler(index + 1);
        })
    }

    setHandler(0);
});
