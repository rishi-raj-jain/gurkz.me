import { createSignal, onMount, Switch, Match } from "solid-js";
import video from "./badapple.mp4";
import { makeEventListener } from "@solid-primitives/event-listener";
import { Card } from "@/components/Card.tsx";
import "./badapple.css";

const [videoElem, setVideoElem] = createSignal<HTMLVideoElement>();

type CreateTableProps = {
  table: HTMLTableElement;
  height: number;
  width: number;
};

function createTable(props: CreateTableProps) {
  const body = document.createElement("tbody");

  for (let y = 0; y < props.height; y++) {
    let row = props.table.insertRow(y);
    for (let x = 0; x < props.width; x++) {
      row.insertCell(x);
    }
  }

  props.table.appendChild(body);
  return props.table;
}

function VideoPlayer() {
  return (
    <video ref={setVideoElem} width="160" height="120" controls playsinline>
        <source src={video} type="video/mp4" />
        <source src="https://api.gurkz.me/badapple.mp4" type="video/mp4" />
        your browser does not support the video tag
    </video>
  )
}

export function BadApple() {
  const [isSafari, setIsSafari] = createSignal<boolean>(false);
  const [canvasElem] = createSignal<HTMLCanvasElement>(
    document.createElement("canvas")
  );
  const [playBtnElem, setPlayBtn] = createSignal<HTMLButtonElement>();
  const [pauseBtnElem, setPauseBtn] = createSignal<HTMLButtonElement>();
  const [inputsElem, setInputsElem] = createSignal<HTMLDivElement>();
  const [downscaleFactorElement, setDownscaleFactorElement] =
    createSignal<HTMLInputElement>();
  const [tableElem, setTableElem] = createSignal<HTMLTableElement>();

  function checkDevice() {
    const result = [
       'iPad Simulator',
       'iPhone Simulator',
       'iPod Simulator',
       'iPad',
       'iPhone',
       'iPod'
    ].includes(navigator.platform)
     // iPad on iOS 13+ detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document);

    setIsSafari(result);
}

  onMount(() => {
    checkDevice();
    const playBtn = playBtnElem()!;
    const pauseBtn = pauseBtnElem()!;
    const video = videoElem()!;
    const inputs = inputsElem()!;
    const downscaleFactorElem = downscaleFactorElement()!;
    const table = tableElem()!;
    const canvas = canvasElem()!;

    const context = canvas.getContext("2d", { willReadFrequently: true });

    if (!context) {
      alert("no context");
      return;
    }
    canvas.width = video.width;
    canvas.height = video.height;
    let downscaleFactor = 3;

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

    pauseBtn.style.display = "none";
    setTableElem(
      createTable({
        table,
        height: canvas.height / downscaleFactor,
        width: canvas.width / downscaleFactor,
      })
    );

    makeEventListener(video, "play", () => {
      inputs.style.display = "none";
    });

    makeEventListener(playBtn, "click", () => {
      try {
        video.play();
      } catch (e) {
        alert("uh oh");
      }
    });

    makeEventListener(pauseBtn, "click", () => {
      if (video.paused) {
        video.play();
        return;
      }
      video.pause();
    });

    makeEventListener(video, "pause", () => {
      pauseBtn.textContent = "resume";
    });

    makeEventListener(video, "play", () => {
      playBtn.style.display = "none";
      pauseBtn.style.display = "block";
      pauseBtn.textContent = "pause";

      let frame = video;

      function draw() {
        try {
          context!.drawImage(frame, 0, 0, canvas.width, canvas.height);
        } catch (e) {
          alert("cannot draw");
        }
        for (let y = 0; y < video.height; y += downscaleFactor) {
          for (let x = 0; x < video.width; x += downscaleFactor) {
            // the table size is already downscaled by the `downscaleFactor`
            fillTableCell(
              table,
              x / downscaleFactor,
              y / downscaleFactor,
              getRGBColorFromPixel(context!, x, y)
            );
          }
        }

        requestAnimationFrame(draw);
      }

      requestAnimationFrame(draw);
    });

    makeEventListener(downscaleFactorElem, "change", () => {
      downscaleFactor = downscaleFactorElem.valueAsNumber;
    });
  });

  return (
    <Switch fallback={<p>uh oh</p>}>
      <Match when={!isSafari()}>
      <div ref={setInputsElem} class="pt-4">
        <input
          type="number"
          id="downscalefactor"
          ref={setDownscaleFactorElement}
          placeholder="3"
          value="3"
        />
        <label for="downscalefactor">downscale factor</label>
        <br />
        <hr />
      </div>
      <VideoPlayer />
      <br />
      <table
        style={{ "border-collapse": "collapse" }}
        ref={setTableElem}
      ></table>
      <button
        ref={setPlayBtn}
        class="mr-2 bg-white text-black px-2 py-1 rounded-md"
      >
        play
      </button>
      <button
        ref={setPauseBtn}
        class="bg-white text-black px-2 py-1 rounded-md"
      >
        pause/resume
      </button>
      </Match>
      <Match when={isSafari()}>
        <Card type="error">
          you seem to be on iOS (or iPadOS), this won't work on there.
          i am working on a solution, thanks for your patience. <a href="https://github.com/thatgurkangurk/gurkz.me/issues/10">learn more</a>
        </Card>
      </Match>
    </Switch>
  );
}
