var $ = window.Zepto;
var root = window.player;
var songList;
var $scope = $(document.body);
var countIndex;
var audioPaly = new root.audioPaly();


function bindClick() {
    $scope.on("paly:change",function(event,index,falg){
        audioPaly.setAudioSrc(songList[index].audio);
        if(audioPaly.status == "paly" || falg) {
            audioPaly.paly();
            root.processor.start();
        }
        root.render(songList[index]);
        root.processor.renderAllTime(songList[index].duration);
        root.processor.upData(0);
    })
    //移动端click有300ms延迟
    $scope.on("click",".prev-btn",function(){
        var index = countIndex.prev();
        $scope.trigger("paly:change",index)
    })
    $scope.on("click",".next-btn",function(){
        var index = countIndex.next();
        $scope.trigger("paly:change",index)
    })
    $scope.on("click",".play-btn",function(){
        if(audioPaly.status == "paly"){
            audioPaly.pause();
            root.processor.stop();
        }else{
            audioPaly.paly();
            root.processor.start();
        }
        $(this).toggleClass("playing");
    })
    $scope.on("click",".list-btn",function(){
        root.playList.show(countIndex);
    })
}
function bindTouch() {
    var $slider = $scope.find(".slider-point");
    var offset = $scope.find(".pro-wrapper").offset();
    var left = offset.left;
    var width = offset.width;
    $slider.on("touchstart", function() {
        root.processor.stop();
    }).on("touchmove", function(e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if(per < 0) {
            per = 0;
        }
        if(per > 1) {
            per = 1;
        }
        root.processor.upData(per);
    }).on("touchend", function(e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if(per < 0) {
            per = 0;
        }
        if(per > 1) {
            per = 1;
        }
        root.processor.upData(per);
        var duration = songList[countIndex.getIndex(0)].duration;
        var startTime = duration * per;
        audioPaly.toPlay(startTime);
        root.processor.start(per);
        audioPaly.status = "paly";
        $scope.find(".play-btn").addClass("playing")
    })   
}

function getData(url) {
    $.ajax({
        type: 'get',
        url: url,
        success: function(data) {
            bindClick();
            bindTouch();
            songList = data;
            countIndex = new root.countIndex(data.length);
            root.playList.renderList(data);
            $scope.trigger("paly:change",0);
        },
        error: function() {
            console.log("error")
        }
    })
}

getData("../mock/data.json");