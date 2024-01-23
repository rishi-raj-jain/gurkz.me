import { Switch, type JSXElement, Match } from "solid-js";
import { cva, type VariantProps } from "cva";
import { twMerge } from "tailwind-merge";
import { BiRegularError, BiRegularErrorAlt } from "solid-icons/bi";
import { BsCheckLg } from "solid-icons/bs";

const cardVariants = cva("my-2 px-4 rounded-md p-2 flex gap-2 items-center", {
  variants: {
    type: {
      success: "bg-teal-600",
      warning: "bg-orange-500",
      error: "bg-red-600 font-bold",
    },
    defaultVariants: {
      type: "warning",
    },
  },
});

type Props = {
  children: JSXElement;
} & VariantProps<typeof cardVariants>;

function Card(props: Props) {
  return (
    <div class={twMerge(cardVariants({ type: props.type }))}>
      <div>
        <Switch fallback={<></>}>
          <Match when={props.type === "success"}>
            <BsCheckLg size={32} />
          </Match>
          <Match when={props.type === "warning"}>
            <BiRegularError size={32} />
          </Match>
          <Match when={props.type === "error"}>
            <BiRegularErrorAlt size={32} />
          </Match>
        </Switch>
      </div>
      <div class="pr-4">{props.children}</div>
    </div>
  );
}

export { Card };
