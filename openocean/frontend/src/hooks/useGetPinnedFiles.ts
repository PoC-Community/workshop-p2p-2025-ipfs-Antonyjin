import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useGetPinnedFiles = () =>
  useMutation({
    mutationFn: async () => {
      const response = await axios.get(
        "https://api.pinata.cloud/data/pinList?status=pinned",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_API_KEY}`,
          },
        }
      );
      return response;
    },
  });

export default useGetPinnedFiles;

