"use client";

import AlertProvider from "./AlertProvider";
import TanstackQueryProvider from "./TanstackQueryProvider";
import ThemeContextProvider from "./ThemeContextProvider";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeContextProvider>
      <TanstackQueryProvider>
        <AlertProvider>{children}</AlertProvider>
      </TanstackQueryProvider>
    </ThemeContextProvider>
  );
}
