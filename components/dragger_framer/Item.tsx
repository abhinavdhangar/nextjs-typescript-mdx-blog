import * as React from "react";
import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import styles from '../../styles/dragger.module.css'

import { ReorderIcon } from "./Icon";
import useRaisedShadow from "./use-raised-shadow";

interface Props {
  item: string;
}

export const Item = ({ item }: Props) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      className={`border-2 border-black`}
      id={item}
      style={{ boxShadow, y }}
      dragListener={true}
      dragControls={dragControls}
    >
      <span className={`text-[1.1rem]`}>{item}</span>
      <ReorderIcon dragControls={dragControls} />
    </Reorder.Item>
  );
};
