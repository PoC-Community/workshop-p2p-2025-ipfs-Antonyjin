import { FC } from "react";
import { VStack } from "@chakra-ui/react";
import SectionTitle from "../molecules/SectionTitle";
import { useNavigate } from "react-router-dom";
import AvailableImages from "../organisms/AvailableImages";
import useGetPinnedFiles from "../hooks/useGetPinnedFiles";
import { useEffect, useState } from "react";

const Home: FC = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<any[]>([]);

  const { mutate: getPinnedFiles } = useGetPinnedFiles();

  useEffect(() => {
    getPinnedFiles(undefined, {
      onSuccess: (data) => {
        // Transform IPFS data to match the expected format
        const transformedImages = data.data.rows.map((file: any) => ({
          id: file.id,
          name: file.metadata?.name || "Untitled",
          filename: file.ipfs_pin_hash, // Use IPFS hash instead of filename
          metadata: file.metadata,
        }));
        setImages(transformedImages);
      },
      onError: (error) => {
        console.error("Error fetching from IPFS:", error);
      },
    });
  }, [getPinnedFiles]);


  return (
    <>
      {images && (
        < VStack align="start" w="100%" h="100%" spacing="24px">
          <SectionTitle title="Images" onClick={() => navigate("/images")} />
          <AvailableImages images={images} />
        </VStack >
      )}
    </>
  );
};

export default Home;
