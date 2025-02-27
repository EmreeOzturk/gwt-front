import { callDecimals } from "@/contractInteractions/useAppContract";

export async function parseToDecimals(value: number) {
  const getDecimal = await callDecimals();
  console.log("getDecimal", getDecimal);
  let decimal = Number(getDecimal);
  return Math.floor((Number(value) * Math.pow(10, decimal))).toLocaleString('fullwide', { useGrouping: false });
}

// tam tersi bir fonksiyon yaz
export async function decimalToParse(value: number) {
  const getDecimal = await callDecimals();
  console.log("getDecimal", getDecimal);
  let decimal = Number(getDecimal);
  return Number((Number(value) / Math.pow(10, decimal)).toFixed(18));
}
