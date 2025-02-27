export default function LvlRatio({ lvl, low }: { lvl: number; low: number }) {
  const start = 40000;
  const max = start * Math.pow(2, lvl - 1);
  //console.log("max", max);

  const ratio = low / max;
  //console.log("ratio", ratio);

  return ratio * 100;
}
