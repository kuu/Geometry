/**
 * @author Jason Parrott
 *
 * Copyright (C) 2013 BenriJS Project.
 * This code is licensed under the zlib license. See LICENSE for details.
 */

(function(global) {

  var benri = global.benri;

  benri.geometry.Matrix2D = Matrix2D;

  /**
   * @constructor
   * @class
   * @param {Array.<number>=} pMatrixArray An array of numbers to fill this matrix with.
   */
  function Matrix2D(pMatrixArray) {
    if (pMatrixArray) {
      this.fill(pMatrixArray);
    } else {
      this.identity();
    }
  }

  /**
   * Checks to see if this matrix is the same as another
   * @param  {benri.geometry.Matrix2D} pMatrix The matrix to check against.
   * @return {boolean} True of the are the same, false otherwise.
   */
  Matrix2D.prototype.equals = function(pMatrix) {
    if (this.a !== pMatrix.a) return false;
    if (this.b !== pMatrix.b) return false;
    if (this.c !== pMatrix.c) return false;
    if (this.d !== pMatrix.d) return false;
    if (this.e !== pMatrix.e) return false;
    if (this.f !== pMatrix.f) return false;

    return true;
  };

  /**
   * Populates this matrix with data.
   * @param  {Array.<number>} pMatrixArray The data.
   */
  Matrix2D.prototype.fill = function(pMatrixArray) {
    this.a = pMatrixArray[0];
    this.b = pMatrixArray[1];
    this.c = pMatrixArray[2];
    this.d = pMatrixArray[3];
    this.e = pMatrixArray[4];
    this.f = pMatrixArray[5];
  };

  /**
   * Sets this matrix to the identity matrix.
   */
  Matrix2D.prototype.identity = function() {
    /**
     * Scale X
     * @type {number}
     */
    this.a = 1;

    /**
     * Skew Y
     * @type {number}
     */
    this.b = 0;

    /**
     * Skew X
     * @type {number}
     */
    this.c = 0;

    /**
     * Scale Y
     * @type {number}
     */
    this.d = 1;

    /**
     * Translate X
     * @type {number}
     */
    this.e = 0;

    /**
     * Translate Y
     * @type {number}
     */
    this.f = 0;
  }

  /**
   * Multiply this matrix by another
   * @param  {benri.geometry.Matrix2D} pThat The matrix to multiply by.
   */
  Matrix2D.prototype.multiply = function(pThat) {
    var tMatrix = new Matrix2D();

    var tThisA = this.a;
    var tThisB = this.b;
    var tThisC = this.c;
    var tThisD = this.d;
    var tThisE = this.e;
    var tThisF = this.f;

    var tThatA = pThat.a;
    var tThatB = pThat.b;
    var tThatC = pThat.c;
    var tThatD = pThat.d;
    var tThatE = pThat.e;
    var tThatF = pThat.f;

    this.a = tThisA * tThatA + tThisC * tThatB;
    this.b = tThisA * tThatB + tThisB * tThatD;
    this.c = tThisA * tThatC + tThisC * tThatD;
    this.d = tThisD * tThatD + tThisB * tThatC;
    this.e = tThisA * tThatE + tThisC * tThatF + tThisE;
    this.f = tThisB * tThatE + tThisD * tThatF + tThisF;
  };

  /**
   * Inverse this matrix
   */
  Matrix2D.prototype.inverse = function() {
    throw new Error();
  };

  /**
   * Translate this matrix.
   * @param  {number} pX The X amount to translate
   * @param  {number} pY The Y amount to translate
   */
  Matrix2D.prototype.translate = function(pX, pY) {
    this.multiply({
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      e: pX,
      f: pY
    });
  };

  /**
   * Rotates this matrix by the give angle
   * @param  {number} pAngle The angle in radians
   */
  Matrix2D.prototype.rotate = function(pAngle) {
    throw new Error();
  };

  /**
   * Scales this matrix
   * @param  {number} pX The X factor
   * @param  {number} pY The Y factor
   */
  Matrix2D.prototype.scale = function(pX, pY) {
    this.multiply({
      a: pX,
      b: 0,
      c: 0,
      d: pY,
      e: 0,
      f: 0
    });
  };

  /**
   * Skews this matrix
   * @param  {number} pX The X factor
   * @param  {number} pY The Y factor
   */
  Matrix2D.prototype.skew = function(pX, pY) {
    this.multiply({
      a: 1,
      b: pY,
      c: pX,
      d: 1,
      e: 0,
      f: 0
    });
  };

  /**
   * Given X and Y values, return a Point that
   * is transformed according to this matrix.
   * @param  {number} pX The X value
   * @param  {number} pY The Y value
   * @return {benri.geometry.Point} The resulting Point.
   */
  Matrix2D.prototype.getPoint = function(pX, pY) {
    return new benri.geometry.Point(
      pX * this.a + pX * this.c + this.e,
      pY * this.b + pY * this.d + this.f
    );
  };

  /**
   * Get a clone of this matrix.
   * @return {benri.geometry.Matrix2D} The clone.
   */
  Matrix2D.prototype.clone = function() {
    var tMatrix = new Matrix2D();
    tMatrix.a = this.a;
    tMatrix.b = this.b;
    tMatrix.c = this.c;
    tMatrix.d = this.d;
    tMatrix.e = this.e;
    tMatrix.f = this.f;
    return tMatrix;
  };

  /**
   * Get a CSS String representation of this matrix.
   * @return {string} The string.
   */
  Matrix2D.prototype.toCSSString = function() {
    return 'matrix3d(' + this.a + ',' + this.b + ',0,0,' + this.c + ',' + this.d + ',0,0,0,0,1,0,' + this.e + ',' + this.f + ',0,1)';
  };

}(this));
