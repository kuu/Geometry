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
   * @constructor
   * @param {number} pStartX The start x position
   * @param {number} pStartY The start y position
   */
  function Path(pStartX, pStartY) {
    this.records = [];
    this._bounds = null;

    if (typeof pStartX !== 'number') {
      pStartX = 0;
    }
    if (typeof pStartY !== 'number') {
      pStartY = 0;
    }

    this.m(pStartX, pStartY);
  }

  Path.prototype.clone = function() {
    var tNewPath = new Path(0, 0);
    tNewPath.records = this.records.slice(0);
    tNewPath._bounds = this._bounds;

    return tNewPath;
  };

  Path.prototype.getBoundingRect = function() {
    if (this._bounds !== null) {
      return this._bounds;
    }

    // TODO: Calculate bounds
  };

  Path.prototype.moveTo = Path.prototype.m = function(pX, pY) {
    this.records.push({
      type: 'move',
      point: new Point(pX, pY)
    });

    return this;
  };

  Path.prototype.lineTo = Path.prototype.l = function(pX, pY) {
    this.records.push({
      type: 'line',
      point: new Point(pX, pY)
    });

    return this;
  };

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