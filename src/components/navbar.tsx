
"use client";

import React from 'react';
import Link from 'next/link';
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
import { LINKAGE_DEFINITIONS, METRIC_DEFINITIONS } from '@/app/lib/definitions';
import { BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

type NavbarProps = {
  params: {
    dataset: keyof typeof DATASETS;
    nClusters: number;
    linkage: string;
    metric: string;
    features: string[];
  };
  dispatch: React.Dispatch<any>;
  isPending: boolean;
  showExtraGraphs: boolean;
  onToggleExtraGraphs: () => void;
};

export function Navbar({ params, dispatch, isPending, showExtraGraphs, onToggleExtraGraphs }: NavbarProps) {

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
            <Link href="/" className="text-2xl font-bold tracking-tight">ClusterViz</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/features">
                <Button variant="outline">
                    <ArrowLeft className="mr-2" /> Back
                </Button>
            </Link>
            <div className="flex items-center gap-2">
                <Label htmlFor="extra-graphs-toggle" className="text-sm whitespace-nowrap">Advanced Views</Label>
                <Switch
                id="extra-graphs-toggle"
                checked={showExtraGraphs}
                onCheckedChange={onToggleExtraGraphs}
                disabled={isPending}
                />
            </div>
          </div>
        </div>
        <Separator />
        <TooltipProvider>
        <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
            <div className='flex-grow' style={{flexBasis: '150px'}}>
              <Label htmlFor="dataset" className="text-xs font-semibold">Dataset</Label>
              <Select
                value={params.dataset}
                onValueChange={(value) => dispatch({ type: 'SET_PARAM', payload: { dataset: value } })}
                disabled={isPending}
              >
                <SelectTrigger id="dataset" className="h-9 mt-1">
                  <SelectValue placeholder="Select dataset" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(DATASETS).map(([key, { name }]) => (
                    <SelectItem key={key} value={key}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className='flex-grow' style={{flexBasis: '200px'}}>
              <Label className="text-xs font-semibold">Feature Selection</Label>
              <div className="flex items-center gap-1 mt-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full h-9 justify-start font-normal" disabled={isPending}>
                      {params.features.length === 0 ? 'All Features' : `${params.features.length} of ${DATASETS[params.dataset].features.length} selected`}
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
                <Link href="/features" passHref>
                   <Button variant="outline" size="icon" className="h-9 w-9" title="Learn about features">
                      <BookOpen />
                   </Button>
                </Link>
              </div>
            </div>

            <div className='flex-grow' style={{flexBasis: '150px'}}>
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

            <div className='flex-grow' style={{flexBasis: '150px'}}>
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
                     <Tooltip key={method} delayDuration={100}>
                        <TooltipTrigger asChild>
                            <SelectItem value={method}>{method}</SelectItem>
                        </TooltipTrigger>
                        <TooltipContent side="right" align="start" className="max-w-xs">
                           <p>{LINKAGE_DEFINITIONS[method]}</p>
                        </TooltipContent>
                    </Tooltip>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='flex-grow' style={{flexBasis: '150px'}}>
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
                         <Tooltip key={metric} delayDuration={100}>
                            <TooltipTrigger asChild>
                                <SelectItem value={metric}>{metric}</SelectItem>
                            </TooltipTrigger>
                            <TooltipContent side="right" align="start" className="max-w-xs">
                                <p>{METRIC_DEFINITIONS[metric]}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </SelectContent>
              </Select>
            </div>
        </div>
        </TooltipProvider>
      </div>
    </header>
  );
}
