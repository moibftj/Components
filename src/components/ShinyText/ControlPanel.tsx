import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

interface ControlPanelProps {
  text: string;
  fontSize: number;
  shineIntensity: number;
  onTextChange: (text: string) => void;
  onFontSizeChange: (fontSize: number) => void;
  onShineIntensityChange: (intensity: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  text,
  fontSize,
  shineIntensity,
  onTextChange,
  onFontSizeChange,
  onShineIntensityChange,
}) => {
  return (
    <div className="space-y-6">
      {/* Text Input */}
      <div className="space-y-2">
        <Label htmlFor="text-input" className="text-sm font-medium">
          Text Content
        </Label>
        <Input
          id="text-input"
          type="text"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Enter your text here..."
          className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
        />
      </div>

      {/* Font Size Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="font-size-slider" className="text-sm font-medium">
            Font Size
          </Label>
          <span className="text-sm text-slate-400">{fontSize}px</span>
        </div>
        <Slider
          id="font-size-slider"
          min={24}
          max={120}
          step={2}
          value={[fontSize]}
          onValueChange={(value) => onFontSizeChange(value[0])}
          className="w-full"
        />
      </div>

      {/* Shine Intensity Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="shine-intensity-slider" className="text-sm font-medium">
            Shine Intensity
          </Label>
          <span className="text-sm text-slate-400">
            {Math.round(shineIntensity * 100)}%
          </span>
        </div>
        <Slider
          id="shine-intensity-slider"
          min={0}
          max={1}
          step={0.1}
          value={[shineIntensity]}
          onValueChange={(value) => onShineIntensityChange(value[0])}
          className="w-full"
        />
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
        <h4 className="text-sm font-medium text-slate-300 mb-2">Tips:</h4>
        <ul className="text-xs text-slate-400 space-y-1">
          <li>• Move your mouse over the text to change shine direction</li>
          <li>• Adjust font size for better visibility</li>
          <li>• Higher shine intensity creates more dramatic effects</li>
        </ul>
      </div>
    </div>
  );
};

export default ControlPanel;