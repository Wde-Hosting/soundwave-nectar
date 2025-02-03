import { Outlet } from "react-router-dom";
import { MainNav } from "@/components/navigation/MainNav";
import { LiveRadioPlayer } from "@/components/radio/LiveRadioPlayer";
import { ModeToggle } from "@/components/theme/mode-toggle";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="container py-6">
        <Outlet />
      </main>

      <LiveRadioPlayer />
    </div>
  );
}