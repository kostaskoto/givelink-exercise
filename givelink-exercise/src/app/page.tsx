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
        <p>hello world</p>
        {data && (
          <pre>
            {JSON.stringify(
              Object.values(data.products).filter((product: any) => product.active),
              null,
              2
            )}
          </pre>
        )}
      </main>
    </div>
  );
}
