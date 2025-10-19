import { ThemeProvider } from "../ThemeProvider";
import { Header } from "../Header";

export default function HeaderExample() {
  return (
    <ThemeProvider>
      <div className="bg-background min-h-[200px]">
        <Header />
      </div>
    </ThemeProvider>
  );
}
