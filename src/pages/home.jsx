import React, { useEffect, useState } from "react";
import { Block, Button, Navbar, Page } from "framework7-react";
import { getFeed } from "../lib/api";
import Card from "../components/Card";
import { supabase } from "../lib/supabase";

export default function HomePage() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    getFeed().then((data) => {
      setFeed(data);
    });

    supabase.auth.getUser().then((user) => {
      console.log(user);
    });
  }, []);

  const refresh = async (done) => {
    const data = await getFeed();
    setFeed(data);
    done();
  };

  const [mode, setMode] = useState("compact");

  return (
    <Page name="home" ptr ptrMousewheel={true} onPtrRefresh={refresh}>
      <Navbar title="Marketplace" />
      <div className="flex justify-start items-center">
        <Button
          onClick={() => setMode(mode === "compact" ? "full" : "compact")}
        >
         View: {mode}
        </Button>
      </div>
      <div>
        {feed.map((post) => (
          <div key={post.id}>
            <Card
              mode={mode}
              title={post.name}
              price={post.price}
              content={post.description}
              image={post.images[0]}
            />
          </div>
        ))}
      </div>
    </Page>
  );
}
