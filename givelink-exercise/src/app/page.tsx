// Add "use client" to mark this as a Client Component
"use client";

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

const fetchData = async () => {
  try {
    const response = await axios.get("https://be.givelink.app/data");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result);
    };
    getData();
  }, []);

  return (

    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Products</h1>
        {data && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Object.values(data.products)
              .filter((product: any) => product.active)
              .map((product: any) => (
              <div key={product.id} className="card hover:bg-sky-700 rounded-lg max-w-[250px]">
              <Image
              src={`https://be.givelink.app/images/products/${product.imagePath}`}
              alt={product.name}
              width={250}
              height={250}
              className="card-image rounded-t-lg"
              />
              <div className="card-content rounded-b-lg p-4">
                <h2 className="card-title">{product.name}</h2>
                <p className="card-price">{product.price.toFixed(2)}€</p>
              </div>
              </div>
              ))}
            </div>
        )}
      </main>
    </div>
  );
}
