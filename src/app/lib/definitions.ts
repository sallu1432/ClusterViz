
export const LINKAGE_DEFINITIONS: Record<string, string> = {
    ward: 'Minimizes the variance within each cluster. It tends to produce clusters of similar size, making it a good default choice.',
    complete: 'Defines the distance between two clusters as the maximum distance between any single data point in the first cluster and any single data point in the second. It is less susceptible to noise.',
    average: 'Defines the distance between two clusters as the average distance between every data point in the first cluster and every data point in the second. It is less susceptible to noise than single linkage.',
    single: 'Defines the distance between two clusters as the minimum distance between any single data point in the first cluster and any single data point in the second. It is good for identifying non-elliptical shapes but can be sensitive to noise.',
};

export const METRIC_DEFINITIONS: Record<string, string> = {
    euclidean: 'The most common way of measuring distance, it is the straight-line distance between two points. It is sensitive to outliers and the scale of features.',
    manhattan: 'Also known as "city block" distance, it measures the distance by summing the absolute differences of the coordinates. It is less sensitive to outliers than Euclidean distance.',
    cosine: 'Measures the angle between two vectors. It is useful when the magnitude of the vectors does not matter, only their orientation. It is often used in text analysis.',
};
