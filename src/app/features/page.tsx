"use client"
import { useState } from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DATASETS } from "../lib/datasets";
import type { Dataset } from "@/types";
import { ArrowLeft, ArrowRight, ShoppingCart, ShieldAlert, UserCheck } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";

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
                        <ThemeToggle />
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
                            Currently the model is designed with three datasets: Iris, Wine and Breast Cancer.
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                            Understand the building blocks of our analysis. Select a dataset to see what each feature of that dataset represents and why it's important for the clustering model.
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
                
                <Separator className="my-16" />

                <section className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold tracking-tight mb-4">
                            From Data to Decisions: Future Business Potential
                        </h2>
                        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
                            The clustering techniques you're exploring are the foundation for powerful, real-world business applications. Here’s how this model could evolve:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <Card>
                            <CardHeader>
                                <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                                    <UserCheck className="h-8 w-8" />
                                </div>
                                <CardTitle className="mt-4">Customer Segmentation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    By clustering customers based on purchasing behavior, demographics, and engagement metrics, businesses can create targeted marketing campaigns that resonate with specific groups, increasing ROI.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                                    <ShieldAlert className="h-8 w-8" />
                                </div>
                                <CardTitle className="mt-4">Anomaly Detection</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Identify unusual patterns that don't fit into any cluster. This is crucial for fraud detection in financial transactions, or identifying faulty equipment in a manufacturing line.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                                    <ShoppingCart className="h-8 w-8" />
                                </div>
                                <CardTitle className="mt-4">Recommendation Engines</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Group users with similar tastes to power "customers who bought this also liked..." features. This model can be extended to recommend products, movies, or articles, enhancing user experience.
                                </p>
                            </CardContent>
                        </Card>
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
