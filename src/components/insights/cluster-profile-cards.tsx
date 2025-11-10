
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClusteringResults } from "@/types";
import { Users, BarChart, Fingerprint as FingerprintIcon } from "lucide-react";

interface ClusterProfileCardsProps {
  data: ClusteringResults['cluster_summary'];
}

const ClusterProfileCards = ({ data }: ClusterProfileCardsProps) => {
  if (!data || data.length === 0) return null;

  return (
    <div>
        <h2 className="text-3xl font-bold tracking-tight text-destructive mb-4">Cluster Profiles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map(cluster => (
            <Card key={cluster.clusterId}>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                <span>Cluster {cluster.clusterId}</span>
                <Users className="w-5 h-5 text-muted-foreground" />
                </CardTitle>
                <CardDescription>{cluster.nSamples} samples</CardDescription>
            </CardHeader>
            <CardContent>
                <h4 className="text-sm font-medium mb-2">Feature Averages</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                {Object.entries(cluster.featureMeans).slice(0, 3).map(([feature, value]) => (
                    <li key={feature} className="flex justify-between">
                    <span className="truncate pr-2" title={feature}>{feature}</span>
                    <span className="font-mono text-foreground">{value.toFixed(2)}</span>
                    </li>
                ))}
                </ul>
                <h4 className="text-sm font-medium mt-4 mb-2">Representative Samples</h4>
                <div className="flex gap-2">
                    {cluster.representativeSampleIndices.map(index => (
                        <div key={index} className="flex items-center gap-1 text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">
                            <FingerprintIcon className="w-3 h-3" />
                            <span>{index}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
            </Card>
        ))}
        </div>
    </div>
  );
};

export default ClusterProfileCards;
