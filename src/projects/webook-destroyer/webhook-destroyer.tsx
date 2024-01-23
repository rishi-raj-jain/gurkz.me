import { TextField } from "@kobalte/core";
import { createSignal } from "solid-js";
import { z } from "zod";
import "./webhook-destroyer.css";
import { twMerge } from "tailwind-merge";

const webhookSchema = z
  .string()
  .url()
  .startsWith(
    "https://discord.com/api/webhooks/" ||
      "https://canary.discord.com/api/webhooks/" ||
      "https://ptb.discord.com/api/webhooks"
  );

export function Destroyer() {
  const [buttonText, setButtonText] = createSignal("Delete");
  const [isBtnDisabled, setIsButtonDisabled] = createSignal(false);
  let form: HTMLFormElement;
  let webhook: HTMLInputElement;

  async function onSubmit(
    e: Event & {
      readonly submitter: HTMLElement | null;
    } & {
      currentTarget: HTMLFormElement;
      target: EventTarget;
    }
  ) {
    e.preventDefault();
    const { success } = webhookSchema.safeParse(webhook.value);
    if (!success) {
      alert("please enter a valid discord webhook url!");
      form.reset();
      return;
    }

    setIsButtonDisabled(true);
    setButtonText("Deleting...");

    fetch(webhook.value, {
      method: "DELETE",
    })
      .catch(() => alert("An error occurred!"))
      .then((res) => {
        form.reset();

        setIsButtonDisabled(false);
        setButtonText("Delete");

        if (res) {
          if (res.status === 204) {
            alert("Webhook has been deleted!");
          } else {
            alert("Webhook does not exist!");
          }
        }
      });
  }

  return (
    <>
      <TextField.Root class="text-field flex flex-col gap-1">
        <TextField.Label class="text-field__label text-zinc-300 text-sm font-medium select-none">
          Favorite fruit
        </TextField.Label>
        <TextField.Input
          class={twMerge(
            `text-field__input data-[invalid]:text-[hsl(0_72%_51%)] data-[invalid]:border-[hsl(0_72%_51%)] focus-visible:[outline:2px solid hsl(200 98% 39%)] outline-none inline-flex w-[200px] text-base transition-[border-color] duration-[250ms,color] delay-[250ms] bg-zinc-800 border border-zinc-600 text-[hsl(0_100%_100%_/_0.9)] px-3 py-1.5 rounded-md border-solid hover:border-zinc-500 focus-visible:outline-offset-2`
          )}
        />
      </TextField.Root>
      {/* <form ref={form!} onSubmit={onSubmit}>
        <label
          for="webhook"
          class="mb-2 block text-left text-sm font-medium text-gray-400"
        >
          Webhook URL
        </label>

        <input
          ref={webhook!}
          type="url"
          id="webhook"
          class="mb-4 block w-full border-gray-600 rounded-md bg-gray-700 p-3 text-sm outline-none focus:outline-2 focus:outline-blue-600"
          placeholder="https://discord.com/api/webhooks/..."
          required
        />

        <button
          disabled={isBtnDisabled()}
          type="submit"
          id="btn"
          class="w-full rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-medium sm:w-auto disabled:cursor-not-allowed disabled:bg-green-500 hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-red-300"
        >
          {buttonText()}
        </button>
      </form> */}
    </>
  );
}
