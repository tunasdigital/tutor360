export const wowAnimation = () => {
  if (typeof window !== "undefined") {
    import("wowjs").then((mod: any) => {
      // wowjs pode exportar de formas diferentes dependendo do bundler/versão:
      // - mod.WOW
      // - mod.default.WOW
      // - mod.default (classe direto)
      const WOWClass = mod?.WOW || mod?.default?.WOW || mod?.default;

      if (typeof WOWClass === "function") {
        new WOWClass({ live: false }).init();
      }
    });
  }
};

export function discountPrice(price: number, discount: number) {
  return price - (price * discount) / 100;
}

export const formatKey = (key: string) => {
  return key
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
};

export const removeTagInText = (text: string) => {
  return text.replace(/(<([^>]+)>)/gi, "");
};