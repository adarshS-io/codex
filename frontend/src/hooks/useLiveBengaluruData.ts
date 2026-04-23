import { useQuery } from "@tanstack/react-query";
import { fetchLiveBengaluruData } from "@/lib/liveData";

export function useLiveBengaluruData() {
  return useQuery({
    queryKey: ["live-bengaluru-data"],
    queryFn: fetchLiveBengaluruData,
    staleTime: 10 * 60 * 1000,
    refetchInterval: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
