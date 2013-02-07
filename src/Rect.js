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
  }

  /**
   * Get a clone of this Rect.
   * @return {benri.geometry.Rect} The clone.
   */
  Rect.prototype.clone = function() {
    return new Rect(this.origin, this.width, this.height);
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
      tPointB = new Point(pRect.x + pRect.width,
                        pRect.y + pRect.height);
      tMmaxX = tPointA.x > tPointB.x ? tPointA.x : tPointB.x;
      tMmaxY = tPointA.y > tPointB.y ? tPointA.y : tPointB.y;

      this.origin.x = tMinX;
      this.origin.y = tMinY;
      this.width = tMaxX;
      this.height = tMaxY;
    }
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
