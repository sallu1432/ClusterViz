
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClusteringResults } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FeatureCorrelationHeatmapProps {
  data: ClusteringResults['feature_correlation'];
}

const getColor = (value: number | null) => {
    if (value === null) return 'hsl(var(--muted))';
    // A more vibrant and perceptually balanced Blue -> White -> Red scale
    const h = value > 0 ? 10 : 220; // Oranges/Reds for positive, Blues for negative
    const s = 90;
    const l = 95 - (Math.abs(value) * 50);
    return `hsl(${h}, ${s}%, ${l}%)`;
};


const FeatureCorrelationHeatmap = ({ data }: FeatureCorrelationHeatmapProps) => {
  if (!data || data.matrix.length === 0) return null;

  const { features, matrix } = data;
  const size = features.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Correlation Heatmap</CardTitle>
        <CardDescription>Shows the Pearson correlation between features. (Max 8 shown).</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-4 gap-6">
        <TooltipProvider>
          <div className="w-full max-w-md aspect-square p-10 relative">
            {/* Y-axis labels */}
            {features.map((feature, i) => (
              <div 
                key={`y-${feature}`}
                className="absolute text-xs text-muted-foreground text-right pr-2 truncate"
                style={{
                  top: `${(i / size) * 100}%`,
                  height: `${(1 / size) * 100}%`,
                  left: 0,
                  width: '4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}
                title={feature}
              >
                {feature}
              </div>
            ))}

            {/* X-axis labels */}
            {features.map((feature, i) => (
              <div 
                key={`x-${feature}`}
                className="absolute text-xs text-muted-foreground"
                style={{
                  left: `calc(4rem + ${(i / size) * (100% - 4rem)})`,
                  width: `calc(${(1 / size)} * (100% - 4rem))`,
                  bottom: '100%',
                  paddingBottom: '0.5rem',
                  height: '4rem',
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
              >
                <div 
                  className="truncate origin-bottom-left -rotate-45"
                  title={feature}
                >
                  {feature}
                </div>
              </div>
            ))}

            {/* Heatmap Grid */}
            <div 
              className="absolute grid gap-px"
              style={{
                top: 0,
                left: '4rem',
                right: 0,
                bottom: 0,
                gridTemplateColumns: `repeat(${size}, 1fr)`,
                gridTemplateRows: `repeat(${size}, 1fr)`,
              }}
            >
              {matrix.map((row, i) =>
                row.map((value, j) => (
                  <Tooltip key={`${i}-${j}`} delayDuration={100}>
                    <TooltipTrigger asChild>
                      <div
                        className="w-full h-full border border-background/20 rounded-sm transition-transform duration-200 ease-in-out hover:scale-125 hover:z-10"
                        style={{ backgroundColor: getColor(value) }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-medium">{features[i]} &amp; {features[j]}: <span className="font-mono">{value?.toFixed(3) ?? 'N/A'}</span></p>
                    </TooltipContent>
                  </Tooltip>
                ))
              )}
            </div>
          </div>
        </TooltipProvider>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>-1.0</span>
          <div className="flex h-3 w-48 rounded-full overflow-hidden border">
             <div style={{ background: 'linear-gradient(to right, hsl(220, 90%, 45%), hsl(220, 90%, 95%), hsl(10, 90%, 95%), hsl(10, 90%, 45%))' }} className="w-full h-full" />
          </div>
          <span>+1.0</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCorrelationHeatmap;
