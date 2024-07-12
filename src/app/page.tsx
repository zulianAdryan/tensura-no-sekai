import { getInfo } from "@/services";
import { revalidateInHours } from "@/utils";
import { AnimeFull } from "./(home)/type";
import PageContent from "./(home)/page-content";

export const revalidate = revalidateInHours(24);

export default async function Page() {
  const data: AnimeFull = await getInfo();

  return <PageContent data={data} />;
}
