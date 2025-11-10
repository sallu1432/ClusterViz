# ClusterViz: Interactive Hierarchical Clustering

ClusterViz is an interactive web application designed to help users explore and understand datasets through hierarchical clustering. It allows for on-the-fly parameter adjustment, visualizes complex data structures with dendrograms and heatmaps, and provides insights into the patterns hidden within the data.

![Screenshot of the ClusterViz Dashboard](https://picsum.photos/seed/dashboard/1200/800)

## Core Features

-   **Interactive Dashboard**: A clean and intuitive interface for data exploration.
-   **Dataset Selection**: Choose from classic built-in datasets (Iris, Wine, Breast Cancer) to see clustering in action.
-   **Parameter Tuning**: Interactively adjust key clustering parameters:
    -   Number of clusters (k)
    -   Linkage method (ward, complete, average, single)
    -   Distance metric (euclidean, manhattan, cosine)
    -   Feature selection
-   **Rich Visualizations**: Understand your data from multiple perspectives.
-   **Self-Explanatory**: The tool is designed to be intuitive, with clear explanations for each component.

## Visualizations Explained

ClusterViz provides several key visualizations to help you interpret the clustering results.

### Hierarchical Dendrogram

A tree diagram illustrating how data points are merged into clusters. The y-axis represents the distance between clusters; long vertical lines indicate that two very different clusters were merged.

![Screenshot of the Dendrogram](https://picsum.photos/seed/dendrogram/1200/600)

### Silhouette Score Plot

This chart measures cluster quality on a scale from -1 to 1. High scores indicate that clusters are dense and well-separated. Scores near 0 suggest overlapping clusters.

![Screenshot of the Silhouette Plot](https://picsum.photos/seed/silhouette/1200/600)

### Cluster & Feature Heatmaps

These heatmaps use color intensity to show the average value of each feature within a cluster or the correlation between different features. They help reveal the "fingerprint" that defines each group.

![Screenshot of Heatmaps](https://picsum.photos/seed/heatmaps/1200/600)

## Getting Started

The application is built with Next.js and TypeScript.

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run the Development Server**:
    ```bash
    npm run dev
    ```

    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

The main application logic resides in `src/app/dashboard/page.tsx` and its corresponding components in `src/components/`. The clustering simulation can be found in `src/app/lib/clustering-simulation.ts`.
