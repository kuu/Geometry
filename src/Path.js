/**
 * @author Jason Parrott
 *
 * Copyright (C) 2013 BenriJS Project.
 * This code is licensed under the zlib license. See LICENSE for details.
 */

(function(global) {

  var benri = global.benri;
  var Point = benri.geometry.Point;

  benri.geometry.Path = Path;

  /**
   * @class
   * @constructor
   * @param {number} pStartX The start x position
   * @param {number} pStartY The start y position
   */
  function Path(pStartX, pStartY) {
    /**
     * Each of the records needed to describe this path.
     * @type {Array}
     */
    this.records = [];

    /**
     * The cached bounds of this Path.
     * @type {benri.geometry.Rect=null}
     * @private
     */
    this._bounds = null;

    if (typeof pStartX !== 'number') {
      pStartX = 0;
    }
    if (typeof pStartY !== 'number') {
      pStartY = 0;
    }

    this.m(pStartX, pStartY);
  }

  /**
   * Get a clone of this Path.
   * @return {benri.geometry.Path} The clone.
   */
  Path.prototype.clone = function() {
    var tNewPath = new Path(0, 0);
    tNewPath.records = this.records.slice(0);
    tNewPath._bounds = this._bounds;

    return tNewPath;
  };

  /**
   * Gets the bounds of this Path.
   * @return {benri.geometry.Rect} The bounds.
   */
  Path.prototype.getBoundingRect = function() {
    if (this._bounds !== null) {
      return this._bounds;
    }

    throw new Error('Not implemented');
  };

  /**
   * Move to the specified location without
   * joining to the current point.
   * @param  {number} pX The X location.
   * @param  {number} pY The Y location.
   * @return {benri.geometry.Path} This.
   */
  Path.prototype.moveTo = Path.prototype.m = function(pX, pY) {
    this.records.push({
      type: 'move',
      point: new Point(pX, pY)
    });

    return this;
  };

  /**
   * Move to the specified location while joining
   * to the current point.
   * @param  {number} pX The X location.
   * @param  {number} pY The Y location.
   * @return {benri.geometry.Path} This.
   */
  Path.prototype.lineTo = Path.prototype.l = function(pX, pY) {
    this.records.push({
      type: 'line',
      point: new Point(pX, pY)
    });

    return this;
  };

  /**
   * Do a quadratic curve to the specified location while joining
   * to the current point.
   * @param {number} pControlX The control X location.
   * @param {number} pControlY The controlY location.
   * @param  {number} pX The X location.
   * @param  {number} pY The Y location.
   * @return {benri.geometry.Path} This.
   */
  Path.prototype.quadraticCurveTo = Path.prototype.qc = function(pControlX, pControlY, pX, pY) {
    this.records.push({
      type: 'quadraticCurve',
      controlPoint: new Point(pControlX, pControlY),
      point: new Point(pX, pY)
    });

    return this;
  };

  //TODO: Add more functions for drawing paths.

}(this));