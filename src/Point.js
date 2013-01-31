/**
 * @author Jason Parrott
 *
 * Copyright (C) 2013 BenriJS Project.
 * This code is licensed under the zlib license. See LICENSE for details.
 */

(function(global) {

  global.benri.geometry.Point = Point;

  /**
   * @constructor
   * @param {number} pX X
   * @param {number} pY Y
   */
  function Point(pX, pY) {
    this.x = pX;
    this.y = pY;
  }

  Point.prototype.transform = function(pMatrix) {
    var tNewPoint = pMatrix.getPoint(this.x, this.y);
    this.x = tNewPoint.x;
    this.y = tNewPoint.y;
  };

  Point.prototype.clone = function() {
    return new Point(this.x, this.y);
  };

}(this));