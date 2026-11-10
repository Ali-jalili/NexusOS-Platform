/** @format */

import { useQuery } from "@tanstack/react-query";
import { getRequests } from "../services/requestService";

function useRequests() {
  async function fetchRequests() {
    const { data, error } = await getRequests();
    if (error) throw new Error(error.message);
    return data;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["requests"],
    queryFn: fetchRequests,
  });

  return { data, isLoading, error };
}

export default useRequests;
