import { FaTrash } from "react-icons/fa";

interface ImageBlockProps {
  imageId: string;
  title: string;
}

function ImageBlock({ imageId }: ImageBlockProps) {
  return (
    <div className="bg-gray-300 rounded-lg shadow-lg p-4 w-1/2 relative">
      <div className="absolute right-0 top-0 p-4">
        <button className="mr-2 text-red-500">
          <FaTrash />
        </button>
      </div>
      <figure className="w-full h-32 mb-4">
        <img
          src={`/api/files/${imageId}`}
          alt=""
          className="w-full h-full object-contain rounded-lg"
        />
        <figcaption>Caption for the Image</figcaption>
      </figure>
    </div>
  );
}

export default ImageBlock;
