"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const [service, setService] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);

  useEffect(() => {
    setService(searchParams.get("service"));
    setPrice(searchParams.get("price"));
  }, [searchParams]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!service || !price) return;

    // Construire le message WhatsApp
    const message = `
      *Nouvelle Réservation*
      Service: ${service}
      Prix: ${price} FCFA
      Nom: ${formData.name}
      Téléphone: ${formData.phone}
      Date: ${formData.date}
      Heure: ${formData.time}
      Notes: ${formData.notes}
    `.trim();

    // Rediriger vers WhatsApp
    const whatsappUrl = `https://wa.me/+221765769486?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!service || !price) {
    return <p className="text-center py-10">Chargement...</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Réservation - {service}</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Numéro de téléphone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="date">Date souhaitée</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="time">Heure souhaitée</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="notes">Notes supplémentaires</Label>
            <Input
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white"
          >
            Confirmer la réservation
          </Button>
        </form>
      </div>
    </div>
  );
}
