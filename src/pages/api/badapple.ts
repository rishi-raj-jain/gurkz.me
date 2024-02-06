import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";

export const GET: APIRoute = ({ request: req }) => {
  const range = req.headers.range;
  if (!range) return new Response("you need to provide a range", { status: 400 });

  const videoPath = path.join("..", "..", "projects", "badapple", "badapple.mp4");
  const videoSize = fs.statSync(videoPath).size;

  const CHUNK_SIZE = 10 ** 6; // 1mb
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  const res = new Response(206, headers);

  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);

  return res;
}

  
