/**
 * @author Jason Parrott
 *
 * Copyright (C) 2013 BenriJS Project.
 * This code is licensed under the zlib license. See LICENSE for details.
 */

(function(global) {

  global.benri.geometry.Rect = Rect;

  var Path = global.benri.geometry.Path;
  var Point = global.benri.geometry.Point;

  /**
   * A class that holds information about a rectangle
   * @class
   * @constructor
   * @param {benri.geometry.Point} pOrigin The origin (top left) of this Rect.
   * @param {number} pWidth The width of the Rect.
   * @param {number} pHeight The height of the Rect.
   */
  function Rect(pOrigin, pWidth, pHeight) {
    if (pHeight !== void 0) {
      /**
       * The origin (top left) of this Rect.
       * @type {benri.geometry.Point}
       */
      this.origin = pOrigin;

      /**
       * The width of this Rect.
       * @type {number}
       */
      this.width = pWidth;

      /**
       * The height of this Rect.
       * @type {number}
       */
      this.height = pHeight;
    } else {
      /**
       * The origin (top left) of this Rect.
       * @type {benri.geometry.Point}
       */
      this.origin = new Point(0, 0);

      /**
       * The width of this Rect.
       * @type {number}
       */
      this.width = pOrigin;

      /**
       * The height of this Rect.
       * @type {number}
       */
      this.height = pWidth;
    }
  }

  /**
   * Get a clone of this Rect.
   * @return {benri.geometry.Rect} The clone.
   */
  Rect.prototype.clone = function() {
    return new Rect(new Point(this.origin.x, this.origin.y), this.width, this.height);
  };

  /**
   * Get a representation of this Rect as a Path.
   * @return {benri.geometry.Path} The path.
   */
  Rect.prototype.getPath = function() {
    var tX = this.origin.x;
    var tY = this.origin.y;

    var tPath = new Path(tX, tY);
    tPath
    .l(tX + this.width, tY)
    .l(tX + this.width, tY + this.height)
    .l(tX, tY + this.height)
    .l(tX, tY);

    return tPath;
  }

  Rect.prototype.transform = function(pMatrix) {
    var tWidth = this.width;
    var tHeight = this.height;

    var tTopLeft = this.origin;

    var tX = tTopLeft.x;
    var tY = tTopLeft.y;

    tTopLeft.transform(pMatrix);
    var tTopRight = pMatrix.getPoint(tX + tWidth, tY);
    var tBottomLeft = pMatrix.getPoint(tX, tY + tHeight);
    var tBottomRight = pMatrix.getPoint(tX + tWidth, tY + tHeight);

    var tArray = [tTopLeft, tTopRight, tBottomLeft, tBottomRight];

    var tMinX = Infinity;
    var tMinY = Infinity;
    var tMaxX = -Infinity;
    var tMaxY = -Infinity;

    var tPoint;

    for (var i = 0; i < 4; i++) {
      tPoint = tArray[i];
      tX = tPoint.x;
      tY = tPoint.y;

      if (tX < tMinX) {
        tMinX = tX;
      }

      if (tX > tMaxX) {
        tMaxX = tX;
      }

      if (tY < tMinY) {
        tMinY = tY;
      }

      if (tY > tMaxY) {
        tMaxY = tY;
      }
    }

    tTopLeft.x = tMinX;
    tTopLeft.y = tMinY;

    this.width = tMaxX - tMinX;
    this.height = tMaxY - tMinY;

    return this;
  };

  /**
   * Merge this rect with the given rect and return the new rect.
   * @param {benri.geometry.Rect} pRect
   * @return {benri.geometry.Rect} The merged rect.
   */
  Rect.prototype.merge = function(pRect) {

    var tPointA, tPointB,
        tMinX, tMinY, tMaxX, tMaxY;

    if (pRect) {

      tPointA = this.origin;
      tPointB = pRect.origin;
      tMinX = tPointA.x < tPointB.x ? tPointA.x : tPointB.x;
      tMinY = tPointA.y < tPointB.y ? tPointA.y : tPointB.y;

      tPointA = new Point(this.origin.x + this.width,
                        this.origin.y + this.height);
      tPointB = new Point(pRect.origin.x + pRect.width,
                        pRect.origin.y + pRect.height);
      tMaxX = tPointA.x > tPointB.x ? tPointA.x : tPointB.x;
      tMaxY = tPointA.y > tPointB.y ? tPointA.y : tPointB.y;

      this.origin.x = tMinX;
      this.origin.y = tMinY;
      this.width = tMaxX - tMinX;
      this.height = tMaxY - tMinY;
    }
    return this;
  };

  /**
   * Check whether this rect has the same value as the given rect.
   * @param {benri.geometry.Rect} pRect
   * @return {boolean} True if the rects have the same value.
   */
  Rect.prototype.equals = function(pRect) {
    if (pRect && pRect.origin.x === this.origin.x
      && pRect.origin.y === this.origin.y
      && pRect.width === this.width
      && pRect.height === this.height) {
      return true;
    }
    return false;
  };

}(this));
