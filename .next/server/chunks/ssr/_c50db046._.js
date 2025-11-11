module.exports = {

"[project]/src/app/lib/datasets.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "DATASETS": (()=>DATASETS),
    "DISTANCE_METRICS": (()=>DISTANCE_METRICS),
    "LINKAGE_METHODS": (()=>LINKAGE_METHODS)
});
const DATASETS = {
    iris: {
        name: "Iris",
        domain: "🌸 Botany / Biology",
        description: "A classic dataset in pattern recognition. It contains 3 classes of 50 instances each, where each class refers to a type of iris plant.",
        features: [
            "sepal length (cm)",
            "sepal width (cm)",
            "petal length (cm)",
            "petal width (cm)"
        ],
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
        features: [
            "alcohol",
            "malic_acid",
            "ash",
            "alcalinity_of_ash",
            "magnesium",
            "total_phenols",
            "flavanoids",
            "nonflavanoid_phenols",
            "proanthocyanins",
            "color_intensity",
            "hue",
            "od280/od315_of_diluted_wines",
            "proline"
        ],
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
        features: [
            "mean radius",
            "mean texture",
            "mean perimeter",
            "mean area",
            "mean smoothness",
            "mean compactness",
            "mean concavity",
            "mean concave points",
            "mean symmetry",
            "mean fractal dimension",
            "radius error",
            "texture error",
            "perimeter error",
            "area error",
            "smoothness error",
            "compactness error",
            "concavity error",
            "concave points error",
            "symmetry error",
            "fractal dimension error",
            "worst radius",
            "worst texture",
            "worst perimeter",
            "worst area",
            "worst smoothness",
            "worst compactness",
            "worst concavity",
            "worst concave points",
            "worst symmetry",
            "worst fractal dimension"
        ],
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
    }
};
const LINKAGE_METHODS = [
    'ward',
    'complete',
    'average',
    'single'
];
const DISTANCE_METRICS = [
    'euclidean',
    'manhattan',
    'cosine'
];
}}),
"[project]/src/app/lib/clustering-simulation.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "simulateClustering": (()=>simulateClustering)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$datasets$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/datasets.ts [app-rsc] (ecmascript)");
;
// Helper functions to generate mock data
const random = (min, max)=>Math.random() * (max - min) + min;
const randomInt = (min, max)=>Math.floor(random(min, max));
const generateScatterData = (nSamples, nClusters)=>{
    const points = [];
    const clusterCenters = Array.from({
        length: nClusters
    }, ()=>({
            x: random(-10, 10),
            y: random(-10, 10)
        }));
    for(let i = 0; i < nSamples; i++){
        const clusterIndex = i % nClusters;
        points.push({
            x: clusterCenters[clusterIndex].x + random(-2, 2),
            y: clusterCenters[clusterIndex].y + random(-2, 2),
            cluster: clusterIndex,
            sample_index: i
        });
    }
    return points;
};
const generateDendrogramData = (nSamples)=>{
    const nodes = {};
    const links = [];
    const clusterThreshold = random(0.5, 2.5);
    // Create leaf nodes
    for(let i = 0; i < nSamples; i++){
        nodes[i] = {
            x: i,
            y: 0
        };
    }
    let mergeCount = nSamples;
    let availableNodes = Array.from({
        length: nSamples
    }, (_, i)=>i);
    while(availableNodes.length > 1){
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
        nodes[newNodeId] = {
            x: newX,
            y: newY
        };
        links.push({
            source: node1,
            target: {
                x: node1.x,
                y: newY
            },
            distance: newY
        });
        links.push({
            source: node2,
            target: {
                x: node2.x,
                y: newY
            },
            distance: newY
        });
        links.push({
            source: {
                x: node1.x,
                y: newY
            },
            target: {
                x: node2.x,
                y: newY
            },
            distance: newY
        });
        availableNodes.push(newNodeId);
    }
    return {
        links,
        nodes: Object.values(nodes),
        cluster_threshold: clusterThreshold
    };
};
const simulateClustering = (params)=>{
    const { dataset, nClusters, features } = params;
    const datasetInfo = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$datasets$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DATASETS"][dataset];
    let n_samples = randomInt(30, 50);
    const usedFeatures = features.length > 0 ? features : datasetInfo.features;
    let n_features = usedFeatures.length;
    let target_distribution = [];
    if (dataset === 'iris') {
        n_features = datasetInfo.features.length;
        const third = Math.floor(n_samples / 3);
        target_distribution = [
            {
                name: 'Setosa',
                value: third
            },
            {
                name: 'Versicolor',
                value: third
            },
            {
                name: 'Virginica',
                value: n_samples - third * 2
            }
        ];
    }
    const scatter_data_2d = generateScatterData(n_samples, nClusters);
    const cluster_labels = scatter_data_2d.map((p)=>p.cluster);
    const cluster_summary = Array.from({
        length: nClusters
    }, (_, i)=>({
            clusterId: i,
            nSamples: cluster_labels.filter((l)=>l === i).length,
            featureMeans: usedFeatures.slice(0, 4).reduce((acc, feature)=>{
                acc[feature] = random(0, 10);
                return acc;
            }, {}),
            representativeSampleIndices: Array.from({
                length: 3
            }, ()=>randomInt(0, n_samples))
        }));
    const silhouette_scores = Array.from({
        length: nClusters
    }, (_, i)=>({
            cluster: `Cluster ${i}`,
            score: random(0.1, 0.9)
        }));
    const cluster_heatmap = {
        features: usedFeatures.slice(0, 5),
        cluster_data: Array.from({
            length: nClusters
        }, (_, i)=>({
                cluster: `Cluster ${i}`,
                ...usedFeatures.slice(0, 5).reduce((acc, feature)=>{
                    acc[feature] = random(0, 1);
                    return acc;
                }, {})
            }))
    };
    const irisFeatures = [
        "sepal length (cm)",
        "sepal width (cm)",
        "petal length (cm)",
        "petal width (cm)"
    ];
    let correlationFeatures = usedFeatures.slice(0, 8);
    if (dataset === 'iris' && irisFeatures.every((f)=>usedFeatures.includes(f))) {
        const sortedIrisFeatures = irisFeatures;
        const otherFeatures = usedFeatures.filter((f)=>!irisFeatures.includes(f));
        correlationFeatures = [
            ...sortedIrisFeatures,
            ...otherFeatures
        ].slice(0, 8);
    }
    const feature_correlation = {
        features: correlationFeatures,
        matrix: Array.from({
            length: correlationFeatures.length
        }, (_, i)=>Array.from({
                length: correlationFeatures.length
            }, (_, j)=>{
                if (i === j) return 1;
                if (dataset === 'iris') {
                    const f1 = correlationFeatures[i];
                    const f2 = correlationFeatures[j];
                    if (f1.includes('petal length') && f2.includes('petal width') || f1.includes('petal width') && f2.includes('petal length')) return random(0.9, 0.98);
                    if (f1.includes('petal') && f2.includes('sepal')) return random(0.5, 0.87);
                }
                return random(-0.4, 0.4);
            }))
    };
    const feature_distributions = usedFeatures.slice(0, 4).map((feature)=>({
            feature,
            bins: Array.from({
                length: 10
            }, (_, i)=>({
                    name: `${(i * 1).toFixed(1)}-${((i + 1) * 1).toFixed(1)}`,
                    value: randomInt(1, 15)
                }))
        }));
    return {
        dataset_summary: {
            n_samples,
            n_features,
            feature_names: datasetInfo.features,
            description: datasetInfo.description,
            target_distribution
        },
        dendrogram: generateDendrogramData(Math.min(n_samples, 30)),
        scatter_data_2d,
        cluster_labels,
        silhouette_scores,
        cluster_summary,
        cluster_heatmap,
        feature_correlation,
        feature_distributions
    };
};
}}),
"[project]/src/app/lib/actions.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"40e695065d7769a5f70534f8f13f242cd90b2a3208":"performClustering"},"",""] */ __turbopack_context__.s({
    "performClustering": (()=>performClustering)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$clustering$2d$simulation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/clustering-simulation.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function performClustering(params) {
    try {
        // Artificial delay to simulate computation
        await new Promise((resolve)=>setTimeout(resolve, 1500));
        const results = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$clustering$2d$simulation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["simulateClustering"])(params);
        return results;
    } catch (error) {
        console.error("Error during clustering simulation:", error);
        throw new Error("Failed to perform clustering.");
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    performClustering
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(performClustering, "40e695065d7769a5f70534f8f13f242cd90b2a3208", null);
}}),
"[project]/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/actions.ts [app-rsc] (ecmascript)");
;
}}),
"[project]/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/lib/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "40e695065d7769a5f70534f8f13f242cd90b2a3208": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performClustering"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/lib/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "40e695065d7769a5f70534f8f13f242cd90b2a3208": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["40e695065d7769a5f70534f8f13f242cd90b2a3208"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/lib/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <module evaluation>');
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/lib/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <exports>');
}}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/src/components/dashboard.tsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Dashboard": (()=>Dashboard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const Dashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Dashboard() from the server but Dashboard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/dashboard.tsx <module evaluation>", "Dashboard");
}}),
"[project]/src/components/dashboard.tsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Dashboard": (()=>Dashboard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const Dashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Dashboard() from the server but Dashboard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/dashboard.tsx", "Dashboard");
}}),
"[project]/src/components/dashboard.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2e$tsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/dashboard.tsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2e$tsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/src/components/dashboard.tsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2e$tsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/src/app/dashboard/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>DashboardPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard.tsx [app-rsc] (ecmascript)");
;
;
function DashboardPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Dashboard"], {}, void 0, false, {
        fileName: "[project]/src/app/dashboard/page.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/app/dashboard/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/dashboard/page.tsx [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=_c50db046._.js.map