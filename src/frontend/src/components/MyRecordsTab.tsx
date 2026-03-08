import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGetAllRecordsForUser } from "@/hooks/useQueries";
import { AlertCircle, FileX, Loader2, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { UserRecord } from "../backend";
import RecordCard from "./RecordCard";

interface MyRecordsTabProps {
  userCode: string;
}

type CategoryFilter = "all" | "insan" | "hayvan" | "esya" | "arac";

function getRecordTitle(record: UserRecord): string {
  switch (record.recordData.__kind__) {
    case "insan":
      return record.recordData.insan.adSoyad;
    case "hayvan":
      return record.recordData.hayvan.ad;
    case "esya":
      return record.recordData.esya.esyaAdi;
    case "arac":
      return record.recordData.arac.plaka;
    default:
      return "";
  }
}

export default function MyRecordsTab({ userCode }: MyRecordsTabProps) {
  const { t } = useLanguage();
  const {
    data: records,
    isLoading,
    isError,
  } = useGetAllRecordsForUser(userCode);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  const filterTabs: { id: CategoryFilter; label: string }[] = [
    { id: "all", label: t.filterAll },
    { id: "insan", label: t.filterPerson },
    { id: "hayvan", label: t.filterAnimal },
    { id: "esya", label: t.filterItem },
    { id: "arac", label: t.filterVehicle },
  ];

  const filtered = useMemo(() => {
    if (!records) return [];
    let list = records;
    if (categoryFilter !== "all") {
      list = list.filter((r) => r.category === categoryFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          getRecordTitle(r).toLowerCase().includes(q) ||
          r.uniqueCode.toLowerCase().includes(q),
      );
    }
    return list;
  }, [records, categoryFilter, search]);

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center py-12"
        data-ocid="records.loading_state"
      >
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="border-destructive" data-ocid="records.error_state">
        <CardContent className="p-6 text-center text-destructive">
          <AlertCircle className="h-8 w-8 mx-auto mb-2" />
          <p className="font-medium">{t.recordsLoadError}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.searchRecords}
          className="pl-9"
          data-ocid="records.search_input"
        />
      </div>

      {/* Category filter tabs */}
      <div className="flex gap-1.5 flex-wrap" data-ocid="records.tab">
        {filterTabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setCategoryFilter(tab.id)}
            data-ocid="records.tab"
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              categoryFilter === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="text-center">
        <h3 className="text-xl font-semibold">{t.allRecords}</h3>
        <p className="text-muted-foreground">
          {filtered.length} / {records?.length ?? 0}
        </p>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <Card data-ocid="records.empty_state">
          <CardContent className="p-12 text-center">
            <FileX className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">{t.noRecordsYet}</h3>
            <p className="text-muted-foreground">{t.createFirstRecord}</p>
          </CardContent>
        </Card>
      )}

      {/* Records list */}
      <div className="grid gap-6">
        {filtered.map((record, idx) => (
          <div key={record.uniqueCode} data-ocid={`records.item.${idx + 1}`}>
            <RecordCard record={record} />
          </div>
        ))}
      </div>
    </div>
  );
}
