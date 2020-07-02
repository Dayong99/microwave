import $ from "jquery"
export default {
    data(){
        return {
            slected:true
        }
    },
    mounted() {
        var t = this
        this.$nextTick(() => {
            $(".ccI").eq(1).find(".ccTitle").click(function(){
                $(this).parent().removeClass("top")
                $(this).addClass("activeX")
                $(".ccI").eq(0).find(".ccTitle").removeClass("activeX")
                $(".ccI").eq(0).find(".ccContent").removeClass("activeX")
            })
            $(".ccContent").click(function(){
                $(".ccI").eq(1).addClass("top")
                $(".ccI").eq(1).find(".ccTitle").removeClass("activeX")
                $(this).parent().find(".ccContent").removeClass("activeX")
                $(this).addClass("activeX")
                $(this).parent().find(".ccTitle").addClass("activeX")
            })
            $(".ccTitle").hover(function(){
                
                $(this).addClass("active")
            },function(){
                $(this).removeClass("active")
            })
            $(".ccI").hover(function(){
                $(this).find(".ccTitle").addClass("active")
            },function(){
                $(this).find(".ccTitle").removeClass("active")
            })
            $(".ccContent").hover(function(){
                $(this).addClass("active")
                if($(this).parent().find(".ccTitle").hasClass("active")){}else{
                    $(this).parent().find(".ccTitle").addClass("active")
                }
                
            },function(){
                $(this).removeClass("active")
                if($(this).parent().hasClass("ccI")){}else{
                    $(this).parent().find(".ccTitle").removeClass("active")
                }
                //
            })
        })
    },
}