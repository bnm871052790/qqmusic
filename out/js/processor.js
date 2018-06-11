(function($, root){
    var frameId;
    var curDuration;
    var startTime;
    var lastPer = 0;
    function formatTime(duration) {
        duration = Math.round(duration);
        var minute = Math.floor(duration / 60);
        var second = duration - minute * 60;
        if(minute < 10) {
            minute = "0" + minute;
        } 
        if(second < 10) {
            second = "0" + second;
        } 
        return minute + ":" + second;
    }
    function renderAllTime(duration) {
        lastPer = 0;
        curDuration = duration;
        var allTime = formatTime(duration)
        $scope.find(".all-time").html(allTime);
    }
    function upData(percent) {
        var curTime = percent * curDuration;
        curTime = formatTime(curTime);
        $scope.find(".cur-time").html(curTime);
        var percentage = (percent - 1) * 100 + "%";
        $scope.find(".pro-top").css({
            transform : "translateX(" + percentage + ")"
        })
    }
    function start(precentage) {
        lastPer = precentage === undefined ? lastPer : precentage; 
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            var percent = lastPer + (curTime - startTime) / (curDuration * 1000);
            if(percent < 1) {
                frameId = requestAnimationFrame(frame);
                upData(percent)
            }else {
                cancelAnimationFrame(frameId);
            }
        }
        frame()
    }
    function stop() {
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (curDuration * 1000);
        cancelAnimationFrame(frameId);
    }
    root.processor = {
        renderAllTime : renderAllTime,
        start : start,
        stop : stop,
        upData : upData 
    }
})(window.Zepto, window.player || (window.player = {}))