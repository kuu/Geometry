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
   */
  function Matrix2D(pMatrixArray) {
    if (pMatrixArray) {
      this.fill(pMatrixArray);
    } else {
      this.identity();
    }
  }

  Matrix2D.prototype.equals = function(pMatrix) {
    if (this.a !== pMatrix.a) return false;
    if (this.b !== pMatrix.b) return false;
    if (this.c !== pMatrix.c) return false;
    if (this.d !== pMatrix.d) return false;
    if (this.e !== pMatrix.e) return false;
    if (this.f !== pMatrix.f) return false;

    return true;
  };

  Matrix2D.prototype.fill = function(pMatrixArray) {
    this.a = pMatrixArray[0];
    this.b = pMatrixArray[1];
    this.c = pMatrixArray[2];
    this.d = pMatrixArray[3];
    this.e = pMatrixArray[4];
    this.f = pMatrixArray[5];
  };

  Matrix2D.prototype.identity = function() {
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.e = 0;
    this.f = 0;
  }

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

  Matrix2D.prototype.inverse = function() {
    throw new Error();
  };

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

  Matrix2D.prototype.rotate = function(pAngle) {
    throw new Error();
  };

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

  Matrix2D.prototype.getPoint = function(pX, pY) {
    return new benri.geometry.Point(
      pX * this.a + pX * this.c + this.e,
      pY * this.b + pY * this.d + this.f
    );
  };

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

  Matrix2D.prototype.toCSSString = function() {
    return 'matrix3d(' + this.a + ',' + this.b + ',0,0,' + this.c + ',' + this.d + ',0,0,0,0,1,0,' + this.e + ',' + this.f + ',0,1)';
  };

}(this));
