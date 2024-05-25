import { CanvasCtx } from "../types";

interface DrawTextOptions {
  size: number;
  fill: string;
}

const drawTextOptions: DrawTextOptions = {
  size: 25,
  fill: "#333",
};

export function drawText(
  ctx: CanvasCtx,
  text: string,
  x: number,
  y: number,
  options = drawTextOptions
) {
  ctx.font = `${options.size}px Arial`;
  ctx.fillStyle = options.fill;
  ctx.fillText(text, x, y);
  ctx.fill();
}
