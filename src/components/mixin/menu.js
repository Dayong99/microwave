/* eslint-disable */
import $ from "jquery"
export default {
    data(){
        return {
            pass:false
        }
    },
    methods: {
        getSys(){
            return this.$store.state.system.sysState
        }
    },
    mounted() {
        var t = this;
        let aaIndex = 0
            let aa = null
        $(".init-btn").on("click",function(){
            t.alertedController(false)
            if(t.getSys() == 'dbjc'){
                $(".check").hide()
                $(".compareContainer").hide()
                t.$store.commit('system/setSys', 'zhjc')
            }
            if(t.getSys() == 'cxtj'){
                $(".query").hide()
            }
            if(!t.pass){
                clearInterval(aa)
                $(".complex-wrap ul li img").each(function(){
                    $(this).next().hide()
                });
                var flag = $(".complex-wrap").attr("data-open")
            if(flag == '0'){
                $(".wrap-sub").addClass("wrap-sub-active")
                initSwitch()
                $(".complex-wrap").show().css({"transform":"rotateZ(0deg)"});
                $(".complex-wrap").attr("data-open",1)
            }else{
                $(".complex-wrap").css({"transform":"rotateZ(-198deg)"});
                setTimeout(() => {
                    $(".complex-wrap").hide()
                    $(".wrap-sub").removeClass("wrap-sub-active")
                }, 300);
                $(".complex-wrap").attr("data-open",0)
            }
            
            aaIndex = 0
            aa = setInterval(() => {
                if(aaIndex > 3){
                    $(".complex-wrap ul li img").each(function(){
                        $(this).next().removeClass("bounceIn animated")
                        //$(this).next().hide()
                    });
                    clearInterval(aa)
                    return
                }
                $(".complex-wrap ul li img").eq(aaIndex).next().show()
                $(".complex-wrap ul li img").eq(aaIndex).next().addClass("bounceIn animated")
                aaIndex ++

            }, 300);
                
            }
            
        });
        // $(".complex-wrap ul li img").hover(function(){
        //     $(this).parent().find("span").show()
        // },function(){
        //     $(this).parent().find("span").hide()
        // })
        $(".complex-wrap ul li img").on("click",function(){
            $(".complex-wrap").attr("data-open",0)

            //t.pass = true
            var index = $(this).parent().attr("data-sp");
            $(".complex-wrap").css({"transform":"rotateZ(-198deg)"});
            $(".complex-wrap").hide()
            
            setTimeout(() => {
                $(".simple-wrap").show();
                $(".simple-wrap").find("li").hide();
                $(".simple-wrap").find("li").eq(index).show();
                $(".hide-simple").show();
                $(".wrap-sub").addClass("wrap-sub-active");
                if(index == 1){
                    t.$store.commit('system/setSys', 'yjyb')
                    t.alertedController(true)
                }else{
                    t.alertedController(false)
                    if(index == 0){
                        t.$store.commit('system/setSys', 'zhjc')
                        t.getSys() == 'zhjc' && $(".left-bar").show()
                    }else if(index == 2){
                        t.$store.commit('system/setSys', 'dbjc')
                        t.getSys() == 'dbjc' && $(".check").show()
                        t.getSys() == 'dbjc' && $(".compareContainer").show()
                    }else if(index == 3){
                        t.$store.commit('system/setSys', 'cxtj')
                        t.getSys() == 'cxtj' && $(".query").show()
                    }
                }
            }, 0);
            
        })
        function initSwitch(){
            $(".left-bar").hide()
            $(".simple-wrap").hide();
            setTimeout(() => {
                $(".hide-simple").hide()
            }, 0);
        }
        $(".hide-simple").click(()=>{
            $(".wrap-sub").hide()
            $(".init-btn").hide()
            $(".show-simple").css("left","8px")
            $(".show-simple").show()
            initSwitch()
            if(t.getSys() == 'yjyb'){
                $(".alerted").hide()
            }
            if(t.getSys() == 'dbjc'){
                $(".check").hide()
                $(".compareContainer").hide()
            }
            if(t.getSys() == 'cxtj'){
                $(".query").hide()
            }
        });
        $(".show-simple").click(function(){
            $(".wrap-sub").show()
            $(".init-btn").show()
            t.getSys() == 'zhjc' && $(".left-bar").show()
            $(".simple-wrap").show();
            $(".show-simple").hide()
            setTimeout(() => {
                $(".hide-simple").show()
            }, 0);
            if(t.getSys() == 'yjyb'){
                $(".alerted").show()
            }
            if(t.getSys() == 'dbjc'){
                $(".check").show()
                $(".compareContainer").show()
            }
            if(t.getSys() == 'cxtj'){
                $(".query").show()
            }
        });

        this.$nextTick(()=>{
            $(".el-collapse-item__header").eq(0).prepend('<div class="pza"></div><div style="    margin-left: 20px;" class="imgFloor imgFloor-a"></div>&nbsp;&nbsp;')
            $(".el-collapse-item__header").eq(1).prepend('<div class="pza"></div><div style="    margin-left: 20px;" class="imgFloor imgFloor-b"></div>&nbsp;&nbsp;')
        })
    }
}