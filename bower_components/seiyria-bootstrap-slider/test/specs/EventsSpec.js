describe("Event Tests", function() {
  var testSlider, flag, mouse;
  var sliderElem;

  beforeEach(function() {
    flag = false;
    mouse = document.createEvent('MouseEvents');
  });

  describe("JQuery version", function() {
    beforeEach(function() {
      testSlider = $("#testSlider2").slider({
        value: 1
      });
      sliderElem = testSlider.slider('getElement');
    });

    afterEach(function() {
      if(testSlider) {
        testSlider.slider('destroy');
        testSlider = null;
      }
      sliderElem = null;
    });

    describe("Mouse Events", function() {
      var spy;

      beforeEach(function() {
        spy = jasmine.createSpy('spy');
      });

      it("'slideStart' event is triggered properly and can be binded to", function(done) {
        testSlider.on('slideStart', spy);
        testSlider.data('slider')._mousedown(mouse);
        setTimeout(function() {
          expect(spy).toHaveBeenCalled();
          done();
        });
      });

      it("'slide' event is triggered properly and can be binded to", function(done) {
        testSlider.on('slide', spy);
        testSlider.data('slider')._mousemove(mouse);
        setTimeout(function() {
          expect(spy).toHaveBeenCalled();
          done();
        });
      });

      it("'slide' event sets the right value on the input", function(done) {
        testSlider.on('slide', function() {
          expect(isNaN(testSlider.val())).not.toBeTruthy();
          done();
        });
        testSlider.data('slider')._mousemove(mouse);
      });

      it("'slide' event value and input value properties are synchronous", function() {
        testSlider.on('slide', function(e) {
          expect(e.value.toString()).toEqual(this.value);
        });
        testSlider.slider("setValue", 3, true, false);
      });

      it("'change' event value and input value properties are synchronous", function() {
        testSlider.on('change', function(e) {
          expect(e.value.newValue.toString()).toEqual(testSlider.val());
        });
        testSlider.slider("setValue", 3, false, true);
      });

      it("'slideStop' event is triggered properly and can be binded to", function(done) {
        testSlider.on('slideStop', spy);
        testSlider.data('slider')._mouseup(mouse);
        setTimeout(function() {
          expect(spy).toHaveBeenCalled();
          done();
        });
      });

      it("slider should not have duplicate events after calling 'refresh'", function(done) {
        var numTimesFired = 0;
        var obj = {
            addOne: function() {
              numTimesFired++;
            }
        };
        spyOn(obj, 'addOne').and.callThrough();

        testSlider.on('slideStop', obj.addOne);
        testSlider.slider('refresh');
        testSlider.data('slider')._mouseup(mouse);

        setTimeout(function() {
          expect(numTimesFired).toBe(1);
          expect(obj.addOne.calls.count()).toBe(1);
          done();
        });
      });

      describe("Disabled Slider Event Tests", function() {
        var spy;

        beforeEach(function() {
          testSlider.slider('disable');
          spy = jasmine.createSpy('spy');
        });

        it("should not trigger 'slideStart' event when disabled", function(done) {
          testSlider.on('slideStart', spy);
          testSlider.data('slider')._mousedown(mouse);
          window.setTimeout(function() {
            expect(spy).not.toHaveBeenCalled();
            done();
          });
        });

        it("should not trigger 'slide' event when disabled", function(done) {
          testSlider.on('slide', spy);
          testSlider.data('slider')._mousemove(mouse);
          window.setTimeout(function() {
            expect(spy).not.toHaveBeenCalled();
            done();
          });
        });

        it("should not trigger 'slideStop' event when disabled", function(done) {
          testSlider.on('slideStop', spy);
          testSlider.data('slider')._mouseup(mouse);
          window.setTimeout(function() {
            expect(spy).not.toHaveBeenCalled();
            done();
          });
        });
      });

    });

    describe("Touch Events", function() {
      var touch;
      var spy;
      var coords;
      var touchStart;
      var touchMove;
      var touchEnd;

      /*
          list can be either [[x, y], [x, y]] or [x, y]
      */
      function createTouchList(target, list) {
        if (Array.isArray(list) && list[0] && !Array.isArray(list[0])) {
            list = [list];
        }
        list = list.map(function (entry, index) {
            var x = entry[0], y = entry[1], id = entry[2] ? entry[2] : index + 1;
            return createTouch(x, y, target, id);
        });
        return document.createTouchList.apply(document, list);
      }

      function createTouch(x, y, target, id) {
        return document.createTouch(window, target,
            id || 1,  //identifier
            x,  //pageX / clientX
            y,  //pageY / clientY
            x,  //screenX
            y  //screenY
        );
      }

      function initTouchEvent(touchEvent, type, touches) {
        var touch1 = touches[0];
        return touchEvent.initTouchEvent(
            touches, //touches
            touches, //targetTouches
            touches, //changedTouches
            type, //type
            window, //view
            touch1.screenX, //screenX
            touch1.screenY, //screenY
            touch1.clientX, //clientX
            touch1.clientY, //clientY
            false, //ctrlKey
            false, //altKey
            false, //shiftKey
            false //metaKey
        );
      }

      function createTouchEvent(elem, type, touches) {
        var touchEvent = document.createEvent('TouchEvent');
        if (Array.isArray(touches)) {
            touches = createTouchList(elem, touches);
        }

        initTouchEvent(touchEvent, type, touches);
        return touchEvent;
      }

      function calcTouchEventCoords(element) {
        var elementBB = element.getBoundingClientRect();
    
        return {
          clientX: elementBB.left,
          clientY: elementBB.top
        };
      }

      beforeEach(function() {
        touch = document.createEvent('Event');
        var dummyTouchEvent = document.createEvent('MouseEvents');
        touch.touches = [dummyTouchEvent];
        window.ontouchstart = true;
        spy = jasmine.createSpy('spy');

        coords = calcTouchEventCoords(sliderElem);
        touchStart = createTouchEvent(sliderElem, 'touchstart', [coords.clientX, coords.clientY]);
        touchMove = createTouchEvent(sliderElem, 'touchmove', [coords.clientX, coords.clientY]);
        touchEnd = createTouchEvent(sliderElem, 'touchend', [[0, 0]]);
      });

      afterEach(function() {
        window.ontouchstart = null;
      });

      it("'slideStart' event is triggered properly and can be binded to", function(done) {
        testSlider.on('slideStart', spy);

        window.setTimeout(function() {
          expect(spy).toHaveBeenCalled();
          done();
        });

        sliderElem.dispatchEvent(touchStart);
        sliderElem.dispatchEvent(touchEnd);
      });

      it("'slide' event is triggered properly and can be binded to", function(done) {
        testSlider.on('slide', spy);

        window.setTimeout(function() {
          expect(spy).toHaveBeenCalled();
          done();
        });

        // Expect to fail if ONLY dispatching 'touchmove' because `preventDefault()` will prevent
        // the browser from sending the corresponding 'mousemove'.
        // The 'mousedown' event must happen first via 'touchstart'.
        sliderElem.dispatchEvent(touchStart);
        sliderElem.dispatchEvent(touchMove);
        // Always call 'touchend' to remove any touch event listeners on the document.
        sliderElem.dispatchEvent(touchEnd);
      });

      it("'slide' event sets the right value on the input", function(done) {
        testSlider.on('slide', function() {
          expect(isNaN(testSlider.val())).not.toBeTruthy();
          done();
        });

        sliderElem.dispatchEvent(touchStart);
        sliderElem.dispatchEvent(touchMove);
        sliderElem.dispatchEvent(touchEnd);
      });

      it("'slide' event value and input value properties are synchronous", function() {
        testSlider.on('slide', function(e) {
          expect(e.value.toString()).toEqual(testSlider.val());
        });
        testSlider.slider("setValue", 3, true, false);
      });

      it("'change' event value and input value properties are synchronous", function() {
        testSlider.on('change', function(e) {
          expect(e.value.newValue.toString()).toEqual(testSlider.val());
        });
        testSlider.slider("setValue", 3, false, true);
      });

      it("'slideStop' event is triggered properly and can be binded to", function(done) {
        testSlider.on('slideStop', spy);

        window.setTimeout(function() {
          expect(spy).toHaveBeenCalled();
          done();
        });

        sliderElem.dispatchEvent(touchStart);
        sliderElem.dispatchEvent(touchMove);
        sliderElem.dispatchEvent(touchEnd);
      });

      it("slider should not have duplicate events after calling 'refresh'", function(done) {
        // FIXME: Should set `flag` to 0 and make sure spy is called only once
        testSlider.on('slideStop', spy);

        window.setTimeout(function() {
          expect(spy).toHaveBeenCalled();
          done();
        });

        sliderElem.dispatchEvent(touchStart);
        sliderElem.dispatchEvent(touchMove);
        sliderElem.dispatchEvent(touchEnd);
        testSlider.slider('refresh');
      });

      it("slider should not bind multiple touchstart events after calling 'refresh'", function(done) {
        flag = 0;
        var obj = {
            addOne: function() {
                flag++;
            }
        };
        spyOn(obj, 'addOne').and.callThrough();

        touch.initEvent("touchstart", true, true);

        testSlider.on('slideStart', obj.addOne);

        var handleElem = $('#testSlider2').prev('div.slider').find('.slider-handle:first').get(0);
        handleElem.dispatchEvent(touchStart);
        handleElem.dispatchEvent(touchMove);
        handleElem.dispatchEvent(touchEnd);
        testSlider.slider('refresh');

        window.setTimeout(function() {
            expect(flag).toBe(1);
            expect(obj.addOne.calls.count()).toBe(1);
            done();
        });
      });

      describe("Disabled Slider Event Tests", function() {
        var spy;

        beforeEach(function() {
          testSlider.slider('disable');
          spy = jasmine.createSpy('spy');
        });

        it("should not trigger 'slideStart' event when disabled", function(done) {
          touch.initEvent("touchstart");

          testSlider.on('slideStart', spy);
          testSlider.data('slider')._mousedown(touch);

          window.setTimeout(function() {
            expect(spy).not.toHaveBeenCalled();
            done();
          });
        });

        it("should not trigger 'slide' event when disabled", function(done) {
          touch.initEvent("touchmove");

          testSlider.on('slide', spy);
          testSlider.data('slider')._mousemove(touch);

          window.setTimeout(function() {
            expect(spy).not.toHaveBeenCalled();
            done();
          });
        });

        it("should not trigger 'slideStop' event when disabled", function(done) {
          touch.initEvent("touchend");

          testSlider.on('slideStop', spy);
          testSlider.data('slider')._mouseup(mouse);

          window.setTimeout(function() {
            expect(spy).not.toHaveBeenCalled();
            done();
          });
        });
      });

    });

    describe("Enabled/Disabled tests", function() {
      var spy;

      beforeEach(function() {
        spy = jasmine.createSpy('spy');
      });

      it("'slideDisabled' event is triggered properly and can be binded to", function(done) {
        testSlider.on('slideDisabled', spy);
        testSlider.slider('disable');
        window.setTimeout(function() {
          expect(spy).toHaveBeenCalled();
          done();
        });
      });

      it("'slideDisabled' event is triggered properly and can be binded to", function(done) {
          testSlider.on('slideEnabled', spy);
          testSlider.slider('disable');
          testSlider.slider('enable');
          window.setTimeout(function() {
            expect(spy).toHaveBeenCalled();
            done();
          });
      });

      it("'change' event is triggered properly and can be binded to", function(done) {
        testSlider.on('change', spy);
        testSlider.slider("setValue", 3, false, true);
        window.setTimeout(function() {
          expect(spy).toHaveBeenCalled();
          done();
        });
      });
    });

  }); // End of JQuery version tests

  describe("CommonJS version", function() {
    describe("Event repetition tests", function() {
      var testSlider, numTimesFired;
      var testObj;

      beforeEach(function() {
        testSlider = new Slider("#testSlider2");
        numTimesFired = 0;
        testObj = {
          addOne: function() {
            numTimesFired++;
          }
        };
      });

      afterEach(function() {
        testSlider.destroy();
      });

      it("'slide' event is triggered only once per slide action", function(done) {
        spyOn(testObj, 'addOne').and.callThrough();

        testSlider.on('slide', testObj.addOne);
        testSlider._mousemove(mouse);

        setTimeout(function() {
          expect(numTimesFired).toBe(1);
          expect(testObj.addOne.calls.count()).toBe(1);
          done();
        });
      });

      it("'slideStart' event is triggered only once per slide action", function(done) {
        spyOn(testObj, 'addOne').and.callThrough();

        testSlider.on('slideStart', testObj.addOne);
        testSlider._mousedown(mouse);

        setTimeout(function() {
          expect(numTimesFired).toBe(1);
          expect(testObj.addOne.calls.count()).toBe(1);
          done();
        });
      });

      it("'slideStop' event is triggered only once per slide action", function(done) {
        spyOn(testObj, 'addOne').and.callThrough();

        testSlider.on('slideStop', testObj.addOne);
        testSlider._mouseup(mouse);

        setTimeout(function() {
          expect(numTimesFired).toBe(1);
          expect(testObj.addOne.calls.count()).toBe(1);
          done();
        });
      });

      it("'change' event is triggered only once per value change action", function(done) {
        spyOn(testObj, 'addOne').and.callThrough();

        testSlider.on('change', testObj.addOne);
        testSlider.setValue(3, false, true);

        setTimeout(function() {
          expect(numTimesFired).toBe(1);
          expect(testObj.addOne.calls.count()).toBe(1);
          done();
        });
      });
    });
  }); // End of common JS tests

}); // End of spec
