"use server";

import { writeFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import slugify from "slugify";
import { fileURLToPath } from "url";
import { createSong, updateSong } from "../_repositories/songs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

slugify.extend({ "/": "-" });

async function saveFile(
  file: File,
  type: "audio" | "images",
  filename: string
) {
  const buffer = await file.arrayBuffer();
  const ext = extname(file.name);
  const fileName = slugify(`${filename}${ext}`, { lower: true });
  const filePath = join(__dirname, `../../public/assets/${type}/${fileName}`);
  writeFileSync(filePath, Buffer.from(buffer));
  return fileName;
}

export async function saveSong(formData: FormData) {
  try {
    const inputData = {
      title: formData.get("title") as string,
      artist: formData.get("artist") as string,
      albumTitle: formData.get("albumTitle") as string,
      albumYear: Number(formData.get("albumYear")),
      cover: formData.get("cover") as File,
      poster: formData.get("poster") as File,
      audio: formData.get("audio") as File,
    };

    const slug = `${slugify(inputData.artist)}/${slugify(inputData.title)}`;
    const cover = await saveFile(inputData.cover, "images", `${slug}-cover`);
    const poster = await saveFile(inputData.poster, "images", `${slug}-poster`);
    const audio = await saveFile(inputData.audio, "audio", `${slug}`);

    if (formData.get("id")) {
      await updateSong(Number(formData.get("id")), {
        title: inputData.title,
        artist: inputData.artist,
        albumTitle: inputData.albumTitle,
        albumYear: inputData.albumYear,
        cover,
        poster,
        audio,
        slug,
      });
    } else {
      await createSong({
        title: inputData.title,
        artist: inputData.artist,
        albumTitle: inputData.albumTitle,
        albumYear: inputData.albumYear,
        cover,
        poster,
        audio,
        slug,
      });
    }

    return {
      saved: true,
    };
  } catch (error) {
    console.error(error);
    return {
      saved: false,
    };
  }
}
