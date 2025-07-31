"use client";
import React, { useState, useEffect } from "react";
import { Heart, Search, Grid, List, Star } from "lucide-react";
import { ResultCardGrid } from "../../components/search/ResultCardGrid";
import { ScoredResult } from "@/lib/scorer";
import { Component } from "@/types";
import { SkeletonLoader } from "@/components/common/SkeletonLoader";

const FavoritesUI: React.FC = () => {
  const [catalog, setCatalog] = useState<Component[]>([]);
  const [favorites, setFavorites] = useState<ScoredResult[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const STORAGE_KEY = "favoriteComponents";

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const catalogData = await import("../../data/catalog.json");
        setCatalog(
          catalogData.components || catalogData.default?.components || []
        );
      } catch (error) {
        console.error("Error loading catalog:", error);
        setCatalog([]);
      }
    };
    loadCatalog();
  }, []);

  const loadFavorites = (): void => {
    try {
      const savedFavoriteIds: string[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      if (catalog.length > 0) {
        const favoriteItems = catalog.filter((item) =>
          savedFavoriteIds.includes(item.id)
        );
        const favoriteResults: ScoredResult[] = favoriteItems.map((item) => ({
          item,
          score: 1.0,
          matchedTerms: item.tags.slice(0, 3),
        }));
        setFavorites(favoriteResults);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
      setFavorites([]);
    }
  };

  useEffect(() => {
    if (catalog.length > 0) {
      loadFavorites();
      setIsLoading(false);
    }
  }, [catalog]);

  useEffect(() => {
    const handleStorageChange = (): void => {
      loadFavorites();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("favoritesChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("favoritesChanged", handleStorageChange);
    };
  }, [catalog]);

  const filteredFavorites = favorites.filter((result) => {
    const { item } = result;
    const searchLower = searchTerm.toLowerCase();

    return (
      !searchTerm ||
      item.name.toLowerCase().includes(searchLower) ||
      (item.description &&
        item.description.toLowerCase().includes(searchLower)) ||
      item.tags.some((tag: string) =>
        tag.toLowerCase().includes(searchLower)
      ) ||
      (item.synonyms &&
        item.synonyms.some((synonym: string) =>
          synonym.toLowerCase().includes(searchLower)
        ))
    );
  });

  const handleComponentClick = (result: ScoredResult) => {
    console.log("Clicked component:", result.item.name);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-lg w-48 mb-8"></div>
            <SkeletonLoader />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-500 rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
            <div className="flex items-center gap-1 px-3 py-1 bg-red-100 rounded-full">
              <Star className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-700">
                {favorites.length}
              </span>
            </div>
          </div>
          <p className="text-gray-600">Your saved components</p>
        </div>

        <div className="bg-white rounded-lg border p-6 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search favorites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Switch to grid view"
                className={`p-2 rounded-md transition-all ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                aria-label="Switch to list view"
                className={`p-2 rounded-md transition-all ${
                  viewMode === "list"
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {filteredFavorites.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Heart className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? "No matches found" : "No favorites yet"}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchTerm
                ? "Try adjusting your search term"
                : "Start adding components to your favorites to see them here"}
            </p>
          </div>
        )}

        {filteredFavorites.length > 0 && (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "grid grid-cols-1 gap-4"
            }
          >
            {filteredFavorites.map((result) => (
              <ResultCardGrid
                key={result.item.id}
                result={result}
                onClick={() => handleComponentClick(result)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesUI;
