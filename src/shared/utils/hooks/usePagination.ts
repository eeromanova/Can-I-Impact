export type NormalizedPagination = {
  totalSafe: number;
  currentPageSafe: number;
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

export const usePagination = (currentPage: number, total: number): NormalizedPagination => {
  const totalSafe = Number.isFinite(total) && total > 0 ? Math.floor(total) : 0;
  const rawZeroBased = Number.isFinite(currentPage) ? Math.floor(currentPage) : 0;

  const currentPageSafe = totalSafe === 0 ? 0 : clamp(rawZeroBased, 1, totalSafe);

  return { totalSafe, currentPageSafe };
};
