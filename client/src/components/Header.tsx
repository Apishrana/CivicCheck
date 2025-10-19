import { ThemeToggle } from "./ThemeToggle";
import logoImage from "@assets/generated_images/CivicCheck_shield_logo_icon_only_9d6167d2.png";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={logoImage} 
            alt="CivicCheck Logo" 
            className="h-9 w-9"
            data-testid="img-logo"
          />
          <h1 className="text-xl font-semibold" data-testid="text-app-title">
            CivicCheck
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
