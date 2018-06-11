(function($, root) {
    var control;
    var $scope = $(document.body);
    var musicList = $("<div class = 'play-list'>"+
                        "<div class='play-header'>播放列表</div>" + 
                        "<ul class = 'list-wrapper'></ul>" +
                        "<div class='close-btn'>关闭</div>"+
                    "</div>");
    function renderList(data) {
        var html = '';
        data.forEach(function(ele, index) {
            html += "<li><h3>"+ele.song+"-<span>"+ele.singer+"</span></h3></li>"
        });
        musicList.find('.list-wrapper').html(html);
        $scope.append(musicList);
        bindEvent()
    }
    function bindEvent() {
        musicList.on('click','.close-btn',function() {
            musicList.removeClass("show");
        })
        musicList.on('click','li',function() {
            var index = $(this).index();
            nowSong(index);
            control.index = index;
            $scope.trigger("paly:change",[index,true]);
            $scope.find(".play-btn").addClass("playing");
            musicList.removeClass("show");
        })
    }
    function show(countIndex) {
        control = countIndex;
        musicList.addClass("show");
        nowSong(control.index);
    }
    function nowSong(index) {
        musicList.find(".sign").removeClass("sign");
        musicList.find("ul li").eq(index).addClass("sign");
    }
    root.playList = {
        renderList: renderList,
        show: show
    }
})(window.Zepto, window.player || (window.player = {}))