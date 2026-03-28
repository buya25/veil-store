export type MoodSlug =
  | 'morning-person'
  | 'golden-hour'
  | 'the-cave'
  | 'sunday-slow'
  | 'after-dark';

export interface WindowMeasurement {
  width: number;
  height: number;
  rodType: 'track' | 'pole' | 'tension';
  returnDepth: number;
}

export interface StylePreferences {
  room: 'bedroom' | 'living' | 'kitchen' | 'bathroom' | 'office';
  lightDirection: 'north' | 'south' | 'east' | 'west';
  opacityLevel: 1 | 2 | 3 | 4 | 5;
  moodPreference: MoodSlug;
}

export interface WindowDNA {
  measurements: WindowMeasurement;
  preferences: StylePreferences;
  savedAt: string;
}
