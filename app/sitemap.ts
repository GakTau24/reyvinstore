type Data = {
  slug: string;
  image: string;
  title: string;
  price: string;
};

async function getData(): Promise<Data[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reyvinstore`
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
    const data: Data[] = await getData();

    const dataSite = data.map((item) => {
      return {
        url: `${baseUrl}/api/reyvinstore/${item.slug}`,
        lastModified: new Date(),
        title: item.title,
      };
    });

    const dataPrice = data.map((item) => {
      return {
        url: `${baseUrl}/api/reyvinstore/${item.slug}`,
        lastModified: new Date(),
        price: item.price,
      };
    });

    const dataImage = data.map((item) => {
      return {
        url: item.image,
        lastModified: new Date(),
        title: item.title,
        price: item.price,
      };
    });

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
      },
      ...dataSite,
      ...dataPrice,
      ...dataImage,
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
