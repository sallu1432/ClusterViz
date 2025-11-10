import { ClusteringResults } from "@/types";
import { DATASETS } from "./datasets";

type SimulationParams = {
  dataset: keyof typeof DATASETS;
  nClusters: number;
  features: string[];
};

// Helper functions to generate mock data
const random = (min: number, max: number) => Math.random() * (max - min) + min;
const randomInt = (min: number, max: number) => Math.floor(random(min, max));

const generateScatterData = (nSamples: number, nClusters: number): ClusteringResults['scatter_data_2d'] => {
  const points = [];
  const clusterCenters = Array.from({ length: nClusters }, () => ({
    x: random(-10, 10),
    y: random(-10, 10),
  }));

  for (let i = 0; i < nSamples; i++) {
    const clusterIndex = i % nClusters;
    points.push({
      x: clusterCenters[clusterIndex].x + random(-2, 2),
      y: clusterCenters[clusterIndex].y + random(-2, 2),
      cluster: clusterIndex,
      sample_index: i,
    });
  }
  return points;
};

const generateDendrogramData = (nSamples: number): ClusteringResults['dendrogram'] => {
    const nodes: { [key: number]: { x: number; y: number } } = {};
    const links: ClusteringResults['dendrogram']['links'] = [];
    const clusterThreshold = random(0.5, 2.5);

    // Create leaf nodes
    for (let i = 0; i < nSamples; i++) {
        nodes[i] = { x: i, y: 0 };
    }

    let mergeCount = nSamples;
    let availableNodes = Array.from({ length: nSamples }, (_, i) => i);

    while (availableNodes.length > 1) {
        const idx1 = randomInt(0, availableNodes.length);
        const node1Id = availableNodes[idx1];
        availableNodes.splice(idx1, 1);
        
        const idx2 = randomInt(0, availableNodes.length);
        const node2Id = availableNodes[idx2];
        availableNodes.splice(idx2, 1);

        const node1 = nodes[node1Id];
        const node2 = nodes[node2Id];
        
        const newX = (node1.x + node2.x) / 2;
        const newY = Math.max(node1.y, node2.y) + random(0.1, 1.5);

        const newNodeId = mergeCount++;
        nodes[newNodeId] = { x: newX, y: newY };

        links.push({ source: node1, target: { x: node1.x, y: newY }, distance: newY });
        links.push({ source: node2, target: { x: node2.x, y: newY }, distance: newY });
        links.push({ source: { x: node1.x, y: newY }, target: { x: node2.x, y: newY }, distance: newY });

        availableNodes.push(newNodeId);
    }

    return { 
        links, 
        nodes: Object.values(nodes),
        cluster_threshold: clusterThreshold
    };
};


export const simulateClustering = (params: SimulationParams): ClusteringResults => {
  const { dataset, nClusters, features } = params;
  const datasetInfo = DATASETS[dataset];

  let n_samples = randomInt(30, 50);
  const usedFeatures = features.length > 0 ? features : datasetInfo.features;
  let n_features = usedFeatures.length;

  let target_distribution: ClusteringResults['dataset_summary']['target_distribution'] = [];

  if (dataset === 'iris') {
      n_samples = 150;
      n_features = datasetInfo.features.length;
      target_distribution = [
          { name: 'Setosa', value: 50 },
          { name: 'Versicolor', value: 50 },
          { name: 'Virginica', value: 50 },
      ];
  }


  const scatter_data_2d = generateScatterData(n_samples, nClusters);
  const cluster_labels = scatter_data_2d.map(p => p.cluster);
  
  const cluster_summary: ClusteringResults['cluster_summary'] = Array.from({ length: nClusters }, (_, i) => ({
    clusterId: i,
    nSamples: cluster_labels.filter(l => l === i).length,
    featureMeans: usedFeatures.slice(0, 4).reduce((acc, feature) => {
      acc[feature] = random(0, 10);
      return acc;
    }, {} as Record<string, number>),
    representativeSampleIndices: Array.from({ length: 3 }, () => randomInt(0, n_samples)),
  }));

  const silhouette_scores: ClusteringResults['silhouette_scores'] = Array.from({ length: nClusters }, (_, i) => ({
    cluster: `Cluster ${i}`,
    score: random(0.1, 0.9),
  }));

  const cluster_heatmap: ClusteringResults['cluster_heatmap'] = {
    features: usedFeatures.slice(0, 5),
    cluster_data: Array.from({ length: nClusters }, (_, i) => ({
      cluster: `Cluster ${i}`,
      ...usedFeatures.slice(0, 5).reduce((acc, feature) => {
        acc[feature] = random(0, 1);
        return acc;
      }, {} as Record<string, number>),
    })),
  };
  
    const irisFeatures = ["sepal length (cm)", "sepal width (cm)", "petal length (cm)", "petal width (cm)"];
    let correlationFeatures = usedFeatures.slice(0, 8);

    if (dataset === 'iris' && irisFeatures.every(f => usedFeatures.includes(f))) {
        const sortedIrisFeatures = irisFeatures;
        const otherFeatures = usedFeatures.filter(f => !irisFeatures.includes(f));
        correlationFeatures = [...sortedIrisFeatures, ...otherFeatures].slice(0, 8);
    }
  
  const feature_correlation: ClusteringResults['feature_correlation'] = {
    features: correlationFeatures,
    matrix: Array.from({ length: correlationFeatures.length }, (_, i) => 
      Array.from({ length: correlationFeatures.length }, (_, j) => {
          if (i === j) return 1;
          if (dataset === 'iris') {
              const f1 = correlationFeatures[i];
              const f2 = correlationFeatures[j];
              if ((f1.includes('petal length') && f2.includes('petal width')) || (f1.includes('petal width') && f2.includes('petal length'))) return random(0.9, 0.98);
              if ((f1.includes('petal') && f2.includes('sepal'))) return random(0.5, 0.87);
          }
          return random(-0.4, 0.4);
      })
    ),
  };

  const feature_distributions: ClusteringResults['feature_distributions'] = usedFeatures.slice(0, 4).map(feature => ({
    feature,
    bins: Array.from({ length: 10 }, (_, i) => ({
      name: `${(i * 1).toFixed(1)}-${((i + 1) * 1).toFixed(1)}`,
      value: randomInt(1, 15),
    })),
  }));


  return {
    dataset_summary: {
      n_samples,
      n_features,
      feature_names: datasetInfo.features,
      description: datasetInfo.description,
      target_distribution,
    },
    dendrogram: generateDendrogramData(Math.min(n_samples, 30)), // Keep dendrogram small for clarity
    scatter_data_2d,
    cluster_labels,
    silhouette_scores,
    cluster_summary,
    cluster_heatmap,
    feature_correlation,
    feature_distributions,
  };
};
