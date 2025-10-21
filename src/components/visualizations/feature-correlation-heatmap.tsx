
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClusteringResults } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FeatureCorrelationHeatmapProps {
  data: ClusteringResults['feature_correlation'];
}

const getColor = (value: number | null) => {
    if (value === null) return 'hsl(var(--muted))';
    // Blue for negative, Red for positive, more vibrant
    const h = value > 0 ? 0 : 210;
    const s = 100;
    const l = 100 - (Math.abs(value) * 60 + 15);
    return `hsl(${h}, ${s}%, ${l}%)`;
};

const FeatureCorrelationHeatmap = ({ data }: FeatureCorrelationHeatmapProps) => {
  if (!data || data.matrix.length === 0) return null;

  const { features, matrix } = data;
  const size = features.length;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Feature Correlation Heatmap</CardTitle>
        <CardDescription>Shows the Pearson correlation between features. (Max 8 shown).</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-8 overflow-x-auto">
        <TooltipProvider>
          <div className="relative w-full" style={{ paddingBottom: '100%' }}>
            <div className="absolute inset-0 flex flex-col">
              <div className="flex-1 grid" style={{ gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`}}>
                {features.map((feature, i) => (
                  <div key={feature} className="flex">
                    <div className="w-24 flex-shrink-0 flex items-center justify-end pr-2 text-xs text-right text-muted-foreground" title={feature}>
                      <span className="truncate">{feature}</span>
                    </div>
                    <div className="flex-1 grid" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
                      {matrix[i].map((value, j) => (
                         <Tooltip key={`${i}-${j}`} delayDuration={100}>
                         <TooltipTrigger asChild>
                           <div
                             className="w-full h-full rounded-sm transition-transform duration-200 ease-in-out hover:scale-110 hover:z-10 flex items-center justify-center"
                             style={{
                               backgroundColor: getColor(value),
                               border: '1px solid hsl(var(--background))',
                             }}
                           >
                             <span className="text-xs font-mono text-foreground/80 mix-blend-difference">{value?.toFixed(2)}</span>
                           </div>
                         </TooltipTrigger>
                         <TooltipContent>
                           <p className="font-medium">{features[i]} &amp; {features[j]}: <span className="font-mono">{value?.toFixed(3) ?? 'N/A'}</span></p>
                         </TooltipContent>
                       </Tooltip>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex pl-24" style={{ height: '4rem' }}>
                {features.map((feature) => (
                  <div key={`x-${feature}`} className="flex-1 flex justify-start items-start pt-2 text-xs text-muted-foreground" style={{ transform: 'rotate(-65deg)', transformOrigin: 'top left', height: '4rem' }} title={feature}>
                     <span className="truncate inline-block max-w-[5rem]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TooltipProvider>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground w-64 mx-auto mt-4">
          <span className="font-mono">-1.0</span>
          <div className="flex-1 h-3 rounded-full overflow-hidden border">
             <div style={{ background: 'linear-gradient(to right, hsl(210, 100, 25%), hsl(210, 100, 85%), white, hsl(0, 100%, 85%), hsl(0, 100%, 25%))' }} className="w-full h-full" />
          </div>
          <span className="font-mono">+1.0</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCorrelationHeatmap;
