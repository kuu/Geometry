/**
 * @author Jason Parrott
 *
 * Copyright (C) 2013 BenriJS Project.
 * This code is licensed under the zlib license. See LICENSE for details.
 */

(function(global) {

  global.benri.geometry.Rect = Rect;

  var Path = global.benri.geometry.Path;

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

}(this));
