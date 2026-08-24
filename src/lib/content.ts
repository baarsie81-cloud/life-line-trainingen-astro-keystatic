export const withContentSlugs = (modules: Record<string, unknown>) =>
  Object.entries(modules).map(([path, entry]) => ({
    ...(entry as { default: Record<string, any> }).default,
    slug: path.split("/").pop()?.replace(/\.json$/, "") ?? "",
  }));
