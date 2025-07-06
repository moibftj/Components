import React, { useState } from "react";
import ShinyText from "./ShinyText/ShinyText.tsx";
import ControlPanel from "./ShinyText/ControlPanel.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Home = () => {
  const [text, setText] = useState("Shiny Text Effect");
  const [fontSize, setFontSize] = useState(64);
  const [shineIntensity, setShineIntensity] = useState(0.8);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 to-slate-800 p-6 md:p-10">
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Shiny Text with Sparkles
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto">
          An eye-catching React component that displays text with a metallic
          shiny effect on top of an animated sparkles background.
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="mb-10 rounded-xl overflow-hidden border border-slate-700 bg-slate-900/50 backdrop-blur-sm">
          <div className="h-[400px] flex items-center justify-center relative">
            <ShinyText
              text={text}
              fontSize={fontSize}
              shineIntensity={shineIntensity}
            />
          </div>
        </div>

        <Card className="bg-slate-900/70 border-slate-700 text-white">
          <CardHeader>
            <CardTitle>Customize Shiny Text</CardTitle>
            <CardDescription className="text-slate-300">
              Adjust the properties below to customize the shiny text effect.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ControlPanel
              text={text}
              fontSize={fontSize}
              shineIntensity={shineIntensity}
              onTextChange={setText}
              onFontSizeChange={setFontSize}
              onShineIntensityChange={setShineIntensity}
            />
          </CardContent>
        </Card>

        <Separator className="my-10 bg-slate-700" />

        <div className="text-center text-slate-400 text-sm">
          <p>
            Move your mouse over the text to see the shine effect change
            direction.
          </p>
          <p>
            Hover near the text to see increased sparkle density around your
            cursor.
          </p>
        </div>
      </main>

      <footer className="mt-16 text-center text-slate-500 text-sm">
        <p>Built with React, Tailwind CSS, and Framer Motion</p>
      </footer>
    </div>
  );
};

export default Home;