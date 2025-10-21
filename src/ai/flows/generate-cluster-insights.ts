'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating cluster insights.
 *
 * - generateClusterInsights - An async function that takes cluster data and returns a summary of insights.
 * - ClusterInsightsInput - The input type for the generateClusterInsights function.
 * - ClusterInsightsOutput - The output type for the generateClusterInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

// Define the input schema for the flow
const ClusterInsightsInputSchema = z.object({
  clusterData: z.array(
    z.object({
      clusterId: z.number(),
      nSamples: z.number(),
      featureMeans: z.record(z.string(), z.number()),
      representativeSampleIndices: z.array(z.number()),
    })
  ).describe('Array of cluster data, each containing cluster ID, number of samples, feature means, and representative sample indices.'),
  datasetDescription: z.string().describe('Description of the dataset used for clustering.'),
});
export type ClusterInsightsInput = z.infer<typeof ClusterInsightsInputSchema>;

// Define the output schema for the flow
const ClusterInsightsOutputSchema = z.object({
  insights: z.array(
    z.object({
      clusterId: z.number(),
      summary: z.string(),
    })
  ).describe('Array of cluster insights, each containing the cluster ID and a summary of its key characteristics.'),
});
export type ClusterInsightsOutput = z.infer<typeof ClusterInsightsOutputSchema>;

// Define the prompt
const clusterInsightsPrompt = ai.definePrompt({
  name: 'clusterInsightsPrompt',
  input: {schema: ClusterInsightsInputSchema},
  output: {schema: ClusterInsightsOutputSchema},
  prompt: `You are an expert data scientist. You are given data about clusters formed from a dataset, and your task is to summarize the key characteristics of each cluster.

Dataset Description: {{{datasetDescription}}}

For each cluster, you should highlight the features that distinguish it from the other clusters, mentioning the mean values and variance if applicable. Also, mention representative samples for each cluster to provide concrete examples.

Here is the cluster data:

{{#each clusterData}}
  Cluster ID: {{clusterId}}
  Number of Samples: {{nSamples}}
  Feature Means:
  {{#each featureMeans}}
    - {{@key}}: {{this}}
  {{/each}}
  Representative Sample Indices: {{representativeSampleIndices}}
{{/each}}

Generate a concise summary for each cluster that highlights its key characteristics and distinguishing features. Return the answer in JSON format.
`,
});

// Define the flow
const generateClusterInsightsFlow = ai.defineFlow(
  {
    name: 'generateClusterInsightsFlow',
    inputSchema: ClusterInsightsInputSchema,
    outputSchema: ClusterInsightsOutputSchema,
  },
  async input => {
    const {output} = await clusterInsightsPrompt(input);
    return output!;
  }
);

/**
 * Generates cluster insights by calling the generateClusterInsightsFlow.
 * @param input - The input data for generating cluster insights.
 * @returns A promise that resolves to the cluster insights.
 */
export async function generateClusterInsights(input: ClusterInsightsInput): Promise<ClusterInsightsOutput> {
  return generateClusterInsightsFlow(input);
}
