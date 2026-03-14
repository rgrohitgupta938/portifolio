export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function requireText(value: string, label: string) {
  if (!value.trim()) {
    return `${label} is required.`;
  }

  return "";
}

export function requireUrl(value: string, label: string) {
  if (!value.trim()) {
    return `${label} is required.`;
  }

  try {
    new URL(value);
    return "";
  } catch {
    return `${label} must be a valid URL.`;
  }
}