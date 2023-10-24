type Data = {
  slug: string;
  title: string;
};

async function getDataTrending(): Promise<Data[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/trending`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data from API");
  }
  const data = await response.json();
  return data;
}
async function getDataMobile(): Promise<Data[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/mobilegames`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data from API");
  }
  const data = await response.json();
  return data;
}
async function getDataPc(): Promise<Data[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/pcgames`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data from API");
  }
  const data = await response.json();
  return data;
}
async function getDataApps(): Promise<Data[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/apps`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data from API");
  }
  const data = await response.json();
  return data;
}
async function getDataVoucher(): Promise<Data[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/voucher`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data from API");
  }
  const data = await response.json();
  return data;
}

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const { trending }: any = await getDataTrending();
    const { mobileGames }: any = await getDataMobile();
    const { pcgames }: any = await getDataPc();
    const { apps }: any = await getDataApps();
    const { voucher }: any = await getDataVoucher();

    const dataSiteTrending = trending.map((item: any) => {
      return {
        url: `${baseUrl}/trending/${item.slug}`,
        lastModified: new Date(),
        title: item.title,
      };
    });
    const dataSiteMobile = mobileGames.map((item: any) => {
      return {
        url: `${baseUrl}/mobile-games/${item.slug}`,
        lastModified: new Date(),
        title: item.title,
      };
    });
    const dataSitePc = pcgames.map((item: any) => {
      return {
        url: `${baseUrl}/pc-games/${item.slug}`,
        lastModified: new Date(),
        title: item.title,
      };
    });
    const dataSiteApps = apps.map((item: any) => {
      return {
        url: `${baseUrl}/apps/${item.slug}`,
        lastModified: new Date(),
        title: item.title,
      };
    });
    const dataSiteVoucher = voucher.map((item: any) => {
      return {
        url: `${baseUrl}/voucher/${item.slug}`,
        lastModified: new Date(),
        title: item.title,
      };
    });

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
      },
      ...dataSiteTrending,
      ...dataSiteMobile,
      ...dataSitePc,
      ...dataSiteApps,
      ...dataSiteVoucher,
    ];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
      },
    ];
  }
}
