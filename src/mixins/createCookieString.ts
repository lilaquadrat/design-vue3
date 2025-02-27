import dayjs from 'dayjs';

interface CookieOptions {
    expires?: {
        value: number;
        unit: 'days' | 'weeks' | 'months' | 'years';
    };
    dev?: boolean;
    path?: string;
    domain?: string;
    // Allow overriding the automatically set values if needed
    sameSite?: 'None' | 'Lax' | 'Strict';
    secure?: boolean;
}

/**
 * Creates a cookie string for use with document.cookie
 * 
 * @example
 * // For production
 * document.cookie = createCookieString('lila-cookies', '1');
 * // For development
 * document.cookie = createCookieString('lila-cookies', '1', { dev: true });
 * // Custom values
 * document.cookie = createCookieString('lila-cookies-accepted', cookieKeys.join(','), { 
 *   expires: { value: 2, unit: 'years' }
 * });
 */
export function createCookieString (
  name: string,
  value: string,
  options: CookieOptions = {}
): string {
  const {
    expires = { value: 2, unit: 'years' },
    dev = false,
    path = '/',
    domain
  } = options;
    // Set sameSite and secure based on dev mode
    // Can be overridden by explicitly setting these values in options
  const sameSite = options.sameSite ?? (dev ? 'Lax' : 'None');
  const secure = options.secure ?? !dev;
  const cookieParts = [`${name}=${value}`];
  let isIframe = false;

  try {
    isIframe = window.self !== window.top;
  } catch (e) {
    // If an error occurs, assume the page is in an iframe.
    isIframe = true;
  }

  if (expires) {
    cookieParts.push(`expires=${dayjs().add(expires.value, expires.unit).toString()}`);
  }

  cookieParts.push(`path=${path}`);

  if (domain) {
    cookieParts.push(`domain=${domain}`);
  }

  cookieParts.push(`SameSite=${sameSite}`);

  if (secure) {
    cookieParts.push('Secure');
  }

  if(isIframe) {
    cookieParts.push('Partitioned');
  }

  console.log(cookieParts.join('; ').trim());
  return cookieParts.join('; ').trim();
}

export default createCookieString;
