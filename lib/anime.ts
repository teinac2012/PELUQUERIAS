export interface AnimeTimelineLike {
  add: (
    targets: string | Element[] | NodeListOf<Element> | Element,
    options?: Record<string, unknown>,
    position?: string | number
  ) => AnimeTimelineLike;
}

export interface AnimeModuleLike {
  animate: (targets: string | Element[] | NodeListOf<Element> | Element | Record<string, unknown>, options?: Record<string, unknown>) => unknown;
  stagger: (value: number, options?: Record<string, unknown>) => unknown;
  createTimeline: (options?: Record<string, unknown>) => AnimeTimelineLike;
}

export async function loadAnime(): Promise<AnimeModuleLike> {
  const mod = await import("animejs");
  return mod as unknown as AnimeModuleLike;
}