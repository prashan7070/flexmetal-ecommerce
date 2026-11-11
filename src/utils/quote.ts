/**
 * Decoupled calculation and validation functions for quotes and dimensions
 */

export function calculateAreaSquareMeters(widthMm: number, heightMm: number): number {
  if (widthMm <= 0 || heightMm <= 0) return 0;
  const area = (widthMm * heightMm) / 1_000_000;
  return Number(area.toFixed(2));
}

export function generateReferenceNumber(prefix: string = 'FXM'): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${randomSuffix}`;
}

export function formatCurrency(amount: number, currency: string = 'LKR'): string {
  return `${currency} ${Math.round(amount).toLocaleString('en-US')}`;
}

export function validateQuoteDimensions(
  widthMm: number,
  heightMm: number
): { valid: boolean; error?: string } {
  if (!widthMm || widthMm < 500) {
    return { valid: false, error: 'Minimum opening width is 500 mm' };
  }
  if (widthMm > 15000) {
    return { valid: false, error: 'Maximum opening width is 15,000 mm for single span' };
  }
  if (!heightMm || heightMm < 500) {
    return { valid: false, error: 'Minimum opening height is 500 mm' };
  }
  if (heightMm > 12000) {
    return { valid: false, error: 'Maximum opening height is 12,000 mm' };
  }
  return { valid: true };
}

export function estimateShutterPrice(
  widthMm: number,
  heightMm: number,
  baseRatePerSqM: number,
  isMotorized: boolean
): number {
  const sqM = calculateAreaSquareMeters(widthMm, heightMm);
  const baseCost = sqM * baseRatePerSqM;
  const motorCost = isMotorized ? 65000 : 0; // LKR 65,000 for standard high-torque motor pack
  return Math.round(baseCost + motorCost);
}
