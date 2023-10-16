import TextBlock from "./TextBlock";
import ImageBlock from "./ImageBlock";
import { ImageBlockInterface, TextBlockInterface } from "../../interfaces";

interface BlocksProps {
  blocks: (ImageBlockInterface | TextBlockInterface)[];
  fetchTextBlocks: () => Promise<void>;
}

function BlocksList({ blocks, fetchTextBlocks }: BlocksProps) {
  if (blocks.length === 0) {
    return (
      <div>
        No text blocks or images returned by server. Please add blocks using the
        Sidebar.
      </div>
    );
  }

  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);

  return (
    <div className={`flex flex-col gap-8 justify-center`}>
      {sortedBlocks.map((blockItem) => (
        <div key={blockItem.id}>
          {isTextBlock(blockItem) ? (
            <TextBlock
              title={blockItem.title}
              body={blockItem.body}
              id={blockItem.id}
              fetchTextBlocks={fetchTextBlocks}
            />
          ) : (
            <ImageBlock title={blockItem.title} imageId={blockItem.id} />
          )}
        </div>
      ))}
    </div>
  );
}

const isTextBlock = (
  item: ImageBlockInterface | TextBlockInterface
): item is TextBlockInterface => {
  return (item as TextBlockInterface).title !== undefined;
};

export default BlocksList;
