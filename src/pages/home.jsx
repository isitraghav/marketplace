import React, { useEffect, useState } from "react";
import { Block, Button, Navbar, Page } from "framework7-react";
import { getFeed } from "../lib/api";
import Card from "../components/Card";

export default function HomePage() {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(0);
  const [mode, setMode] = useState("compact");
  const [showpreloader, setShowPreloader] = useState(true);

  const loadMore = async () => {
    const data = await getFeed(page, page + 5);
    if (data.length == 0) {
      setShowPreloader(false);
    }
    setFeed((prevFeed) => [...prevFeed, ...data]);
    setPage((prevPage) => prevPage + 5);
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <Page
      name="home"
      infinite
      infiniteDistance={50}
      onInfinite={loadMore}
      infinitePreloader={showpreloader}
    >
      <Navbar title="Marketplace" />
      <div className="flex justify-start items-center">
        <Button
          onClick={() =>
            setMode((prevMode) => (prevMode === "compact" ? "full" : "compact"))
          }
        >
          View: {mode}
        </Button>
      </div>
      <div>
        {feed.map((post) => (
          <Card
            key={post.id}
            mode={mode}
            title={post.name}
            price={post.price}
            content={post.description}
            image={post.images[0]}
          />
        ))}
      </div>
    </Page>
  );
}
