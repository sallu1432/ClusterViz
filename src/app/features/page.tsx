"use client"
import { useState } from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DATASETS } from "../lib/datasets";
import type { Dataset } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function FeaturesPage() {
    const [selectedDatasetKey, setSelectedDatasetKey] = useState<keyof typeof DATASETS>('iris');
    const selectedDataset = DATASETS[selectedDatasetKey] as Dataset;

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <Link href="/" className="text-2xl font-bold tracking-tight">
                        ClusterViz
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="outline">
                                <ArrowLeft className="mr-2" /> Back
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button>
                                Next Page <ArrowRight className="ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
                <section className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">
                            Dataset Feature Explorer
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                            Understand the building blocks of our analysis. Select a dataset to see what each feature represents and why it's important for the clustering model.
                        </p>
                    </div>

                    <div className="flex justify-center mb-10">
                        <div className="w-full max-w-sm">
                            <Select
                                value={selectedDatasetKey}
                                onValueChange={(value) => setSelectedDatasetKey(value as keyof typeof DATASETS)}
                            >
                                <SelectTrigger className="h-12 text-lg">
                                    <SelectValue placeholder="Select a dataset" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(DATASETS).map(([key, { name }]) => (
                                        <SelectItem key={key} value={key} className="text-lg">
                                            {name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {selectedDataset.features.map(feature => (
                             <Card key={feature} className="transition-all hover:shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-xl">{feature}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                     <p className="text-muted-foreground">
                                        {(selectedDataset.feature_definitions as Record<string, string>)[feature] || "No definition available."}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </main>
             <footer className="border-t">
                <div className="container mx-auto text-center py-4 text-sm text-muted-foreground">
                    Built for interactive data exploration.
                </div>
            </footer>
        </div>
    );
}
