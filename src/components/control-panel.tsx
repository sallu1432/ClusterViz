import React from 'react';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
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
import { Flower2, Grape, Fingerprint, HeartPulse, SlidersHorizontal, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';

type ControlPanelProps = {
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
};

const datasetIcons = {
  iris: <Flower2 className="h-4 w-4" />,
  wine: <Grape className="h-4 w-4" />,
  digits: <Fingerprint className="h-4 w-4" />,
  breast_cancer: <HeartPulse className="h-4 w-4" />,
};

export function ControlPanel({ params, dispatch, onRunClustering, isPending }: ControlPanelProps) {
  
  const handleFeatureChange = (feature: string) => {
    const newFeatures = params.features.includes(feature)
      ? params.features.filter(f => f !== feature)
      : [...params.features, feature];
    dispatch({ type: 'SET_PARAM', payload: { features: newFeatures } });
  };
  
  return (
    <>
      <SidebarHeader>
        <h2 className="text-lg font-semibold">Controls</h2>
        <p className="text-sm text-muted-foreground">Adjust parameters for clustering.</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="space-y-4">
            <div>
              <Label htmlFor="dataset">Dataset</Label>
              <Select
                value={params.dataset}
                onValueChange={(value) => dispatch({ type: 'SET_PARAM', payload: { dataset: value } })}
                disabled={isPending}
              >
                <SelectTrigger id="dataset">
                  <div className="flex items-center gap-2">
                    {datasetIcons[params.dataset]}
                    <SelectValue placeholder="Select dataset" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(DATASETS).map(([key, { name, domain }]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        {datasetIcons[key as keyof typeof DATASETS]}
                        <span>{name}</span>
                        <span className="ml-2 text-xs text-muted-foreground">{domain}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Feature Selection</Label>
               <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start font-normal" disabled={isPending}>
                    {params.features.length === 0 ? 'All Features' : `${params.features.length} features selected`}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--sidebar-width] p-0" align="start">
                   <ScrollArea className="h-64">
                    <div className="p-4 space-y-2">
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
               <p className="text-xs text-muted-foreground mt-1">Default to all if none selected.</p>
            </div>

            <div>
              <Label htmlFor="n_clusters">Number of Clusters (k): {params.nClusters}</Label>
              <Slider
                id="n_clusters"
                min={2}
                max={10}
                step={1}
                value={[params.nClusters]}
                onValueChange={([value]) => dispatch({ type: 'SET_PARAM', payload: { nClusters: value } })}
                disabled={isPending}
              />
            </div>

            <div>
              <Label htmlFor="linkage">Linkage Method</Label>
              <Select
                value={params.linkage}
                onValueChange={(value) => dispatch({ type: 'SET_PARAM', payload: { linkage: value } })}
                disabled={isPending || params.linkage === 'ward'}
              >
                <SelectTrigger id="linkage">
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
              <Label htmlFor="metric">Distance Metric</Label>
              <Select
                value={params.metric}
                onValueChange={(value) => dispatch({ type: 'SET_PARAM', payload: { metric: value } })}
                disabled={isPending}
              >
                <SelectTrigger id="metric">
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
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={onRunClustering} disabled={isPending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <SlidersHorizontal className="mr-2 h-4 w-4" />
          )}
          Run Clustering
        </Button>
        <p className="text-xs text-center text-muted-foreground mt-2">Built with Next.js + Firebase + scikit-learn</p>
      </SidebarFooter>
    </>
  );
}
