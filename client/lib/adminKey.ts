const ADMIN_KEY_STORAGE = "portfolio_admin_key";

export function getStoredAdminKey() {
  if (typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem(ADMIN_KEY_STORAGE) || "";
}

export function setStoredAdminKey(value: string) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(ADMIN_KEY_STORAGE, value);
}

export function clearStoredAdminKey() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(ADMIN_KEY_STORAGE);
}
