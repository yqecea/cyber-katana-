export interface ScrollState {
  scrollY: number;
  progress: number;
}

export enum SectionTheme {
  DARK = 'dark',
  NEON = 'neon',
  LIGHT = 'light' // Not used but good for extensibility
}
