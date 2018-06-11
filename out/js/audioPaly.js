(function($, root){
    var $scope = $(document.body);
    root.audioPaly = function() {
        this.audio = new Audio();
        this.status = "pause";
        this.bindEvent();
    }
    root.audioPaly.prototype = {
        bindEvent:function(){
            $(this.audio).on("ended",function(){
                $scope.find(".next-btn").trigger("click");
            }) 
        },
        paly: function() {
            this.audio.play(); 
            this.status = "paly";
        },
        pause: function() {
            this.audio.pause(); 
            this.status = "pause";
        },
        setAudioSrc: function(src) {
            this.audio.src = src;
            this.audio.load();
        },
        toPlay: function(time) {
            this.audio.currentTime = time;
            this.audio.play();
        }
    }
})(window.Zepto, window.player || (window.player = {}))