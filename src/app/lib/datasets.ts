export const DATASETS = {
  iris: {
    name: "Iris",
    domain: "🌸 Botany / Biology",
    description: "A classic dataset in pattern recognition, it contains 3 classes of 50 instances each, where each class refers to a type of iris plant.",
    features: ["sepal length (cm)", "sepal width (cm)", "petal length (cm)", "petal width (cm)"],
  },
  wine: {
    name: "Wine",
    domain: "🍇 Chemistry / Food Science",
    description: "A dataset containing the results of a chemical analysis of wines grown in the same region in Italy but derived from three different cultivars.",
    features: ["alcohol", "malic_acid", "ash", "alcalinity_of_ash", "magnesium", "total_phenols", "flavanoids", "nonflavanoid_phenols", "proanthocyanins", "color_intensity", "hue", "od280/od315_of_diluted_wines", "proline"],
  },
  breast_cancer: {
    name: "Breast Cancer",
    domain: "🧬 Medical / Health",
    description: "A dataset with features computed from a digitized image of a fine needle aspirate (FNA) of a breast mass. They describe characteristics of the cell nuclei present in the image.",
    features: ["mean radius", "mean texture", "mean perimeter", "mean area", "mean smoothness", "mean compactness", "mean concavity", "mean concave points", "mean symmetry", "mean fractal dimension", "radius error", "texture error", "perimeter error", "area error", "smoothness error", "compactness error", "concavity error", "concave points error", "symmetry error", "fractal dimension error", "worst radius", "worst texture", "worst perimeter", "worst area", "worst smoothness", "worst compactness", "worst concavity", "worst concave points", "worst symmetry", "worst fractal dimension"],
  },
};

export const LINKAGE_METHODS = ['ward', 'complete', 'average', 'single'];
export const DISTANCE_METRICS = ['euclidean', 'manhattan', 'cosine'];
