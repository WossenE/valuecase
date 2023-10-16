import axios, { AxiosError } from "axios";
import Button from "../Button";
import FormModal from "../FromModal";
import TextEditForm from "../forms/TextEditForm";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

interface TextBlockProps {
  title: string;
  body: string;
  id: string;
  fetchTextBlocks: () => Promise<void>;
}

function TextBlock({ title, body, id, fetchTextBlocks }: TextBlockProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const editData = {
    title: title,
    body: body,
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/textblocks/${id}`);
      fetchTextBlocks();

      // TODO: refetch textblocks
    } catch (err) {
      console.error("Delete request error:", err);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    fetchTextBlocks();
  };

  const handleEdit = async (id: string) => {
    setIsModalOpen(true);
    console.log({ isModalOpen });
  };

  return (
    <div className="bg-gray-300 rounded-lg shadow-lg p-4 w-1/2 h-32 relative">
      <div className="text-lg font-semibold mb-2">{title}</div>
      <p>{body}</p>
      <div className="absolute right-0 top-0 p-4">
        <button className="mr-2 text-red-500" onClick={() => handleDelete(id)}>
          <FaTrash />
        </button>
      </div>
      <div className="absolute right-0 bottom-0 p-4">
        <Button lable="Edit" action={() => handleEdit(id)} />
      </div>
      <FormModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="bg-purple rounded-lg p-4 shadow-lg">
          <TextEditForm
            id={id}
            title={title}
            body={body}
            closeModal={closeModal}
          />
        </div>
      </FormModal>
    </div>
  );
}

export default TextBlock;
