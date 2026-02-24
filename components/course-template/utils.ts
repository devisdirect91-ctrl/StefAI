import type { ParsedModule } from "./types";

const MODULE_ICONS = [
  "⬡", "△", "○", "◇", "▷", "⬠", "⬡", "△", "○", "◇",
];

/** Extract numeric value from price strings like "297€", "3 × 99€", "$49", "49 EUR" */
export function parsePrice(price: string): number {
  const multiMatch = price.replace(/\s/g, "").match(/(\d+)[×xX*](\d+(?:[.,]\d+)?)/);
  if (multiMatch) {
    return parseInt(multiMatch[1]) * parseFloat(multiMatch[2].replace(",", "."));
  }
  const m = price.replace(/\s/g, "").match(/\d+(?:[.,]\d+)?/);
  return m ? parseFloat(m[0].replace(",", ".")) : 0;
}

/** Parse free-text modules (one per line) into structured objects */
export function parseModules(raw: string): ParsedModule[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line, i) => {
      const cleanTitle = line
        .replace(/^module\s+\d+\s*[–\-—:]\s*/i, "")
        .replace(/^\d+[\.\)]\s*/, "")
        .trim() || line;
      return {
        number: i + 1,
        rawTitle: line,
        cleanTitle,
        icon: MODULE_ICONS[i % MODULE_ICONS.length],
      };
    });
}

/** Split bonus string into individual items */
export function parseBonus(bonus?: string): string[] {
  if (!bonus?.trim()) return [];
  return bonus
    .split(/[,;]\s*|\n/)
    .map((b) => b.trim())
    .filter((b) => b.length > 2);
}

/** True if bonus text mentions a money-back guarantee */
export function hasGuarantee(bonus?: string): boolean {
  if (!bonus) return false;
  const l = bonus.toLowerCase();
  return l.includes("garantie") || l.includes("remboursé") || l.includes("rembourse");
}

/** Truncate a string to roughly N words */
export function firstWords(text: string, n: number): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= n) return text;
  return words.slice(0, n).join(" ") + "…";
}

/** Truncate to N characters at a word boundary */
export function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  const cut = text.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > maxLen * 0.6 ? cut.slice(0, lastSpace) : cut) + "…";
}
