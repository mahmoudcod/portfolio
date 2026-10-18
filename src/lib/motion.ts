/**
 * Effective motion preference for the site.
 *
 * The early inline script in BaseLayout resolves the choice before first paint
 * and writes it to `<html data-motion="on|off">`: an explicit visitor override
 * (localStorage "site-motion", set by the header toggle) beats the OS
 * prefers-reduced-motion setting; with no override the OS setting wins.
 * With JS disabled the attribute is absent and the CSS media queries decide.
 */
export function motionDisabled(): boolean {
  const pref = document.documentElement.dataset.motion;
  if (pref === 'on') return false;
  if (pref === 'off') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
