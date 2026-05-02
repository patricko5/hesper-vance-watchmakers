import type { Metadata } from "next";
import { MovementExplorer } from "@/components/movement/MovementExplorer";

export const metadata: Metadata = {
  title: "Movement Explorer"
};

export default function MovementPage() {
  return <MovementExplorer />;
}
