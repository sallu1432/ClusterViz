import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileText, Sigma, BrainCircuit } from 'lucide-react';
import Link from 'next/link';

export default function IntroductionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            ClusterViz
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-foreground transition-colors hover:text-foreground/80">
              Introduction
            </Link>
            <Link href="/features" className="text-foreground/60 transition-colors hover:text-foreground/80">
              Features Explained
            </Link>
            <Link href="/dashboard" className="text-foreground/60 transition-colors hover:text-foreground/80">
              Dashboard
            </Link>
          </nav>
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">
            Understanding the dataset through hierarchical clustering
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
            ClusterViz is an interactive tool designed to help you explore and understand complex datasets using Hierarchical Clustering, a powerful unsupervised machine learning technique.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Launch Analysis Tool
              </Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline">
                Learn About Features
              </Button>
            </Link>
          </div>
        </section>

        <Separator className="my-12" />

        <section className="grid md:grid-cols-3 gap-8 text-center">
          <Card>
            <CardHeader>
              <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                <FileText className="h-8 w-8" />
              </div>
              <CardTitle className="mt-4">What is Clustering?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Clustering is the task of grouping a set of objects in such a way that objects in the same group (called a cluster) are more similar to each other than to those in other groups. It's a fundamental technique for data mining and knowledge discovery.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                <Sigma className="h-8 w-8" />
              </div>
              <CardTitle className="mt-4">Hierarchical Approach</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Hierarchical clustering creates a tree-based representation (a dendrogram) of the objects. This allows you to see the structure of the data at different levels of granularity, from individual points to large clusters, without pre-specifying the number of clusters.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                <BrainCircuit className="h-8 w-8" />
              </div>
              <CardTitle className="mt-4">Why Use ClusterViz?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This tool demystifies the clustering process. Interactively adjust parameters, visualize the results through intuitive charts like dendrograms and heatmaps, and gain AI-powered insights to uncover the hidden patterns within your data.
              </p>
            </CardContent>
          </Card>
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
