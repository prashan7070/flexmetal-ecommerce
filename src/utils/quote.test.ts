import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateAreaSquareMeters,
  generateReferenceNumber,
  formatCurrency,
  validateQuoteDimensions,
  estimateShutterPrice,
} from './quote';

test('calculateAreaSquareMeters correctly calculates square meters from millimeters', () => {
  // 3000mm x 2500mm = 7.5 sq.m
  assert.equal(calculateAreaSquareMeters(3000, 2500), 7.5);
  // Zero or negative returns 0
  assert.equal(calculateAreaSquareMeters(0, 2500), 0);
  assert.equal(calculateAreaSquareMeters(-100, 2500), 0);
});

test('generateReferenceNumber produces valid format', () => {
  const ref = generateReferenceNumber('FXM');
  assert.match(ref, /^FXM-\d{4}-\d{4}$/);
});

test('formatCurrency formats LKR numbers with thousand separators', () => {
  assert.equal(formatCurrency(125000, 'LKR'), 'LKR 125,000');
  assert.equal(formatCurrency(0, 'LKR'), 'LKR 0');
});

test('validateQuoteDimensions verifies boundary ranges', () => {
  assert.equal(validateQuoteDimensions(400, 2000).valid, false);
  assert.equal(validateQuoteDimensions(3000, 400).valid, false);
  assert.equal(validateQuoteDimensions(3000, 2500).valid, true);
  assert.equal(validateQuoteDimensions(16000, 2500).valid, false);
});

test('estimateShutterPrice factors in square meters and motorization option', () => {
  // 2000mm x 2000mm = 4 sq.m * 15000 = 60,000
  const manual = estimateShutterPrice(2000, 2000, 15000, false);
  assert.equal(manual, 60000);

  // Motorized adds 65,000
  const motorized = estimateShutterPrice(2000, 2000, 15000, true);
  assert.equal(motorized, 125000);
});
