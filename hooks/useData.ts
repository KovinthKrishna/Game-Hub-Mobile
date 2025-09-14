import apiClient from "@/services/apiClient";
import { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState } from "react";

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const [data, setData] = useState<T>({} as T);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(
    () => {
      const controller = new AbortController();

      setLoading(true);
      apiClient
        .get<T>(endpoint, {
          signal: controller.signal,
          ...requestConfig,
        })
        .then((res) => setData(res.data))
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err);
        })
        .finally(() => setLoading(false));

      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, error, loading };
};

export default useData;
