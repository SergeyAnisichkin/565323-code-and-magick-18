'use strict';
(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 20;
  var FONT = 16;
  var FONT_GAP = 10;
  var BAR_GAP = 40;
  var BAR_WIDTH = 40;
  var CHART_MAX_HEIGHT = 150;
  var fontLine = FONT_GAP + FONT;
  var barMaxHeight = CHART_MAX_HEIGHT - fontLine;
  var barBottomY = CLOUD_Y + CLOUD_HEIGHT - GAP - fontLine;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
    ctx.font = '16px PT Mono';
    ctx.fillStyle = '#000';
    ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP + FONT);
    ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + FONT + (FONT_GAP + FONT));
    var maxTime = getMaxElement(times);
    for (var i = 0; i < names.length; i++) {
      var currBarX = CLOUD_X + BAR_GAP * (i + 1) + BAR_WIDTH * i;
      ctx.fillStyle = '#000';
      ctx.fillText(names[i], currBarX, CLOUD_Y + CLOUD_HEIGHT - GAP);
      var currTime = Math.floor(times[i]);
      var currBarHeight = Math.floor(barMaxHeight * times[i] / maxTime);
      var currBarSaturation = Math.floor(Math.random() * 100);
      var currBarColor = 'hsl(240, ' + currBarSaturation + '%, 50%)';
      ctx.fillStyle = (names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : currBarColor);
      ctx.fillRect(currBarX, barBottomY - currBarHeight, BAR_WIDTH, currBarHeight);
      ctx.fillStyle = '#000';
      ctx.fillText(currTime, currBarX, barBottomY - currBarHeight - FONT_GAP);
    }
  };

})();
