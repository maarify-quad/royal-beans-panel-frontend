import type { ShopifyProduct, ShopifyVariant } from "@services/productMappingApi";

export type VariantGroup = {
  key: string;
  keepOptions: string[];
  ignoredValues: string[];
  variants: ShopifyVariant[];
};

// "Öğütme Metodu", "Öğütüm", "Grind" gibi isimleri yakalamak için
// substring match kullanıyoruz (tam eşleşme değil). Bu option fatura
// için önemsiz olduğundan, o boyuttaki varyantları tek bir gruba topluyoruz.
export const findIgnoredOptionIndex = (product: ShopifyProduct): number => {
  const ignoredKeywords = ["öğüt", "ogut", "grind"];
  for (let i = 0; i < (product.options || []).length; i++) {
    const name = (product.options[i]?.name || "").toLowerCase().trim();
    if (ignoredKeywords.some((k) => name.includes(k))) return i + 1;
  }
  return -1;
};

export const groupVariants = (product: ShopifyProduct): VariantGroup[] => {
  const ignoredIdx = findIgnoredOptionIndex(product);

  if (ignoredIdx === -1) {
    return product.variants.map((v) => ({
      key: v.id,
      keepOptions: [v.option1, v.option2, v.option3].filter(Boolean) as string[],
      ignoredValues: [],
      variants: [v],
    }));
  }

  const groups = new Map<string, VariantGroup>();
  for (const v of product.variants) {
    const keepParts: string[] = [];
    const options = [v.option1, v.option2, v.option3];
    for (let i = 0; i < 3; i++) {
      if (i + 1 === ignoredIdx) continue;
      if (options[i]) keepParts.push(options[i] as string);
    }
    const key = keepParts.length > 0 ? keepParts.join(" / ") : "__all_variants__";
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        keepOptions: keepParts,
        ignoredValues: [],
        variants: [],
      });
    }
    const g = groups.get(key)!;
    g.variants.push(v);
    const ignoredVal = options[ignoredIdx - 1];
    if (ignoredVal && !g.ignoredValues.includes(ignoredVal)) {
      g.ignoredValues.push(ignoredVal);
    }
  }
  return [...groups.values()];
};

export const getGroupMapping = (
  group: VariantGroup,
  relations: Map<string, string[]>
): string[] => {
  for (const v of group.variants) {
    if (relations.has(v.id)) return relations.get(v.id) as string[];
  }
  return [];
};
