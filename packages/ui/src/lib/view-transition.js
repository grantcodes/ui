/**
 * True when the user has asked for reduced motion.
 *
 * @returns {boolean}
 */
export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  );
}

/**
 * True when `startViewTransition` would actually run a transition, so callers can
 * keep their previous animation as the fallback path.
 *
 * @returns {boolean}
 */
export function canViewTransition() {
  return (
    typeof document !== 'undefined' &&
    typeof document.startViewTransition === 'function' &&
    !prefersReducedMotion()
  );
}

/**
 * Runs `update` inside a view transition when the platform supports one and the
 * user has not asked for reduced motion. Returns the transition, or `null` when
 * `update` ran synchronously.
 *
 * @param {() => void | Promise<unknown>} update
 * @returns {ViewTransition | null}
 */
export function startViewTransition(update) {
  if (!canViewTransition()) {
    update();
    return null;
  }

  return document.startViewTransition(update);
}
