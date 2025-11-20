import { getTranslations } from "next-intl/server";

export default async function Home() {
  const tHome = await getTranslations("home");

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {tHome("title")}
        </h1>
        <p className="text-lg text-muted-foreground">{tHome("subtitle")}</p>
      </div>
    </div>
  );
}
