
"use client";

import React, { useReducer, useTransition, useCallback } from "react";
import { Navbar } from "@/components/navbar";
import { ClusteringResults } from "@/types";
import { performClustering } from "@/app/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { DATASETS } from "@/app/lib/datasets";
import { Skeleton } from "@/components/ui/skeleton";
import DendrogramChart from "./visualizations/dendrogram-chart";
import ScatterPlot2D from "./visualizations/scatter-plot-2d";
import ClusterHeatmap from "./visualizations/cluster-heatmap";
import SilhouettePlot from "./visualizations/silhouette-plot";
import DatasetOverview from "./insights/dataset-overview";
import FeatureCorrelationHeatmap from "./visualizations/feature-correlation-heatmap";
import FeatureDistributionCharts from "./visualizations/feature-distribution-charts";
import ClusterProfileCards from "./insights/cluster-profile-cards";
import AiClusterInsights from "./insights/ai-cluster-insights";

type State = {
  params: {
    dataset: keyof typeof DATASETS;
    nClusters: number;
    linkage: string;
    metric: string;
    features: string[];
  };
  results: ClusteringResults | null;
  error: string | null;
  showExtraGraphs: boolean;
};

type Action =
  | { type: "SET_PARAM"; payload: Partial<State["params"]> }
  | { type: "SET_RESULTS"; payload: ClusteringResults | null }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "TOGGLE_EXTRA_GRAPHS" };

const initialState: State = {
  params: {
    dataset: "iris",
    nClusters: 3,
    linkage: "ward",
    metric: "euclidean",
    features: [],
  },
  results: null,
  error: null,
  showExtraGraphs: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PARAM":
      const newParams = { ...state.params, ...action.payload };
      if(action.payload.dataset) {
        newParams.features = []; // Reset features when dataset changes
      }
      return { ...state, params: newParams };
    case "SET_RESULTS":
      return { ...state, results: action.payload, error: null };
    case "SET_ERROR":
      return { ...state, error: action.payload, results: null };
    case "TOGGLE_EXTRA_GRAPHS":
      return { ...state, showExtraGraphs: !state.showExtraGraphs };
    default:
      return state;
  }
};

export function Dashboard() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleRunClustering = useCallback(() => {
    startTransition(async () => {
      try {
        const results = await performClustering(state.params);
        dispatch({ type: "SET_RESULTS", payload: results });
        toast({
          title: "Clustering Successful",
          description: `Analysis complete for the ${DATASETS[state.params.dataset].name} dataset.`,
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        dispatch({ type: "SET_ERROR", payload: errorMessage });
        toast({
          variant: "destructive",
          title: "Clustering Failed",
          description: errorMessage,
        });
      }
    });
  }, [state.params, toast]);

  return (
    <div className="bg-background">
      <Navbar
        params={state.params}
        dispatch={dispatch}
        onRunClustering={handleRunClustering}
        isPending={isPending}
        showExtraGraphs={state.showExtraGraphs}
        onToggleExtraGraphs={() => dispatch({ type: "TOGGLE_EXTRA_GRAPHS" })}
      />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        {isPending && <DashboardSkeleton />}
        {!isPending && !state.results && <WelcomeMessage />}
        {state.results && (
          <div className="grid grid-cols-1 gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <DatasetOverview summary={state.results.dataset_summary} />
              </div>
              <div className="lg:col-span-2">
                <SilhouettePlot data={state.results.silhouette_scores} />
              </div>
            </div>

            <DendrogramChart data={state.results.dendrogram} />
            <ScatterPlot2D data={state.results.scatter_data_2d} />
            
            <AiClusterInsights
              clusterData={state.results.cluster_summary}
              datasetDescription={state.results.dataset_summary.description}
            />
            
            <ClusterProfileCards data={state.results.cluster_summary} />
            
            <FeatureCorrelationHeatmap data={state.results.feature_correlation} />

            {state.showExtraGraphs && (
              <>
                <FeatureDistributionCharts data={state.results.feature_distributions} />
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

const WelcomeMessage = () => (
  <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
    <div className="p-12 border-2 border-dashed rounded-xl bg-card">
      <h2 className="text-3xl font-bold mb-3">Welcome to ClusterViz</h2>
      <p className="text-muted-foreground max-w-md mx-auto">
        Select a dataset and configure your parameters in the navigation bar above, then click 'Run Clustering' to generate and visualize your analysis.
      </p>
    </div>
  </div>
);

const DashboardSkeleton = () => (
    <div className="grid grid-cols-1 gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <Skeleton className="h-[300px] w-full rounded-lg lg:col-span-2" />
      </div>
      <Skeleton className="h-[400px] w-full rounded-lg" />
      <Skeleton className="h-[400px] w-full rounded-lg" />
      <Skeleton className="h-[250px] w-full rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Skeleton className="h-[200px] w-full rounded-lg" />
        <Skeleton className="h-[200px] w-full rounded-lg" />
        <Skeleton className="h-[200px] w-full rounded-lg" />
      </div>
      <Skeleton className="h-[400px] w-full rounded-lg" />
    </div>
  );
