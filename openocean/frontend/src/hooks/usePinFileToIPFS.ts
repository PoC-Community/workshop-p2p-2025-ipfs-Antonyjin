import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const usePinFileToIPFS = () =>
  useMutation({
    mutationFn: async (params: { image: File, name: string }) => {
      const formData = new FormData();
      formData.append("file", params.image);
      
      const pinataMetadata = JSON.stringify({
        name: params.name,
      });
      formData.append("pinataMetadata", pinataMetadata);

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_API_KEY}`,
          },
        }
      );
      
      return response;
    },
  });

export default usePinFileToIPFS;

