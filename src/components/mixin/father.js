export default {
    mounted() {
        this.$nextTick(() => {
            var zzbar = function(){
                var a = $("body").outerWidth()
                var b = $(".compareContainer").width()
                $(".compareContainer").css("left",(a/2-b/2+100)+"px")
                .css("top","54px")
            }
            $(window).resize(function(){
                zzbar()
            })
            zzbar()

        })
    },
}