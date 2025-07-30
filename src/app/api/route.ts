import { NextResponse } from "next/server";
import catalog from "@/data/catalog.json";

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(catalog.components);
}
