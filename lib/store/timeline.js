const Store = require('dwflux/store');

const baseGapWidth = 5;

class TimelineStore extends Store {

  constructor() {
    super();

    this.settings = {
      length: 10000,
      gap: 10,
      gapWidth: baseGapWidth
    };
  }

  addSeconds(seconds) {
    this.settings.lenght += seconds * 1000;
    this.emit('change');
  }

  zoomIn(multiplier) {
    this.settings.gapWidth = baseGapWidth * multiplier;
    this.emit('change');
  }

  zoomOut(divider) {
    this.settings.gapWidth = baseGapWidth / divider;
    this.emit('change');
  }

}

module.exports = new TimelineStore();
