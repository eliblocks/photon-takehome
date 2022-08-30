import axios from "axios";
import useSWR from "swr";

export default function usePatient(id) {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, mutate, error } = useSWR(`/patients/${id}`, fetcher);

  return {
    patient: data,
    mutate,
    error,
  };
}
