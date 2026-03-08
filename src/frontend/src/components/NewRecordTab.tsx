import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import AracForm from "./forms/AracForm";
import EsyaForm from "./forms/EsyaForm";
import HayvanForm from "./forms/HayvanForm";
import InsanForm from "./forms/InsanForm";

type Category = "insan" | "hayvan" | "esya" | "arac" | null;

interface NewRecordTabProps {
  userCode: string;
  onShowInterstitial?: () => boolean;
}

export default function NewRecordTab({
  userCode,
  onShowInterstitial,
}: NewRecordTabProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);

  const handleSuccess = () => {
    // Show interstitial ad after successful record creation
    if (onShowInterstitial) {
      onShowInterstitial();
    }
    setSelectedCategory(null);
  };

  const categories = [
    {
      id: "insan" as Category,
      name: t.person,
      icon: "/assets/generated/insan-icon-transparent.dim_64x64.png",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "hayvan" as Category,
      name: t.animal,
      icon: "/assets/generated/hayvan-icon-transparent.dim_64x64.png",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: "esya" as Category,
      name: t.item,
      icon: "/assets/generated/esya-icon-transparent.dim_64x64.png",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "arac" as Category,
      name: t.vehicle,
      icon: "/assets/generated/arac-icon-transparent.dim_64x64.png",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  if (!selectedCategory) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">{t.selectCategory}</h3>
          <p className="text-muted-foreground">{t.selectCategoryDescription}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary"
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardContent className="p-6 flex flex-col items-center space-y-3">
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${category.gradient} p-4 shadow-lg`}
                >
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="font-semibold text-lg">{category.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const selectedCategoryData = categories.find(
    (c) => c.id === selectedCategory,
  );

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${selectedCategoryData?.gradient} p-2 shadow-lg`}
              >
                <img
                  src={selectedCategoryData?.icon}
                  alt={selectedCategoryData?.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <CardTitle>{selectedCategoryData?.name}</CardTitle>
                <CardDescription>{t.fillAllFields}</CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              {t.changeCategory}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {selectedCategory === "insan" && (
            <InsanForm userCode={userCode} onSuccess={handleSuccess} />
          )}
          {selectedCategory === "hayvan" && (
            <HayvanForm userCode={userCode} onSuccess={handleSuccess} />
          )}
          {selectedCategory === "esya" && (
            <EsyaForm userCode={userCode} onSuccess={handleSuccess} />
          )}
          {selectedCategory === "arac" && (
            <AracForm userCode={userCode} onSuccess={handleSuccess} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
