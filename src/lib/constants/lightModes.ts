export type LightMode = 'dawn' | 'noon' | 'golden' | 'night';

export interface LightModeConfig {
  label: string;
  time: string;
  overlayColor: string;
  brightness: number;
  saturate: number;
  warmth: string;
  shadowColor: string;
  gradientAngle: string;
  description: string;
}

export const LIGHT_MODES: Record<LightMode, LightModeConfig> = {
  dawn: {
    label: '6 AM',
    time: 'Dawn',
    overlayColor: 'rgba(200, 160, 100, 0.15)',
    brightness: 0.78,
    saturate: 0.85,
    warmth: 'rgba(255, 200, 120, 0.10)',
    shadowColor: 'rgba(255, 180, 80, 0.3)',
    gradientAngle: '160deg',
    description: 'Cool morning light filters softly through the fabric',
  },
  noon: {
    label: 'Noon',
    time: 'Midday',
    overlayColor: 'rgba(255, 255, 240, 0.06)',
    brightness: 1.08,
    saturate: 1.05,
    warmth: 'rgba(255, 255, 220, 0.05)',
    shadowColor: 'rgba(255, 255, 200, 0.15)',
    gradientAngle: '90deg',
    description: 'Full sun, clear and bright — fabric at its most vivid',
  },
  golden: {
    label: 'Golden Hour',
    time: 'Evening',
    overlayColor: 'rgba(255, 140, 50, 0.20)',
    brightness: 0.92,
    saturate: 1.25,
    warmth: 'rgba(255, 120, 30, 0.18)',
    shadowColor: 'rgba(255, 120, 30, 0.45)',
    gradientAngle: '120deg',
    description: 'Amber warmth transforms every colour in the room',
  },
  night: {
    label: 'Night',
    time: 'Midnight',
    overlayColor: 'rgba(15, 15, 50, 0.52)',
    brightness: 0.42,
    saturate: 0.55,
    warmth: 'rgba(20, 10, 60, 0.30)',
    shadowColor: 'rgba(10, 10, 40, 0.6)',
    gradientAngle: '180deg',
    description: 'Interior lamps create a warm, intimate cocoon',
  },
};
