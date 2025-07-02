import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ControlPanelProps {
  text: string;
  fontSize: number;
  shineIntensity: number;
  onTextChange: (text: string) => void;
  onFontSizeChange: (size: number) => void;
  onShineIntensityChange: (intensity: number) => void;
}

const ControlPanel = ({
  text = "Shiny Text",
  fontSize = 48,
  shineIntensity = 0.5,
  onTextChange = () => {},
  onFontSizeChange = () => {},
  onShineIntensityChange = () => {},
}: ControlPanelProps) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTextChange(e.target.value);
  };

  const handleFontSizeChange = (value: number[]) => {
    onFontSizeChange(value[0]);
  };

  const handleShineIntensityChange = (value: number[]) => {
    onShineIntensityChange(value[0]);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-background">
      <CardHeader>
        <CardTitle className="text-center">Customize Shiny Text</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="text-input">Text Content</Label>
          <Input
            id="text-input"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter text"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="font-size-slider">Font Size</Label>
            <span className="text-sm text-muted-foreground">{fontSize}px</span>
          </div>
          <Slider
            id="font-size-slider"
            min={16}
            max={96}
            step={1}
            value={[fontSize]}
            onValueChange={handleFontSizeChange}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="shine-intensity-slider">Shine Intensity</Label>
            <span className="text-sm text-muted-foreground">
              {Math.round(shineIntensity * 100)}%
            </span>
          </div>
          <Slider
            id="shine-intensity-slider"
            min={0}
            max={1}
            step={0.01}
            value={[shineIntensity]}
            onValueChange={handleShineIntensityChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ControlPanel;
