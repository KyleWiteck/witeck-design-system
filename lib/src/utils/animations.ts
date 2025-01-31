/**
 * Generates an infinite sequence of animation frames using requestAnimationFrame.
 * Used to create smooth animations by yielding frame timings before browser repaints.
 *
 * @returns {AsyncGenerator<number>} Generator yielding frame timestamps
 * @example
 * ```ts
 * for await (const timestamp of animationFrames()) {
 *   // Animate something each frame
 * }
 * ```
 */
export async function* animationFrames() {
  while (true) {
    yield await new Promise(globalThis.requestAnimationFrame);
  }
}

/**
 * Collection of easing functions for animation timing.
 * Each function transforms linear progress (0-1) into eased progress.
 * @see {@link https://easings.net/} for visual examples
 */
export const ease = {
  /**
   * Quadratic ease-out - Decelerates to end
   * @param {number} x Progress value between 0-1
   * @returns {number} Eased value
   */
  outQuad(x: number) {
    return 1 - (1 - x) * (1 - x);
  },

  /**
   * Quadratic ease-in - Accelerates from start
   * @param {number} x Progress value between 0-1
   * @returns {number} Eased value
   */
  inQuad(x: number) {
    return x * x;
  },

  /**
   * Quartic ease-out - Stronger deceleration
   * @param {number} x Progress value between 0-1
   * @returns {number} Eased value
   */
  outQuart(x: number) {
    return 1 - Math.pow(1 - x, 4);
  },

  /**
   * Quartic ease-in - Stronger acceleration
   * @param {number} x Progress value between 0-1
   * @returns {number} Eased value
   */
  inQuart(x: number) {
    return x * x * x * x;
  }
};

/**
 * Calculates animation progress for a single frame.
 *
 * @param {Object} options Animation configuration
 * @param {number} options.startTime Animation start timestamp
 * @param {number} options.pixels Total pixels to animate
 * @param {number} options.timestamp Current frame timestamp
 * @param {number} [options.duration=450] Animation duration in ms
 * @param {Function} [options.easing=ease.outQuart] Easing function
 * @returns {number} Calculated pixel value for current frame
 */
export function animate(options: {
  startTime: number;
  pixels: number;
  timestamp: number;
  duration?: number;
  easing?: (x: number) => number;
}) {
  const { startTime, pixels, timestamp, duration = 450, easing = ease.outQuart } = options;

  const runtime = timestamp - startTime;
  const progress = runtime / duration;
  const easedProgress = easing(progress);
  return Math.round(pixels * Math.min(easedProgress, 1));
}

/**
 * Generator that animates a collapse effect over time.
 * Yields decreasing values from pixels to 0.
 *
 * @param {number} pixels Starting height to collapse from
 * @yields {number} Current height value
 * @example
 * ```ts
 * for await (const height of collapse(200)) {
 *   element.style.height = `${height}px`;
 * }
 * ```
 */
export async function* collapse(pixels: number, duration?: number) {
  let currentValue = pixels;
  const startTime = performance.now();

  for await (const timestamp of animationFrames()) {
    if (currentValue > 0) {
      currentValue = pixels - animate({ startTime, pixels, timestamp, duration });
      yield currentValue;
    } else break;
  }
}

/**
 * Generator that animates an expand effect over time.
 * Yields increasing values from 0 to pixels.
 *
 * @param {number} pixels Target height to expand to
 * @yields {number} Current height value
 * @example
 * ```ts
 * for await (const height of expand(200)) {
 *   element.style.height = `${height}px`;
 * }
 * ```
 */
export async function* expand(pixels: number, duration?: number) {
  let currentValue = 0;
  const startTime = performance.now();

  for await (const timestamp of animationFrames()) {
    if (currentValue < pixels) {
      currentValue = animate({ startTime, pixels, timestamp, duration });
      yield Math.min(currentValue, pixels);
    } else break;
  }
}
