"use client";

import React, { useState, useEffect, useTransition } from "react";
import { generateClusterInsights } from "@/ai/flows/generate-cluster-insights";
import type { ClusterInsightsInput, ClusterInsightsOutput } from "@/ai/flows/generate-cluster-insights";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, BrainCircuit } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface AiClusterInsightsProps {
  clusterData: ClusterInsightsInput['clusterData'];
  datasetDescription: string;
}

const AiClusterInsights = ({ clusterData, datasetDescription }: AiClusterInsightsProps) => {
  const [insights, setInsights] = useState<ClusterInsightsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (clusterData && clusterData.length > 0) {
      startTransition(async () => {
        try {
          setError(null);
          const input: ClusterInsightsInput = { clusterData, datasetDescription };
          const result = await generateClusterInsights(input);
          setInsights(result);
        } catch (e) {
          console.error("Error generating insights:", e);
          setError("Failed to generate insights. Please try again.");
        }
      });
    }
  }, [clusterData, datasetDescription]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-accent"/>
            <CardTitle>Cluster Insights Summary</CardTitle>
        </div>
        <CardDescription>
          A summary of the key characteristics of each cluster.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isPending && <InsightsSkeleton />}
        {error && (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        {!isPending && insights && (
          <Accordion type="single" collapsible className="w-full">
            {insights.insights.map((insight) => (
              <AccordionItem key={insight.clusterId} value={`item-${insight.clusterId}`}>
                <AccordionTrigger>Cluster {insight.clusterId}</AccordionTrigger>
                <AccordionContent>
                  {insight.summary}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};

const InsightsSkeleton = () => (
    <div className="space-y-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
    </div>
)

export default AiClusterInsights;
