interface AnimeTimelineLike {
  add: (params: Record<string, unknown>, offset?: string | number) => AnimeTimelineLike;
}

export interface AnimeLike {
  (params: Record<string, unknown>): unknown;
  timeline: (params?: Record<string, unknown>) => AnimeTimelineLike;
  stagger: (value: number, params?: Record<string, unknown>) => unknown;
}

export async function loadAnime(): Promise<AnimeLike> {
  const mod = await import("animejs");
  const animeModule = (mod as { default?: unknown }).default ?? mod;
  return animeModule as AnimeLike;
}