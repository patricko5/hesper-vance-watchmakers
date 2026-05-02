import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModelDetailClient } from "@/components/ModelDetailClient";
import { galleryAngles, getModel, models } from "@/lib/data";

type PageProps = {
  params: {
    "model-slug": string;
  };
};

export function generateStaticParams() {
  return models.map((model) => ({ "model-slug": model.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const model = getModel(params["model-slug"]);
  return {
    title: model?.name ?? "Model"
  };
}

export default function ModelDetailPage({ params }: PageProps) {
  const model = getModel(params["model-slug"]);
  if (!model) {
    notFound();
  }

  return <ModelDetailClient model={model} galleryAngles={galleryAngles} />;
}
