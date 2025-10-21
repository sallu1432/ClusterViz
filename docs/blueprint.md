# **App Name**: ClusterViz

## Core Features:

- Dataset Selection: Select one of the 4 built-in datasets (Iris, Wine, Digits, Breast Cancer) to perform hierarchical clustering, or upload a CSV file.
- Parameter Adjustment: Adjust the number of clusters, linkage method (ward, complete, average, single), and distance metric (euclidean, manhattan, cosine) via interactive UI elements (sliders, dropdowns).
- Dendrogram Visualization: Display a full hierarchical dendrogram of the clustering results, with hover interactions to inspect merging distances and highlighting of user-selected cluster counts.
- 2D Cluster Projection: Use PCA to reduce dimensionality to 2D and display a scatter plot of the cluster assignments, dynamically updated when parameters change.
- Data Insights Generation: Analyze each cluster's key characteristics and present a concise summary including mean, variance and representative samples of the data via an LLM tool. Reasoning determines what the important differences are.
- Visual Feedback: Use color coded charts to indicate feature correlation heatmap, feature distributions and cluster heatmaps.
- Silhouette Scoring: Show silhouette scores to allow the user to judge cohesion and separation between different cluster configurations.

## Style Guidelines:

- Primary color: Light sky blue (#87CEEB) evoking clarity and scientific precision.
- Background color: Very light blue (#F0F8FF) providing a clean and unobtrusive backdrop.
- Accent color: Muted orange (#D2691E) to highlight interactive elements and call attention to insights.
- Font: 'Inter', a sans-serif font for a modern, machined and neutral aesthetic suitable for both headlines and body text.
- Employ a modern, minimalistic layout with a clear separation of concerns. Interactive elements are placed on the left panel while interactive visualizations populate the main area. Maintain responsiveness for various devices.
- Use a set of minimalist icons, ensuring consistency and readability. Each icon should relate to its respective function or dataset, contributing to an intuitive user experience.
- Incorporate smooth, subtle animated transitions between visualizations. These animations will enhance the user experience and provide a sense of responsiveness, updating the visualization to every action performed.