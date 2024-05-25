export function extractRectAxis(c: HTMLCanvasElement, e: MouseEvent) {
  const rect = c.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  return { rect, x, y };
}
