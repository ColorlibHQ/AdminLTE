jvm.VMLImageElement = function(config, style){
  jvm.VMLImageElement.parentClass.call(this, 'image', config, style);
};

jvm.inherits(jvm.VMLImageElement, jvm.VMLShapeElement);

jvm.VMLImageElement.prototype.applyAttr = function(attr, value){
  var patternEl,
      imageEl,
      that = this;

  if (attr == 'image') {
    jvm.whenImageLoaded(value).then(function(img){
      that.node.setAttribute('src', value);
      that.width = img[0].width;
      that.height = img[0].height;
      that.applyAttr('width', that.width);
      that.applyAttr('height', that.height);

      jvm.VMLImageElement.images[value] = jvm.VMLImageElement.imageCounter++;

      that.applyAttr('x', that.cx - that.width / 2);
      that.applyAttr('y', that.cy - that.height / 2);

      jvm.$(that.node).trigger('imageloaded', [img]);
    });
  } else if(attr == 'cx') {
    this.cx = value;
    if (this.width) {
      this.applyAttr('x', value - this.width / 2);
    }
  } else if(attr == 'cy') {
    this.cy = value;
    if (this.height) {
      this.applyAttr('y', value - this.height / 2);
    }
  } else if(attr == 'width' || attr == 'height') {
    this.node.style[attr] = value + 'px';
  } else if (attr == 'x' || attr == 'y') {
    this.node.style[attr == 'x' ? 'left' : 'top'] = value + 'px';
  } else {
    jvm.VMLImageElement.parentClass.prototype.applyAttr.apply(this, arguments);
  }
};

jvm.VMLImageElement.imageCounter = 1;
jvm.VMLImageElement.images = {}