/**
 * Storefront customer session token (Sanctum token with the "customer" ability).
 * "Remember me" keeps it in localStorage (survives browser restarts); otherwise it lives in
 * sessionStorage and ends when the browser/tab session closes. Never sent to /admin.
 */
const TOKEN_KEY = 'sofalora_customer_token';

type Listener = (token: string | null) => void;
const listeners = new Set<Listener>();

const read = (store: Storage): string | null => {
  try {
    const t = store.getItem(TOKEN_KEY);
    return t && t.trim() ? t : null;
  } catch {
    return null;
  }
};

export function getCustomerToken(): string | null {
  if (typeof window === 'undefined') return null;
  return read(window.localStorage) ?? read(window.sessionStorage);
}

/** Store (or clear, with null) the token. `remember: false` keeps it for this browser session only. */
export function setCustomerToken(token: string | null, options: { remember?: boolean } = {}): void {
  const remember = options.remember !== false;
  try {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    if (token) (remember ? localStorage : sessionStorage).setItem(TOKEN_KEY, token);
  } catch {
    // ignore storage errors (private mode)
  }
  listeners.forEach((fn) => fn(token));
}

export function onCustomerTokenChange(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** +9665XXXXXXXX → 05XXXXXXXX for display and form fields. */
export function localSaudiPhone(phone: string | null | undefined): string {
  const digits = String(phone ?? '').replace(/\D+/g, '');
  const m = digits.match(/^(?:966)?0?(5\d{8})$/);
  return m ? `0${m[1]}` : String(phone ?? '');
}
