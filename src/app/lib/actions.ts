"use server";

import { ClusteringResults } from "@/types";
import { simulateClustering } from "./clustering-simulation";
import { DATASETS } from "./datasets";

type ClusteringParams = {
  dataset: keyof typeof DATASETS;
  nClusters: number;
  linkage: string;
  metric: string;
  features: string[];
};

export async function performClustering(
  params: ClusteringParams
): Promise<ClusteringResults> {
  try {
    // Artificial delay to simulate computation
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const results = simulateClustering(params);
    return results;
  } catch (error) {
    console.error("Error during clustering simulation:", error);
    throw new Error("Failed to perform clustering.");
  }
}
