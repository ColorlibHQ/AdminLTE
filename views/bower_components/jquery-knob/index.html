<!DOCTYPE html>
<html>
    <head>
        <title>jQuery Knob demo</title>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
        <!--[if IE]><script type="text/javascript" src="excanvas.js"></script><![endif]-->
        <script src="dist/jquery.knob.min.js"></script>
        <script>
            $(function($) {

                $(".knob").knob({
                    change : function (value) {
                        //console.log("change : " + value);
                    },
                    release : function (value) {
                        //console.log(this.$.attr('value'));
                        console.log("release : " + value);
                    },
                    cancel : function () {
                        console.log("cancel : ", this);
                    },
                    /*format : function (value) {
                        return value + '%';
                    },*/
                    draw : function () {

                        // "tron" case
                        if(this.$.data('skin') == 'tron') {

                            this.cursorExt = 0.3;

                            var a = this.arc(this.cv)  // Arc
                                , pa                   // Previous arc
                                , r = 1;

                            this.g.lineWidth = this.lineWidth;

                            if (this.o.displayPrevious) {
                                pa = this.arc(this.v);
                                this.g.beginPath();
                                this.g.strokeStyle = this.pColor;
                                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                                this.g.stroke();
                            }

                            this.g.beginPath();
                            this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                            this.g.stroke();

                            this.g.lineWidth = 2;
                            this.g.beginPath();
                            this.g.strokeStyle = this.o.fgColor;
                            this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                            this.g.stroke();

                            return false;
                        }
                    }
                });

                // Example of infinite knob, iPod click wheel
                var v, up=0,down=0,i=0
                    ,$idir = $("div.idir")
                    ,$ival = $("div.ival")
                    ,incr = function() { i++; $idir.show().html("+").fadeOut(); $ival.html(i); }
                    ,decr = function() { i--; $idir.show().html("-").fadeOut(); $ival.html(i); };
                $("input.infinite").knob(
                                    {
                                    min : 0
                                    , max : 20
                                    , stopper : false
                                    , change : function () {
                                                    if(v > this.cv){
                                                        if(up){
                                                            decr();
                                                            up=0;
                                                        }else{up=1;down=0;}
                                                    } else {
                                                        if(v < this.cv){
                                                            if(down){
                                                                incr();
                                                                down=0;
                                                            }else{down=1;up=0;}
                                                        }
                                                    }
                                                    v = this.cv;
                                                }
                                    });
            });
        </script>
        <style>
            body{
              padding: 0;
              margin: 0px 50px;
              font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
              font-weight: 300;
              text-rendering: optimizelegibility;
            }
            p{font-size: 30px; line-height: 30px}
            div.demo{text-align: center; width: 280px; float: left}
            div.demo > p{font-size: 20px}
        </style>
    </head>
    <body>
        <div style="width:100%;font-size:40px;letter-spacing:-8px;line-height:40px;">
            <h1>jQuery Knob</h1>
        </div>
        <div>
            <p>Nice, downward compatible, touchable, jQuery dial. <a href="http://flattr.com/thing/674900/jQuery-Knob" target="_blank"><img src="http://api.flattr.com/button/flattr-badge-large.png" alt="Flattr this" title="Flattr this" border="0" /></a></p>
            <p style="font-size: 20px">* implemented interactions : mouse click and wheel mouse, keyboard (on focus) and fingers (touch events)</p>
        </div>
        <div class="demo">
            <p>&#215; Disable display input</p>
            <pre>
data-width="100"
data-displayInput=false
            </pre>
            <input class="knob" data-width="100" data-displayInput=false value="35">
        </div>
        <div class="demo">
            <p>&#215; 'cursor' mode</p>
            <pre>
data-width="150"
data-cursor=true
data-thickness=.3
data-fgColor="#222222"
            </pre>
            <input class="knob" data-width="150" data-cursor=true data-fgColor="#222222" data-thickness=.3 value="29">
        </div>
        <div class="demo" >
            <p>&#215; Display previous value</p>
            <pre>
data-displayPrevious=true
data-min="-100"
            </pre>
            <input class="knob" data-width="200" data-min="-100" data-displayPrevious=true value="44">
        </div>
        <div style="clear:both"></div>
        <div class="demo">
            <p>&#215; Angle offset</p>
            <pre>
data-angleOffset=90
data-linecap=round
            </pre>
            <input class="knob" data-angleOffset=90 data-linecap=round value="35">
        </div>
        <div class="demo">
            <p>&#215; Angle offset and arc</p>
            <pre>
data-fgColor="#66CC66"
data-angleOffset=-125
data-angleArc=250
data-rotation=anticlockwise
            </pre>
            <input class="knob" data-angleOffset=-125 data-angleArc=250 data-fgColor="#66EE66" data-rotation="anticlockwise" value="35">
        </div>
        <div class="demo" >
            <p>&#215; 4-digit, step 0.1</p>
            <pre>
