"use client";

import * as Slider from "@radix-ui/react-slider";
import { X } from "lucide-react";
import { useState } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Filter[]) => void;
}

type Filter = {
  name: string;
  value: string;
  label?: string;
};

const sizes = ["XS", "S", "M", "L", "XL"];
const colors = [
  { name: "Blanc", value: "white", class: "bg-white border border-gray-200" },
  { name: "Noir", value: "black", class: "bg-black" },
  { name: "Vert", value: "green", class: "bg-green-500" },
  { name: "Orange", value: "orange", class: "bg-orange-500" },
];

const priceRanges = {
  min: 0,
  max: 100000,
  step: 1000,
};

export default function FilterModal({
  isOpen,
  onClose,
  onApplyFilters,
}: FilterModalProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  if (!isOpen) return null;

  const handleApply = () => {
    const filters: Filter[] = [
      ...selectedSizes.map((size) => ({
        name: "Taille",
        value: size,
        label: size,
      })),
      ...selectedColors.map((color) => ({
        name: "Couleur",
        value: color,
        label: colors.find((c) => c.value === color)?.name || color,
      })),
      {
        name: "Prix",
        value: `${priceRange[0]}-${priceRange[1]}`,
        label: `${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()} FCFA`,
      },
    ];
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([priceRanges.min, priceRanges.max]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Filtres</h2>
          <button onClick={onClose} className="p-2 hover:text-[#D12E87]">
            <X size={24} />
          </button>
        </div>

        {/* Tailles */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Taille</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSizes((prev) =>
                    prev.includes(size)
                      ? prev.filter((s) => s !== size)
                      : [...prev, size]
                  );
                }}
                className={`px-4 py-2 rounded-md ${
                  selectedSizes.includes(size)
                    ? "bg-black text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Couleurs */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Couleur</h3>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => {
                  setSelectedColors((prev) =>
                    prev.includes(color.value)
                      ? prev.filter((c) => c !== color.value)
                      : [...prev, color.value]
                  );
                }}
                className={`w-8 h-8 rounded-full ${color.class} ${
                  selectedColors.includes(color.value)
                    ? "ring-2 ring-offset-2 ring-[#D12E87]"
                    : ""
                }`}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Prix */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Prix</h3>
          <div className="px-2">
            <div className="flex justify-between mb-4">
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-500">Min</span>
                <span className="font-medium">
                  {priceRange[0].toLocaleString()} FCFA
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-500">Max</span>
                <span className="font-medium">
                  {priceRange[1].toLocaleString()} FCFA
                </span>
              </div>
            </div>

            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[priceRange[0], priceRange[1]]}
              max={priceRanges.max}
              min={priceRanges.min}
              step={priceRanges.step}
              onValueChange={(value) => setPriceRange([value[0], value[1]])}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
                <Slider.Range className="absolute bg-[#D12E87] rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white border-2 border-[#D12E87] rounded-full hover:bg-[#D12E87] hover:scale-110 transition-all focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-[#D12E87]"
                aria-label="Prix minimum"
              />
              <Slider.Thumb
                className="block w-5 h-5 bg-white border-2 border-[#D12E87] rounded-full hover:bg-[#D12E87] hover:scale-110 transition-all focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-[#D12E87]"
                aria-label="Prix maximum"
              />
            </Slider.Root>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleReset}
            className="flex-1 py-3 border border-black rounded-full hover:bg-gray-50"
          >
            Réinitialiser
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-3 bg-black text-white rounded-full hover:bg-gray-900"
          >
            Appliquer
          </button>
        </div>
      </div>
    </div>
  );
}
