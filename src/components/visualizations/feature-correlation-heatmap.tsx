
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClusteringResults } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FeatureCorrelationHeatmapProps {
  data: ClusteringResults['feature_correlation'];
}

const getColors = (value: number | null) => {
    if (value === null) return { backgroundColor: 'hsl(var(--muted))', textColor: 'hsl(var(--muted-foreground))' };
    
    // Blue for negative, Red for positive
    const h = value > 0 ? 0 : 210;
    const s = 100;
    const l = 100 - (Math.abs(value) * 60 + 15); // Lightness from 85% (for 0) to 25% (for 1/-1)

    const isDarkTheme = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
    
    let textColor: string;
    if (isDarkTheme) {
        textColor = l > 50 ? 'hsl(224 71.4% 4.1%)' : 'hsl(210 40% 98%)';
    } else {
        textColor = l > 55 ? 'hsl(224 71.4% 4.1%)' : 'hsl(0 0% 100%)';
    }

    return {
        backgroundColor: `hsl(${h}, ${s}%, ${l}%)`,
        textColor: textColor,
    };
};

const FeatureCorrelationHeatmap = ({ data }: FeatureCorrelationHeatmapProps) => {
  if (!data || data.matrix.length === 0) return null;

  const { features, matrix } = data;
  
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
            <CardTitle>Feature Correlation Heatmap</CardTitle>
            <CardDescription>
                <span className="font-bold text-primary">What it shows:</span> The relationship between different features. A dark red cell indicates a strong positive correlation (as one feature increases, so does the other), while dark blue indicates a strong negative correlation. This helps identify redundant features and important relationships.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <TooltipProvider>
                <div className="overflow-x-auto rounded-md border">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2 border-r w-24"></th>
                                {features.map((feature) => (
                                    <th key={feature} className="p-2 text-sm font-medium text-muted-foreground" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                                        <span className="truncate">{feature}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature, i) => (
                                <tr key={feature} className="border-b">
                                    <td className="p-2 text-sm font-medium text-muted-foreground border-r whitespace-nowrap">{feature}</td>
                                    {matrix[i].map((value, j) => {
                                        const { backgroundColor, textColor } = getColors(value);
                                        return (
                                            <td key={j} className="p-0 text-center">
                                                <Tooltip delayDuration={100}>
                                                    <TooltipTrigger asChild>
                                                        <div
                                                            style={{ backgroundColor, color: textColor }}
                                                            className="h-14 w-full flex items-center justify-center text-xs font-mono transition-transform duration-200 hover:scale-110 hover:z-10 hover:shadow-lg hover:rounded-sm"
                                                        >
                                                            {value !== null ? value.toFixed(2) : "N/A"}
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>
                                                            Corr({feature}, {features[j]}): {value?.toFixed(3) ?? "N/A"}
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </TooltipProvider>
        </CardContent>
    </Card>
  );
};

export default FeatureCorrelationHeatmap;
