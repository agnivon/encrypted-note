import AppProvider from "@/context/AppProvider";
import DarkModeButton from "../feature/theme/DarkModeButton";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <DarkModeButton />
      <main className="text-foreground bg-background flex min-h-screen w-full flex-col items-center justify-center px-12 md:px-24">
        {children}
      </main>
    </AppProvider>
  );
}
