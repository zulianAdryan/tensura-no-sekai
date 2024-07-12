import { cache } from "react";
import axios, { HttpStatusCode } from "axios";
import { notFound } from "next/navigation";
import { API } from "@/constants";
import { AnimeFull } from "@/app/(home)/type";

export const getInfo = cache(async () => {
  const res = await axios.get(`${API.BASE_URL}/anime/${API.ANIME_ID}/full`);

  if (res.status !== HttpStatusCode.Ok) {
    notFound();
  }

  const data: AnimeFull = res.data;

  return data;
});
