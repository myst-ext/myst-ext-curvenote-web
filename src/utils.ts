export function noBooleans(value) {
  return value === 'true' ? undefined : value;
}
