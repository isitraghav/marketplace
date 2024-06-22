import {
  Block,
  Button,
  Navbar,
  Page,
  Searchbar,
  Subnavbar,
} from "framework7-react";
import { useState } from "react";
import { searchQuery } from "../lib/api";
import Card from "../components/Card";

export default function Search() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("Search for products");

  const search = async () => {
    if (query.match(/[^a-zA-Z0-9\s]/)) {
      setMessage("Please enter a valid search query");
      return;
    }
    if (query.length < 3) {
      setMessage("Please enter at least 3 characters");
      return;
    }
    try {
      const data = await searchQuery(query);
      setProducts(data);
      if (data.length == 0) {
        setMessage("No products found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Page>
      <Navbar title="Search">
        <Subnavbar inner={false}>
          <Searchbar onChange={handleSearchChange} />{" "}
          <Button onClick={search}>
            <i className="bx bx-search bx-sm"></i>
          </Button>
        </Subnavbar>
      </Navbar>
      {products.map((post) => (
        <div key={post.id}>
          {post && (
            <Card
              mode={"compact"}
              title={post.name}
              price={post.price}
              content={post.description}
              image={post.images && post.images[0]}
            />
          )}
        </div>
      ))}

      {products.length == 0 && (
        <div className="text-md text-center mt-3">{message}</div>
      )}
    </Page>
  );
}
