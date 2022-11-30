// import "./styles.css";
import * as React from 'react';
import { useState } from 'react';
import { Reorder } from 'framer-motion';
import { Item } from './Item';

const initialItems = ['🍅 Tomato', '🥒 Cucumber', '🧀 Cheese', '🥬 Lettuce'];

export default function DraggerFramer() {
  const [items, setItems] = useState(initialItems);
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerText = `
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 24px;
}

ul {
  position: relative;
  width: 300px;
}

li {
  border-radius: 10px;
  margin-bottom: 10px;
  width: 100%;
  padding: 15px 18px;
  position: relative;
  background: white;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

li svg {
  width: 18px;
  height: 18px;
  cursor: grab;
}

`;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
  }, []);

  return (
    <Reorder.Group axis="y" onReorder={setItems} values={items}>
      {items.map((item) => (
        <Item key={item} item={item} />
      ))}
    </Reorder.Group>
  );
}
