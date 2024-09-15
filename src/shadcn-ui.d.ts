declare module 'shadcn-ui' {
    export const Slider: React.FC<{
      value: number;
      onChange: (value: number) => void;
      onMouseUp: () => void;
      min?: number;
      max?: number;
      step?: number;
    }>;
  }
  