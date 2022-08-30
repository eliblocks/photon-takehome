import axios from "axios";
import useSWR from "swr";

export default function usePatients() {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, mutate, error } = useSWR("/patients", fetcher);

  return {
    patients: data,
    mutate,
    error,
  };
}
