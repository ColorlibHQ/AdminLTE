export default class Sparkline {
  constructor(element, options = {}) {
    this.element = element;
    this.options = { ...Sparkline.options, ...options };

    init: {
      this.element.innerHTML = "<canvas></canvas>";
      this.canvas = this.element.firstChild;
      this.context = this.canvas.getContext("2d");
      this.ratio = window.devicePixelRatio || 1;

      if (this.options.tooltip) {
        this.canvas.style.position = "relative";
        this.canvas.addEventListener('mousemove', e => {
          const x = e.offsetX || e.layerX || 0;
          const delta = ((this.options.width - this.options.dotRadius * 2) / (this._points.length - 1));
          const index = minmax(0, Math.round((x - this.options.dotRadius) / delta), this._points.length - 1);

          this.canvas.title = this.options.tooltip(this._points[index], index, this._points);
        }, false);
      }
    }
  }

  set points(points) {
    this.draw(points);
  }

  get points() {
    return this._points;
  }

  draw(points = []) {
    this._points = points;

    this.canvas.width = this.options.width * this.ratio;
    this.canvas.style.width = `${this.options.width}px`;

    const pxHeight = this.options.height || this.element.offsetHeight;
    this.canvas.height = pxHeight * this.ratio;
    this.canvas.style.height = `${pxHeight}px`;

    const lineWidth = this.options.lineWidth * this.ratio;
    const offsetX = Math.max(this.options.dotRadius * this.ratio, lineWidth / 2);
    const offsetY = Math.max(this.options.dotRadius * this.ratio, lineWidth / 2);
    const width = this.canvas.width - offsetX * 2;
    const height = this.canvas.height - offsetY * 2;

    const minValue = Math.min.apply(Math, points);
    const maxValue = Math.max.apply(Math, points);
    const bottomValue = this.options.minValue != undefined ? this.options.minValue : Math.min(minValue, this.options.maxMinValue != undefined ? this.options.maxMinValue : minValue);
    const topValue = this.options.maxValue != undefined ? this.options.maxValue : Math.max(maxValue, this.options.minMaxValue != undefined ? this.options.minMaxValue : maxValue);
    let minX = offsetX;
    let maxX = offsetX;

    let x = offsetX;
    const y = index => (topValue === bottomValue)
      ? offsetY + height / 2
      : (offsetY + height) - ((points[index] - bottomValue) / (topValue - bottomValue)) * height;
    const delta = width / (points.length - 1);

    const line = (style, x, y) => {
      if (!style) return;

      this.context.save();
      this.context.strokeStyle = style.color || 'black';
      this.context.lineWidth = (style.width || 1) * this.ratio;
      this.context.globalAlpha = style.alpha || 1;
      this.context.beginPath();
      this.context.moveTo(style.direction != 'right' ? offsetX : x, y);
      this.context.lineTo(style.direction != 'left' ? width + offsetX : x, y);
      this.context.stroke();
      this.context.restore();
    }

    const dot = (color, lineStyle, x, y) => {
      this.context.beginPath();
      this.context.fillStyle = color;
      this.context.arc(x, y, this.options.dotRadius * this.ratio, 0, Math.PI * 2, false);
      this.context.fill();
      line(lineStyle, x, y);
    }

    this.context.save();

    this.context.strokeStyle = this.options.lineColor;
    this.context.fillStyle = this.options.lineColor;
    this.context.lineWidth = lineWidth;
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';

    if (this.options.fillBelow && points.length > 1) {
      this.context.save();
      this.context.beginPath();
      this.context.moveTo(x, y(0));
      for (let i = 1; i < points.length; i++) {
        x += delta;

        minX = points[i] == minValue ? x : minX;
        maxX = points[i] == maxValue ? x : maxX;

        this.context.lineTo(x, y(i));
      }
      this.context.lineTo(width + offsetX, height + offsetY + lineWidth / 2);
      this.context.lineTo(offsetX, height + offsetY + lineWidth / 2);
      this.context.fill();
      if (this.options.fillLighten > 0) {
        this.context.fillStyle = 'white';
        this.context.globalAlpha = this.options.fillLighten;
        this.context.fill();
        this.context.globalAlpha = 1;
      } else if (this.options.fillLighten < 0) {
        this.context.fillStyle = 'black';
        this.context.globalAlpha = -this.options.fillLighten;
        this.context.fill();
      }
      this.context.restore();
    }

    x = offsetX;
    this.context.beginPath();
    this.context.moveTo(x, y(0));
    for (let i = 1; i < points.length; i++) {
      x += delta;
      this.context.lineTo(x, y(i));
    }
    this.context.stroke();

    this.context.restore();

    line(this.options.bottomLine, 0, offsetY);
    line(this.options.topLine, 0, height + offsetY + lineWidth / 2);

    dot(this.options.startColor, this.options.startLine, offsetX + (points.length == 1 ? width / 2 : 0), y(0));
    dot(this.options.endColor, this.options.endLine, offsetX + (points.length == 1 ? width / 2 : width), y(points.length - 1));
    dot(this.options.minColor, this.options.minLine, minX + (points.length == 1 ? width / 2 : 0), y(points.indexOf(minValue)));
    dot(this.options.maxColor, this.options.maxLine, maxX + (points.length == 1 ? width / 2 : 0), y(points.indexOf(maxValue)));
  }

  static init(element, options) {
    return new Sparkline(element, options);
  }

  static draw(element, points, options) {
    const sparkline = new Sparkline(element, options);
    sparkline.draw(points);
    return sparkline;
  }
}

Sparkline.options = {
  width: 100,
  height: null,
  lineColor: "black",
  lineWidth: 1.5,
  startColor: "transparent",
  endColor: "black",
  maxColor: "transparent",
  minColor: "transparent",
  minValue: null,
  maxValue: null,
  minMaxValue: null,
  maxMinValue: null,
  dotRadius: 2.5,
  tooltip: null,
  fillBelow: true,
  fillLighten: 0.5,
  startLine: false,
  endLine: false,
  minLine: false,
  maxLine: false,
  bottomLine: false,
  topLine: false,
  averageLine: false
};

function minmax(a, b, c) {
  return Math.max(a, Math.min(b, c));
}