data-step=".1"
data-min="-10000"
data-max="10000"
value="0"
data-displayPrevious=true
            </pre>
            <input class="knob" data-min="-10000" data-displayPrevious=true data-max="10000" data-step=".1" value="0">
        </div>
        <div style="clear:both"></div>
        <div style="text-align: center">
            <p style="font-size: 20px">&#215; Overloaded 'draw' method</p>
        </div>
        <div style="background-color: #222; height: 340px">
            <div class="demo" style="background-color:#222; color:#FFF;">
                <pre>
    data-width="75"
    data-fgColor="#ffec03"
    data-skin="tron"
    data-thickness=".2"
    data-displayPrevious=true
                </pre>
                <input class="knob" data-width="75" data-displayPrevious=true data-fgColor="#ffec03" data-skin="tron" data-cursor=true value="75" data-thickness=".2">
            </div>
            <div class="demo" style="background-color:#222; color:#FFF;">
                <pre>
    data-width="150"
    data-fgColor="#ffec03"
    data-skin="tron"
    data-thickness=".2"
    data-displayPrevious=true
                </pre>
                <input class="knob" data-width="150" data-displayPrevious=true data-fgColor="#ffec03" data-skin="tron" data-thickness=".2" value="75">
            </div>
            <div class="demo" style="background-color:#222; color:#FFF;">
                <pre>
    data-width="150"
    data-fgColor="#C0ffff"
    data-skin="tron"
    data-thickness=".1"
    data-angleOffset="180"
                </pre>
                <input class="knob" data-width="150" data-angleOffset="180" data-fgColor="#C0ffff" data-skin="tron" data-thickness=".1" value="35">
            </div>
        </div>
        <div style="clear:both"></div>
        <div class="demo" style="width:100%">
            <p>&#215; Responsive</p>
            <pre>
data-width="80%"
            </pre>
            <div style="width: 30%; border: 3px dashed; margin-bottom: 20px">
                <i>
                    Current div width is 30% of window width.<br>
                    Knob width is 80% of current div.<br>
                    Knob width is 80% of 30% of window width.<br>
                    Test resizing window.
                </i>
                <br>
                <br>
                <input class="knob" data-width="80%" value="35">
            </div>
        </div>
        <div style="clear:both"></div>
        <script>
        function clock() {
            var $s = $(".second"),
                $m = $(".minute"),
                $h = $(".hour");
                d = new Date(),
                s = d.getSeconds(),
                m = d.getMinutes(),
                h = d.getHours();
            $s.val(s).trigger("change");
            $m.val(m).trigger("change");
            $h.val(h).trigger("change");
            setTimeout("clock()", 1000);
        }
        clock();
        </script>
        <div class="demo" style="color:#EEE;background:#222;height:420px;width:100%">
            <p>&#215; Superpose (clock)</p>
            <div style="position:relative;width:350px;margin:auto">
                <div style="position:absolute;left:10px;top:10px">
                    <input class="knob hour" data-min="0" data-max="24" data-bgColor="#333" data-fgColor="#ffec03" data-displayInput=false data-width="300" data-height="300" data-thickness=".3">
                </div>
                <div style="position:absolute;left:60px;top:60px">
                    <input class="knob minute" data-min="0" data-max="60" data-bgColor="#333" data-displayInput=false data-width="200" data-height="200" data-thickness=".45">
                </div>
                <div style="position:absolute;left:110px;top:110px">
                    <input class="knob second" data-min="0" data-max="60" data-bgColor="#333" data-fgColor="rgb(127, 255, 0)" data-displayInput=false data-width="100" data-height="100" data-thickness=".3">
                </div>
            </div>
        </div>
        <div style="clear:both"></div>
        <div class="demo">
            <p>&#215; Readonly</p>
            <pre>
readonly (or data-readOnly=true)
data-thickness=".4"
data-fgColor="chartreuse"
            </pre>
            <input class="knob" data-fgColor="chartreuse" data-thickness=".4" readonly value="22">
        </div>
        <div class="demo">
            <p>&#215; Dynamic</p>
            <pre>
data-width="200"
            </pre>
            <input type="button" onclick="$('.knob-dyn').knob();" value="knobify!">
            <input type="text" class="knob-dyn" data-width="200" data-cursor=true value="56">
            <pre>
data-width="50"
data-cursor=true
            </pre>
            <input type="button" onclick="$('.knob-dyn2').knob();" value="knobify!">
            <input type="text" class="knob-dyn2" data-width="50" data-thickness=".4" value="56">
        </div>
        <div class="demo" style="height:440px;width:300px">
            <p>&#215; Infinite || iPod click wheel</p>
            <div style="float:left;width:180px;height:320px;padding:20px;background-color:#EEEEEE;text-align:center;">
                <pre>
data-width="150"
data-cursor=true
data-thickness=".5"
data-fgColor="#AAAAAA"
data-bgColor="#FFFFFF"
data-displayInput="false"
+ some code
                </pre>
                <input class="infinite" value="0" data-width="150" data-thickness=".5" data-fgColor="#AAAAAA" data-bgColor="#FFFFFF" data-displayInput="false" data-cursor=true>
            </div>
            <div style="float:left;margin-top:200px;">
                <div class="ival" style="width:80px;text-align:center;font-size:50px;color:#AAA">0</div>
                <div class="idir" style="width:80px;text-align:center;font-size:50px;"></div>
            </div>
        </div>
        <div style="clear:both"></div>
        <div style="margin-top:30px;text-align:center">
            <img src="https://raw.github.com/aterrien/jQuery-Knob/master/secretplan.jpg">
            <p style="font-size:20px;">jQuery Knob is &copy; 2012 Anthony Terrien - MIT License</p>
        </div>
    </body>
</html>
