import { useState } from "react";
import { ImageBlockInterface, TextBlockInterface } from "../interfaces";
import BlocksList from "./blocks-list/BlocksList";
import ImageBlockForm from "./forms/ImageBlockForm";
import TextBlockForm from "./forms/TextBlockForm";
import FormModal from "./FromModal";

interface BlocksWrapperProps {
  inputType: string;
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  blocks: (TextBlockInterface | ImageBlockInterface)[];
  fetchTextBlocks: () => Promise<void>;
  fetchImageBlocks: () => Promise<void>;
  setIsModalOpen: (isModalOpen: boolean) => void;

}

function BlocksWrapper({
  inputType,
  isSidebarOpen,
  isModalOpen,
  blocks,
  fetchTextBlocks,
  fetchImageBlocks,
  setIsModalOpen
}: BlocksWrapperProps) {

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div
      className={`duration-500 p-4 pl-16 min-h-screen ${
        isSidebarOpen ? "ml-64" : "ml-0"
      }`}
    >
      <BlocksList blocks={blocks} fetchTextBlocks={fetchTextBlocks} />
      <FormModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="bg-purple rounded-lg p-4 shadow-lg">
          {inputType === "text" && (
            <TextBlockForm
              order={blocks.length + 1}
              fetchTextBlocks={fetchTextBlocks}
              closeModal={closeModal}
            />
          )}
          {inputType === "image" && (
            <ImageBlockForm
              order={blocks.length + 1}
              fetchImageBlocks={fetchImageBlocks}
            />
          )}
        </div>
      </FormModal>
    </div>
  );
}

export default BlocksWrapper;

// fetch data, pass down to BlocksList
// show correct form based on input type value
