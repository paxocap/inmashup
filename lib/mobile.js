var Detector = function () {

}

Detector.prototype = {
    isMobile: function (req) {
        var ua = req.header('user-agent');
        if (/mobile/i.test(ua)) {
            return true;
        } else {
            return false;
        }
    }
}

exports.Detector = Detector;
