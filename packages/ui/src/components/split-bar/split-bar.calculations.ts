export interface SplitSegment {
  id: string;
  label: string;
  value?: number;
  color?: string;
}

export interface CalculatedSegment {
  id: string;
  label: string;
  color: string;
  share: number;
  percentage: number;
}

const DEFAULT_COLORS = [
  'var(--g-color-primary-500)',
  'var(--g-color-secondary-500)',
  'var(--g-color-tertiary-500)',
];

function isSegment(segment: unknown): segment is SplitSegment {
  if (!segment || typeof segment !== 'object') return false;
  const value = segment as Record<string, unknown>;
  return typeof value.id === 'string' && typeof value.label === 'string';
}

function positiveValue(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0;
}

/**
 * Returns sanitized segments with unrounded shares and independently rounded display percentages.
 */
export function calculateSegments(segments: unknown): CalculatedSegment[] {
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
