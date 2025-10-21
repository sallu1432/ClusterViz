import { BrainCircuit } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

type MainHeaderProps = {
  showExtraGraphs: boolean;
  onToggleExtraGraphs: () => void;
};

export function MainHeader({ showExtraGraphs, onToggleExtraGraphs }: MainHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex items-center gap-2">
        <BrainCircuit className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold tracking-tight">
          Hierarchical Clustering Data Visualization Dashboard
        </h1>
      </div>
      <p className="hidden md:block text-sm text-muted-foreground ml-4 flex-1">
        An interactive tool for exploring and interpreting clustering results.
      </p>
      <div className="flex items-center gap-2">
        <Label htmlFor="extra-graphs-toggle" className="text-sm whitespace-nowrap">Show Advanced Views</Label>
        <Switch
          id="extra-graphs-toggle"
          checked={showExtraGraphs}
          onCheckedChange={onToggleExtraGraphs}
        />
      </div>
    </header>
  );
}
