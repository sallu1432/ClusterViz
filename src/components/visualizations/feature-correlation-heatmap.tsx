
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClusteringResults } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FeatureCorrelationHeatmapProps {
  data: ClusteringResults['feature_correlation'];
}

const getColor = (value: number | null) => {
    if (value === null) return 'hsl(var(--muted))';
    // Blue (negative) -> White (zero) -> Red (positive)
    const h = value > 0 ? 0 : 220; // Red for positive, Blue for negative
    const s = 100;
    const l = 95 - (Math.abs(value) * 45); // Adjust lightness for more contrast
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
      <CardContent className="flex justify-center items-start p-4">
        <TooltipProvider>
          <div className="relative" style={{ width: `${size * 2.5 + 5}rem`, height: `${size * 2.5 + 5}rem`}}>
            {/* Y-axis labels */}
            {features.map((feature, i) => (
              <div 
                key={`y-${feature}`}
                className="absolute text-xs text-muted-foreground text-right pr-2 truncate"
                style={{
                  top: `${(i / size) * 100}%`,
                  height: `${(1 / size) * 100}%`,
                  left: 0,
                  width: '5rem',
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
                  left: `${5 + (i / size) * (100 - (5 / (size * 2.5 + 5)) * 100)}%`,
                  width: `${(1 / size) * (100 - (5 / (size * 2.5 + 5)) * 100)}%`,
                  top: '-0.5rem',
                  transform: 'translateY(-100%) rotate(-45deg)',
                  transformOrigin: 'bottom left',
                  height: '5rem',
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
              >
                <div className="truncate" title={feature}>{feature}</div>
              </div>
            ))}

            {/* Heatmap Grid */}
            <div 
              className="absolute grid gap-px"
              style={{
                top: 0,
                left: '5rem',
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
                        className="w-full h-full border border-background/20 rounded-sm transition-transform duration-200 ease-in-out hover:scale-110 hover:z-10"
                        style={{ backgroundColor: getColor(value) }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-medium">{features[i]} vs {features[j]}: <span className="font-mono">{value?.toFixed(3) ?? 'N/A'}</span></p>
                    </TooltipContent>
                  </Tooltip>
                ))
              )}
            </div>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default FeatureCorrelationHeatmap;
