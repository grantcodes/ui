const DEFAULT_COLORS = [
  'var(--g-color-primary-500)',
  'var(--g-color-secondary-500)',
  'var(--g-color-tertiary-500)',
];

function isSegment(segment) {
  return (
    segment &&
    typeof segment === 'object' &&
    typeof segment.id === 'string' &&
    typeof segment.label === 'string'
  );
}

function positiveValue(value) {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0;
}

/**
 * Returns sanitized segments with unrounded shares and independently rounded display percentages.
 */
export function calculateSegments(segments) {
  if (!Array.isArray(segments)) {
    return [];
  }

  const validSegments = segments.filter(isSegment);
  const largestValue = Math.max(0, ...validSegments.map(({ value }) => positiveValue(value)));
  const normalizedTotal = validSegments.reduce(
    (total, { value }) => total + (largestValue ? positiveValue(value) / largestValue : 0),
    0,
  );

  return validSegments.map((segment, index) => {
    const normalizedValue = largestValue ? positiveValue(segment.value) / largestValue : 0;
    const share = normalizedTotal ? normalizedValue / normalizedTotal : 0;

    return {
      id: segment.id,
      label: segment.label,
      color:
        typeof segment.color === 'string' && segment.color
          ? segment.color
          : DEFAULT_COLORS[index % DEFAULT_COLORS.length],
      share,
      percentage: Math.round(share * 100),
    };
  });
}
