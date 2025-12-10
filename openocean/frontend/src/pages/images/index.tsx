import {
  Card,
  Divider,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC, useState, useEffect } from "react";
import IMGCard from "../../atoms/IMGCard";
import { useNavigate } from "react-router-dom";
import useGetPinnedFiles from "../../hooks/useGetPinnedFiles";

const ImageCard: FC<{ img: any }> = ({ img }) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/images/${img.id}`)}
      cursor="pointer"
      role="group"
      gap="12px"
      p="12px"
    >
      <Text textAlign="center" color="gray.300" fontWeight="bold">
        {img.metadata?.name}
      </Text>
      <Divider w="50%" mx="auto" />
      <IMGCard key={img.id} url={img?.filename} />
    </Card>
  );
};

const ImagePage: FC = () => {
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
    <VStack align="start" w="100%" h="100%" spacing="12px">
      <Text userSelect="none" fontSize="32px">
        All images
      </Text>
      <SimpleGrid w="100%" gap="24px" columns={5}>
        {images.map((img) => (
          <ImageCard key={img.id} img={img} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default ImagePage;
