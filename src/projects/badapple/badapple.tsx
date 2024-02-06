import { createSignal, onMount, Switch, Match, Show } from "solid-js";
import video from "./badapple.mp4";
import { Card } from "@/components/Card.tsx";
import { createEmitter } from "@solid-primitives/event-bus";

const [videoElem, setVideoElem] = createSignal<HTMLVideoElement>();
const events = createEmitter<{
  play: HTMLVideoElement;
  pause: HTMLVideoElement;
}>();

function createTable(props: {
  table: HTMLTableElement;
  height: number;
  width: number;
}) {
  const body = document.createElement("tbody");

  for (let y = 0; y < props.height; y++) {
    let row = props.table.insertRow(y);
    row.style.width = "5px";
    row.style.height = "5px";
    for (let x = 0; x < props.width; x++) {
      let cell = row.insertCell(x);
      cell.style.width = "5px";
      cell.style.height = "5px";
    }
  }

  props.table.appendChild(body);
  return props.table;
}

function VideoPlayer() {
  return (
    <video
      onPlay={() => {
        events.emit("play", videoElem()!);
      }}
      onPause={() => {
        events.emit("pause", videoElem()!);
      }}
      ref={setVideoElem}
      width="160"
      height="120"
      controls
      playsinline
    >
      <source src={video} type="video/mp4" />
      your browser does not support the video tag
    </video>
  );
}

export function BadApple() {
  const [isSafari, setIsSafari] = createSignal<boolean>(false);
  const [canvasElem] = createSignal<HTMLCanvasElement>(
    document.createElement("canvas")
  );
  //? this is basically only used to hide the downscale factor input
  const [isDefault, setIsDefault] = createSignal<boolean>(true);
  const [tableElem, setTableElem] = createSignal<HTMLTableElement>();
  const [downscaleFactor, setDownscaleFactor] = createSignal<number>(3);

  function checkDevice() {
    const result =
      [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
      ].includes(navigator.platform) ||
      // iPad on iOS 13+ detection
      (navigator.userAgent.includes("Mac") && "ontouchend" in document);

    setIsSafari(result);
  }

  onMount(() => {
    checkDevice();
    setIsDefault(true);
    const video = videoElem()!;
    const table = tableElem()!;
    const canvas = canvasElem()!;

    const context = canvas.getContext("2d", { willReadFrequently: true });

    if (!context) {
      alert("no context");
      return;
    }
    canvas.width = video.width;
    canvas.height = video.height;

    function fillTableCell(
      table: HTMLTableElement,
      x: number,
      y: number,
      color: string
    ) {
      table!.rows[y]!.cells[x]!.style.backgroundColor = color;
    }

    function getRGBColorFromPixel(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number
    ) {
      const { data } = ctx.getImageData(x, y, 1, 1);
      return `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
    }

    setTableElem(
      createTable({
        table,
        height: canvas.height / downscaleFactor(),
        width: canvas.width / downscaleFactor(),
      })
    );

    events.on("play", (video) => {
      setIsDefault(false);
      let frame = video;

      function draw() {
        try {
          context!.drawImage(frame, 0, 0, canvas.width, canvas.height);
        } catch (e) {
          alert("cannot draw");
        }
        for (let y = 0; y < video.height; y += downscaleFactor()) {
          for (let x = 0; x < video.width; x += downscaleFactor()) {
            // the table size is already downscaled by the `downscaleFactor`
            fillTableCell(
              table,
              x / downscaleFactor(),
              y / downscaleFactor(),
              getRGBColorFromPixel(context!, x, y)
            );
          }
        }

        requestAnimationFrame(draw);
      }

      requestAnimationFrame(draw);
    });
  });

  return (
    <Switch fallback={<p>uh oh</p>}>
      <Match when={!isSafari()}>
        <Show when={isDefault()}>
          <div class="pt-4">
            <input
              type="number"
              id="downscalefactor"
              onChange={(ev) => {
                setDownscaleFactor(ev.target.valueAsNumber);
              }}
              placeholder="3"
              value="3"
            />
            <label for="downscalefactor"> downscale factor</label>
            <br />
            <hr />
            <br />
          </div>
        </Show>
        <VideoPlayer />
        <br />
        <table
          style={{ "border-collapse": "collapse" }}
          ref={setTableElem}
        ></table>
      </Match>
      <Match when={isSafari()}>
        <Card type="error">
          you seem to be on iOS (or iPadOS), this won't work on there. i am
          working on a solution, thanks for your patience.{" "}
          <a href="https://github.com/thatgurkangurk/gurkz.me/issues/10">
            learn more
          </a>
        </Card>
        <button onClick={() => {
          setIsSafari(false)
          window.umami?.track("bypassed iOS check");
        }}>
          no, let me try it anyways
        </button>
      </Match>
    </Switch>
  );
}
