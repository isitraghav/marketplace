import React from "react";
import { Block, Navbar, Page } from "framework7-react";

export default function HomePage() {
  return (
    <Page name="home">
      <Navbar title="Home" />
      <Block>
        <p>Home tab</p>
      </Block>
    </Page>
  );
}

