
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { DATASETS, LINKAGE_METHODS, DISTANCE_METRICS } from '@/app/lib/datasets';
import { Flower2, Grape, HeartPulse, SlidersHorizontal, Loader2, BrainCircuit } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

type NavbarProps = {
  params: {
    dataset: keyof typeof DATASETS;
    nClusters: number;
    linkage: string;
    metric: string;
    features: string[];
  };
  dispatch: React.Dispatch<any>;
  onRunClustering: () => void;
  isPending: boolean;
  showExtraGraphs: boolean;
  onToggleExtraGraphs: () => void;
};

const datasetIcons = {
  iris: <Flower2 className="h-4 w-4" />,
  wine: <Grape className="h-4 w-4" />,
  breast_cancer: <HeartPulse className="h-4 w-4" />,
};

export function Navbar({ params, dispatch, onRunClustering, isPending, showExtraGraphs, onToggleExtraGraphs }: NavbarProps) {

  const handleFeatureChange = (feature: string) => {
    const newFeatures = params.features.includes(feature)
      ? params.features.filter(f => f !== feature)
      : [...params.features, feature];
    dispatch({ type: 'SET_PARAM', payload: { features: newFeatures } });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col gap-4 py-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <BrainCircuit className="h-7 w-7 text-primary" />
              <h1 className="text-2xl font-bold tracking-tight">ClusterViz</h1>
            </div>
            <Separator orientation="vertical" className="h-8" />
             <div className="flex items-center gap-2">
                <Label htmlFor="extra-graphs-toggle" className="text-sm whitespace-nowrap">Show Advanced Views</Label>
                <Switch
                id="extra-graphs-toggle"
                checked={showExtraGraphs}
                onCheckedChange={onToggleExtraGraphs}
                disabled={isPending}
                />
            </div>
          </div>
          <Button onClick={onRunClustering} disabled={isPending} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            {isPending ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <SlidersHorizontal className="mr-2 h-5 w-5" />
            )}
            Run Clustering
          </Button>
        </div>
        <Separator />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-4 items-end">
            <div>
              <Label htmlFor="dataset" className="text-xs font-semibold">Dataset</Label>
              <Select
                value={params.dataset}
                onValueChange={(value) => dispatch({ type: 'SET_PARAM', payload: { dataset: value } })}
                disabled={isPending}
              >
                <SelectTrigger id="dataset" className="h-9 mt-1">
                  <div className="flex items-center gap-2">
                    {datasetIcons[params.dataset]}
                    <SelectValue placeholder="Select dataset" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(DATASETS).map(([key, { name }]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        {datasetIcons[key as keyof typeof DATASETS]}
                        <span>{name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-xs font-semibold">Feature Selection</Label>
               <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full h-9 justify-start font-normal mt-1" disabled={isPending}>
                    {params.features.length === 0 ? 'All Features' : `${params.features.length} features selected`}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-0" align="start">
                   <ScrollArea className="h-64">
                    <div className="p-4 space-y-2">
                       <Button variant="ghost" size="sm" className="w-full justify-start mb-2" onClick={() => dispatch({type: 'SET_PARAM', payload: { features: []}})}>Clear Selection</Button>
                      {DATASETS[params.dataset].features.map(feature => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox
                            id={feature}
                            checked={params.features.includes(feature)}
                            onCheckedChange={() => handleFeatureChange(feature)}
                          />
                          <label htmlFor={feature} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="n_clusters" className="text-xs font-semibold">Clusters (k): {params.nClusters}</Label>
              <Slider
                id="n_clusters"
                min={2}
                max={10}
                step={1}
                value={[params.nClusters]}
                onValueChange={([value]) => dispatch({ type: 'SET_PARAM', payload: { nClusters: value } })}
                disabled={isPending}
                className="mt-3"
              />
            </div>

            <div>
              <Label htmlFor="linkage" className="text-xs font-semibold">Linkage Method</Label>
              <Select
                value={params.linkage}
                onValueChange={(value) => dispatch({ type: 'SET_PARAM', payload: { linkage: value } })}
                disabled={isPending}
              >
                <SelectTrigger id="linkage" className="h-9 mt-1">
                  <SelectValue placeholder="Select linkage" />
                </SelectTrigger>
                <SelectContent>
                  {LINKAGE_METHODS.map((method) => (
                    <SelectItem key={method} value={method}>{method}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="metric" className="text-xs font-semibold">Distance Metric</Label>
              <Select
                value={params.metric}
                onValueChange={(value) => dispatch({ type: 'SET_PARAM', payload: { metric: value } })}
                disabled={isPending}
              >
                <SelectTrigger id="metric" className="h-9 mt-1">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  {DISTANCE_METRICS.map((metric) => (
                    <SelectItem key={metric} value={metric}>{metric}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
        </div>
      </div>
    </header>
  );
}
