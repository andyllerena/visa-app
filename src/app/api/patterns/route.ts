// src/app/api/patterns/route.ts
import { NextResponse } from "next/server";
import catalog from "@/data/catalog.json";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return NextResponse.json(catalog.patterns);
}
