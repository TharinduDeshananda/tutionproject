export function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);

  // Generate a random hue value
  const hue = hash % 360;

  // Convert HSL to HEX
  const hexColor = hslToHex(hue, 60, 50);

  return hexColor;
}

function hslToHex(h: number, s: number, l: number): string {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const rgb = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  return rgbToHex(rgb);
}

function rgbToHex(rgb: number[]): string {
  return (
    "#" +
    rgb
      .map((component) => {
        const hex = Math.round(component).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

// Example usage
const inputString = "yourInputString";
const generatedColor = stringToColor(inputString);
console.log(generatedColor);
