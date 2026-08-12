export const MIN_NAME_LENGTH = 2;
export const MAX_NAME_LENGTH = 30;

export function isValidUrl(value) {
  if (value.trim().length === 0) return false;

  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
