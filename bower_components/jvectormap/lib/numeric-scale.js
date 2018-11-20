jvm.NumericScale = function(scale, normalizeFunction, minValue, maxValue) {
  this.scale = [];

  normalizeFunction = normalizeFunction || 'linear';

  if (scale) this.setScale(scale);
  if (normalizeFunction) this.setNormalizeFunction(normalizeFunction);
  if (minValue) this.setMin(minValue);
  if (maxValue) this.setMax(maxValue);
};

jvm.NumericScale.prototype = {
  setMin: function(min) {
    this.clearMinValue = min;
    if (typeof this.normalize === 'function') {
      this.minValue = this.normalize(min);
    } else {
      this.minValue = min;
    }
  },

  setMax: function(max) {
    this.clearMaxValue = max;
    if (typeof this.normalize === 'function') {
      this.maxValue = this.normalize(max);
    } else {
      this.maxValue = max;
    }
  },

  setScale: function(scale) {
    var i;

    for (i = 0; i < scale.length; i++) {
      this.scale[i] = [scale[i]];
    }
  },

  setNormalizeFunction: function(f) {
    if (f === 'polynomial') {
      this.normalize = function(value) {
        return Math.pow(value, 0.2);
      }
    } else if (f === 'linear') {
      delete this.normalize;
    } else {
      this.normalize = f;
    }
    this.setMin(this.clearMinValue);
    this.setMax(this.clearMaxValue);
  },

  getValue: function(value) {
    var lengthes = [],
        fullLength = 0,
        l,
        i = 0,
        c;

    if (typeof this.normalize === 'function') {
      value = this.normalize(value);
    }
    for (i = 0; i < this.scale.length-1; i++) {
      l = this.vectorLength(this.vectorSubtract(this.scale[i+1], this.scale[i]));
      lengthes.push(l);
      fullLength += l;
    }

    c = (this.maxValue - this.minValue) / fullLength;
    for (i=0; i<lengthes.length; i++) {
      lengthes[i] *= c;
    }

    i = 0;
    value -= this.minValue;
    while (value - lengthes[i] >= 0) {
      value -= lengthes[i];
      i++;
    }

    if (i == this.scale.length - 1) {
      value = this.vectorToNum(this.scale[i])
    } else {
      value = (
        this.vectorToNum(
          this.vectorAdd(this.scale[i],
            this.vectorMult(
              this.vectorSubtract(this.scale[i+1], this.scale[i]),
              (value) / (lengthes[i])
            )
          )
        )
      );
    }

    return value;
  },

  vectorToNum: function(vector) {
    var num = 0,
        i;

    for (i = 0; i < vector.length; i++) {
      num += Math.round(vector[i])*Math.pow(256, vector.length-i-1);
    }
    return num;
  },

  vectorSubtract: function(vector1, vector2) {
    var vector = [],
        i;

    for (i = 0; i < vector1.length; i++) {
      vector[i] = vector1[i] - vector2[i];
    }
    return vector;
  },

  vectorAdd: function(vector1, vector2) {
    var vector = [],
        i;

    for (i = 0; i < vector1.length; i++) {
      vector[i] = vector1[i] + vector2[i];
    }
    return vector;
  },

  vectorMult: function(vector, num) {
    var result = [],
        i;

    for (i = 0; i < vector.length; i++) {
      result[i] = vector[i] * num;
    }
    return result;
  },

  vectorLength: function(vector) {
    var result = 0,
        i;
    for (i = 0; i < vector.length; i++) {
      result += vector[i] * vector[i];
    }
    return Math.sqrt(result);
  }
};