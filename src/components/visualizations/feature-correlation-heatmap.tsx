"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClusteringResults } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FeatureCorrelationHeatmapProps {
  data: ClusteringResults['feature_correlation'];
}

const getColor = (value: number | null) => {
    if (value === null) return 'hsl(var(--muted))';
    // Blue for negative, Red for positive
    const h = value > 0 ? 10 : 220;
    const s = 90;
    // Use a wider range for lightness and make it more pronounced
    const l = 95 - (Math.abs(value) * 55);
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
      <CardContent className="flex flex-col items-center justify-center p-4 pt-8 gap-6">
        <TooltipProvider>
          <div className="w-full max-w-md aspect-square relative" style={{ paddingBottom: '2.5rem', paddingLeft: '2.5rem' }}>
            <div
              className="absolute grid gap-px"
              style={{
                top: 0,
                left: '2.5rem',
                right: 0,
                bottom: '2.5rem',
                gridTemplateColumns: `repeat(${size}, 1fr)`,
                gridTemplateRows: `repeat(${size}, 1fr)`,
              }}
            >
              {matrix.map((row, i) =>
                row.map((value, j) => (
                  <Tooltip key={`${i}-${j}`} delayDuration={100}>
                    <TooltipTrigger asChild>
                      <div
                        className="w-full h-full rounded-sm transition-transform duration-200 ease-in-out hover:scale-125 hover:z-10 flex items-center justify-center"
                        style={{ backgroundColor: getColor(value), border: '1px solid hsl(var(--background))' }}
                      >
                         <span className="text-xs font-mono text-foreground/80">{value?.toFixed(2)}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-medium">{features[i]} &amp; {features[j]}: <span className="font-mono">{value?.toFixed(3) ?? 'N/A'}</span></p>
                    </TooltipContent>
                  </Tooltip>
                ))
              )}
            </div>

            {/* X-axis labels */}
            {features.map((feature, i) => (
              <div
                key={`x-${feature}`}
                className="absolute text-xs text-muted-foreground -bottom-1"
                style={{
                  left: `calc(2.5rem + ${((i + 0.5) / size) * 100}%)`,
                  transform: 'translateX(-50%) rotate(-45deg)',
                  transformOrigin: 'center left',
                  whiteSpace: 'nowrap',
                  width: '5rem',
                  textAlign: 'left'
                }}
                title={feature}
              >
                <span className="truncate inline-block max-w-full">{feature}</span>
              </div>
            ))}

             {/* Y-axis labels */}
            {features.map((feature, i) => (
                <div
                    key={`y-${feature}`}
                    className="absolute text-xs text-muted-foreground text-right"
                    style={{
                    top: `${((i + 0.5) / size) * 100}%`,
                    left: 0,
                    width: '2.25rem',
                    transform: 'translateY(-50%)'
                    }}
                    title={feature}
                >
                    <span className="truncate inline-block max-w-full">{feature}</span>
                </div>
            ))}
          </div>
        </TooltipProvider>

        <div className="flex items-center gap-2 text-xs text-muted-foreground w-48">
          <span>-1.0</span>
          <div className="flex-1 h-3 rounded-full overflow-hidden border">
             <div style={{ background: 'linear-gradient(to right, hsl(220, 90%, 40%), hsl(220, 90%, 95%), hsl(10, 90%, 95%), hsl(10, 90%, 40%))' }} className="w-full h-full" />
          </div>
          <span>+1.0</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCorrelationHeatmap;
