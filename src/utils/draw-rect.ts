import { CanvasCtx } from "../types";

interface DrawRectOptions {
  size: number;
  fill: string;
}

const drawRectOptions: DrawRectOptions = {
  size: 25,
  fill: "#333",
};

export function drawRect(
  ctx: CanvasCtx,
  x: number,
  y: number,
  options = drawRectOptions
) {
  ctx.fillStyle = options.fill;
  ctx.fillRect(x, y, options.size, options.size);
  ctx.fill();
}
