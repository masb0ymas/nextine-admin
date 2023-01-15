import _ from 'lodash'

/**
 *
 * @param value
 * @returns
 */
export function isNumeric(value: any): boolean {
  return !_.isNaN(parseFloat(value)) && _.isFinite(value)
}

/**
 *
 * @param value
 * @returns
 */
export function validateNumber(value: any): number {
  if (isNumeric(Number(value))) {
    return Number(value)
  }

  return 0
}

/**
 *
 * @param value
 * @returns
 */
export function formatPercent(value: string | number): string {
  const newValue = validateNumber(value)

  const percent = newValue * 100
  const result = `${percent} %`

  return result
}
