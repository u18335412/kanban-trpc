import { useState } from 'react';
import { NextPageWithLayout } from './_app';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const DndPage: NextPageWithLayout = () => {
  const [items, setItems] = useState<number[]>([1, 2, 3]);
  const [listRef] = useAutoAnimate<HTMLUListElement>();
  const addItem = () => setItems([...items, items.length]);
  return (
    <div className="ml-4 ">
      <ul ref={listRef}>
        {items?.map((item, idx) => (
          <div
            onClick={() => setItems([...items.filter((item) => item != idx)])}
            key={idx}
            className="flex cursor-pointer justify-between max-w-xs mt-2 bg-black px-4 py-2 rounded transition-all hover:scale-105"
          >
            <span>item</span>
            {item}
          </div>
        ))}
      </ul>
      <button onClick={addItem} className="mt-4 rounded p-2 bg-main-purple">
        Add item
      </button>
    </div>
  );
};

export default DndPage;
