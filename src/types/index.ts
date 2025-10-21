export type DendrogramLink = {
  source: number;
  target: number;
  distance: number;
  samples: number;
};

export type DendrogramNode = {
    x: number;
    y: number;
};

export type ScatterPoint = {
  x: number;
  y: number;
  cluster: number;
  sample_index: number;
};

export type ClusterSummary = {
  clusterId: number;
  nSamples: number;
  featureMeans: Record<string, number>;
  representativeSampleIndices: number[];
};

export type FeatureDistribution = {
  feature: string;
  bins: { name: string, value: number }[];
};

export type ClusteringResults = {
  dataset_summary: {
    n_samples: number;
    n_features: number;
    feature_names: string[];
    description: string;
    target_distribution: { name: string; value: number }[];
  };
  dendrogram: {
    links: {
        source: { x: number; y: number };
        target: { x: number; y: number };
        distance: number;
    }[];
    nodes: DendrogramNode[];
    cluster_threshold: number;
  };
  scatter_data_2d: ScatterPoint[];
  cluster_labels: number[];
  silhouette_scores: { cluster: string; score: number }[];
  cluster_summary: ClusterSummary[];
  cluster_heatmap: {
    features: string[];
    cluster_data: { cluster: string, [key: string]: number | string }[];
  };
  feature_correlation: {
    features: string[];
    matrix: (number | null)[][];
  };
  feature_distributions: FeatureDistribution[];
};
