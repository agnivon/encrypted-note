"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lock } from "lucide-react";
import {
  AlertTemplateProps,
  Provider,
  positions,
  transitions,
} from "react-alert";
import { Toaster } from "sonner";
import { useThemeContext } from "./ThemeContextProvider";

const AlertTemplate = ({
  style,
  options,
  message,
  close,
}: AlertTemplateProps) => {
  return (
    <div style={style}>
      <Alert variant={options.type === "error" ? "destructive" : "default"}>
        <Lock className="h-4 w-4" />
        <AlertTitle>{message}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  );
};

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

const AlertProvider = ({ children }: { children?: React.ReactNode }) => {
  const { theme } = useThemeContext();

  return (
    <>
      <Toaster closeButton theme={theme} />
      <Provider {...options} template={AlertTemplate}>
        {children}
      </Provider>
    </>
  );
};

export default AlertProvider;
