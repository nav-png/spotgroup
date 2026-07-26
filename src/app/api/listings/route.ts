import { NextResponse } from "next/server";

import { parseListingQuery } from "@/lib/listings/query";
import { getListingsProvider } from "@/lib/listings/provider";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries());
  const result = await getListingsProvider().search(parseListingQuery(params));

  return NextResponse.json(result);
}
