
export const DATASETS = {
  iris: {
    name: "Iris",
    domain: "🌸 Botany / Biology",
    description: "A classic dataset in pattern recognition. It contains 3 classes of 50 instances each, where each class refers to a type of iris plant.",
    features: ["sepal length (cm)", "sepal width (cm)", "petal length (cm)", "petal width (cm)"],
    feature_definitions: {
      "sepal length (cm)": "The length of the sepal. Sepals are the green, leaf-like parts of the flower that enclose the bud. This feature is a key indicator of the flower's size.",
      "sepal width (cm)": "The width of the sepal. Along with length, this helps differentiate species based on sepal proportions.",
      "petal length (cm)": "The length of the petal. Petals are the often brightly colored parts of a flower. Petal dimensions are highly correlated with the specific Iris species.",
      "petal width (cm)": "The width of the petal. This is one of the most important features for distinguishing between Iris Setosa, Versicolour, and Virginica."
    }
  },
  wine: {
    name: "Wine",
    domain: "🍇 Chemistry / Food Science",
    description: "A dataset containing the results of a chemical analysis of wines grown in the same region in Italy but derived from three different cultivars.",
    features: ["alcohol", "malic_acid", "ash", "alcalinity_of_ash", "magnesium", "total_phenols", "flavanoids", "nonflavanoid_phenols", "proanthocyanins", "color_intensity", "hue", "od280/od315_of_diluted_wines", "proline"],
    feature_definitions: {
      "alcohol": "The percentage of alcohol content. This is a primary differentiator for wine types and quality.",
      "malic_acid": "A type of acid found in wine that contributes to its tartness. Its concentration varies significantly between grape cultivars.",
      "ash": "The mineral content left after evaporation and combustion. It reflects the soil and growing conditions of the grapes.",
      "alcalinity_of_ash": "A measure of the alkalinity of the ash, which can indicate the wine's mineral composition.",
      "magnesium": "The amount of magnesium, a mineral that can affect the wine's taste and development.",
      "total_phenols": "Phenols are chemical compounds that affect the taste, color, and mouthfeel of wine. This is a measure of the total amount.",
      "flavanoids": "A specific type of phenol that is a key indicator of a wine's antioxidant properties and is crucial for distinguishing between cultivars.",
      "nonflavanoid_phenols": "Other phenolic compounds that contribute to the wine's overall profile.",
      "proanthocyanins": "A class of flavonoids that contribute to the wine's astringency and color.",
      "color_intensity": "A measure of the depth of the wine's color.",
      "hue": "The specific tint of the wine's color, which can range from red to yellow.",
      "od280/od315_of_diluted_wines": "A measure of protein concentration, obtained via spectroscopy, which helps differentiate wine types.",
      "proline": "An amino acid, the content of which can be an indicator of grape ripeness and quality."
    }
  },
  breast_cancer: {
    name: "Breast Cancer",
    domain: "🧬 Medical / Health",
    description: "A dataset with features computed from a digitized image of a fine needle aspirate (FNA) of a breast mass. They describe characteristics of the cell nuclei present in the image.",
    features: ["mean radius", "mean texture", "mean perimeter", "mean area", "mean smoothness", "mean compactness", "mean concavity", "mean concave points", "mean symmetry", "mean fractal dimension", "radius error", "texture error", "perimeter error", "area error", "smoothness error", "compactness error", "concavity error", "concave points error", "symmetry error", "fractal dimension error", "worst radius", "worst texture", "worst perimeter", "worst area", "worst smoothness", "worst compactness", "worst concavity", "worst concave points", "worst symmetry", "worst fractal dimension"],
    feature_definitions: {
      "mean radius": "The average of distances from the center to points on the perimeter of the cell nucleus. A primary indicator of tumor size.",
      "mean texture": "The standard deviation of gray-scale values in the cell nucleus image. It measures the uniformity of the nucleus's texture.",
      "mean perimeter": "The average perimeter of the cell nuclei. Related to size and shape.",
      "mean area": "The average area of the cell nuclei. Highly correlated with radius and perimeter.",
      "mean smoothness": "The average of local variation in radius lengths. It quantifies the smoothness of the nuclear contour.",
      "mean compactness": "Calculated as (perimeter^2 / area - 1.0). It's a measure of the shape of the nucleus; less compact shapes are more irregular.",
      "mean concavity": "The severity of concave portions of the nucleus's contour. Irregular, concave contours can be a sign of malignancy.",
      "mean concave points": "The number of concave portions of the contour. This feature is highly indicative of malignancy.",
      "mean symmetry": "A measure of the symmetry of the cell nucleus. Cancerous cells often exhibit less symmetry.",
      "mean fractal dimension": "A measure of the 'coastline approximation' of the nucleus border, which provides a sense of its complexity. More complex borders can be indicative of malignancy."
    }
  },
};

export const LINKAGE_METHODS = ['ward', 'complete', 'average', 'single'];
export const DISTANCE_METRICS = ['euclidean', 'manhattan', 'cosine'];
