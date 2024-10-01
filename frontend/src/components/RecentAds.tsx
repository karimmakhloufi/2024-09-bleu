import { useState } from "react";
import AdCard, { AdCardProps } from "./AdCard";

const RecentAds = () => {
  const adsData: AdCardProps[] = [
    {
      img_url: "/images/table.webp",
      title: "Table",
      link: "/ads/table",
      price: 120,
    },
    {
      img_url: "/images/bougie.webp",
      title: "Bougie",
      link: "/ads/bougie",
      price: 3,
    },
    {
      img_url: "/images/dame-jeanne.webp",
      title: "Dame-jeanne",
      link: "/ads/dame-jeanne",
      price: 30,
    },
    {
      img_url: "/images/porte-magazine.webp",
      title: "Porte-magazine",
      link: "/ads/porte-magazine",
      price: 20,
    },
    {
      img_url: "/images/vaisselier.webp",
      title: "Vaisselier",
      link: "/ads/vaisselier",
      price: 300,
    },
    {
      img_url: "/images/vide-poche.webp",
      title: "Vide-poche",
      link: "/ads/vide-poche",
      price: 5,
    },
  ];
  const [total, setTotal] = useState(0);
  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Total: {total} €</p>
      <section className="recent-ads">
        {adsData.map((el) => (
          <div>
            <AdCard
              key={el.title}
              title={el.title}
              img_url={el.img_url}
              link={el.link}
              price={el.price}
            />
            <button
              onClick={() => {
                setTotal(total + el.price);
              }}
            >
              Add to total
            </button>
          </div>
        ))}
      </section>
    </>
  );
};

export default RecentAds;
