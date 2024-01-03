import { onMount } from "solid-js";

export function BadApple() {
  let canvas: HTMLCanvasElement = document.createElement("canvas");
  let playBtn: HTMLButtonElement;
  let pauseBtn: HTMLButtonElement;
  let video: HTMLVideoElement;
  let inputs: HTMLDivElement;
  let downscaleFactorElem: HTMLInputElement;

  onMount(() => {
    let context = canvas.getContext("2d");
    if (!context) return;
    canvas.width = video.width;
    canvas.height = video.height;
    let downscaleFactor = 3;

    function createTable(height: number, width: number) {
      const table = document.createElement("table");
      const body = document.createElement("tbody");

      for (let y = 0; y < height; y++) {
        let row = table.insertRow(y);
        for (let x = 0; x < width; x++) {
          row.insertCell(x);
        }
      }

      table.appendChild(body);
      document.body.appendChild(table);
      return table;
    }

    let table: HTMLTableElement;

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

    onload = () => {
      pauseBtn.style.display = "none";
    };

    playBtn.addEventListener("click", () => {
      table = createTable(
        canvas.height / downscaleFactor,
        canvas.width / downscaleFactor
      );
      inputs.style.display = "none";
      video.play();
    });

    pauseBtn.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        return;
      }
      video.pause();
    });

    video.addEventListener("pause", () => {
      pauseBtn.textContent = "resume";
    });

    video.addEventListener("play", () => {
      playBtn.style.display = "none";
      pauseBtn.style.display = "block";
      pauseBtn.textContent = "pause";

      let frame = video;

      function draw() {
        context!.drawImage(frame, 0, 0, canvas.width, canvas.height);
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

    downscaleFactorElem.addEventListener("change", () => {
      downscaleFactor = downscaleFactorElem.valueAsNumber;
    });
  });

  return (
    <>
      <div ref={inputs!} class="pt-4">
        <input
          type="number"
          id="downscalefactor"
          ref={downscaleFactorElem!}
          placeholder="3"
          value="3"
        />
        <label for="downscalefactor">downscale factor</label>
        <br />
        <hr />
      </div>
      <video
        src="/projects/badapple/badapple.mp4"
        ref={video!}
        width="160"
        height="120"
      ></video>
      <br />
      <button
        ref={playBtn!}
        class="mx-2 bg-white text-black px-2 py-1 rounded-md"
      >
        play
      </button>
      <button ref={pauseBtn!} class="bg-white text-black px-2 py-1 rounded-md">
        pause/resume
      </button>
    </>
  );
}
