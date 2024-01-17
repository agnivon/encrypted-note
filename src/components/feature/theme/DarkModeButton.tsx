"use client";

import { useThemeContext } from "@/context/ThemeContextProvider";
import { Moon, Sun } from "lucide-react";

export default function DarkModeButton() {
  const { theme, setTheme } = useThemeContext();
  const Icon = theme === "light" ? Moon : Sun;
  return (
    <div
      onClick={() => setTheme((theme) => (theme === "dark" ? "light" : "dark"))}
      className="fixed top-3 right-3 p-2 text-foreground cursor-pointer"
    >
      <Icon className="h-6 w-6" />
    </div>
  );
}
