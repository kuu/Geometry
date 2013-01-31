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
   * @constructor
   * @param {Point} pOrigin The origin (top left) of this Rect.
   * @param {number} pWidth The width of the Rect.
   * @param {number} pHeight The height of the Rect.
   */
  function Rect(pOrigin, pWidth, pHeight) {
    this.origin = pOrigin;
    this.width = pWidth;
    this.height = pHeight;
  }

  Rect.prototype.clone = function() {
    return new Rect(this.origin, this.width, this.height);
  };

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
