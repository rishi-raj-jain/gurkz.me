import type { JSXElement } from "solid-js";
import { cva, type VariantProps } from "cva";
import { twMerge } from "tailwind-merge";

const cardVariants = cva("my-2 px-4 rounded-md p-2 text-center", {
  variants: {
    type: {
      warning: "bg-orange-500",
      error: "bg-red-600 font-bold",
    },
    defaultVariants: {
      type: "warning",
    },
  },
});

type Props = {
  children: JSXElement
} & VariantProps<typeof cardVariants>;

function Card(props: Props) {
 return (
    <div class={twMerge(cardVariants({ type: props.type }))}>
      {props.children}
    </div>
 )
}

export { Card }
