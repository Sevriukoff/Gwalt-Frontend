import { getPaletteFromURL } from "color-thief-node";

const darkenColor = (color, factor) => {
  return color.map(channel => Math.max(0, Math.min(255, Math.round(channel * factor))));
};

export const getGradientStyles = async (imageUrl) => {
  try {
    const palette = await getPaletteFromURL(imageUrl);
    const darkenedColors = palette.map(color => darkenColor(color, 0.5));
    const gradient = `linear-gradient(to right, rgb(${palette[0]}), rgb(${darkenedColors[1]}))`;

    return {
      background: gradient,
    };
  } catch (error) {
    console.error('Error generating gradient:', error);
    throw error;
  }
};