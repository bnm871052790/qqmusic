(function($, root){
    root.countIndex = function(len) {
        this.index  = 0;
        this.len = len;
    }
    root.countIndex.prototype = {
        prev : function(){
            return this.getIndex(-1);
        },
        next : function(){
            return this.getIndex(1);
        },
        getIndex : function(val){
            var index = this.index;
            var len = this.len;
            var curIndex = (index + val + len) % len;
            this.index = curIndex;
            return curIndex;
        }
    }
})(window.Zepto, window.player || (window.player = {}))