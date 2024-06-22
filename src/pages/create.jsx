import React, { useState } from "react";
import {
  Page,
  Navbar,
  Button,
  Card,
  CardContent,
  Input,
  Progressbar,
} from "framework7-react";
import { uploadFile } from "@uploadcare/upload-client";
import { supabase } from "../lib/supabase";
import { listItem } from "../lib/api";

export default function CreatePage() {
  const [imageSrc, setImageSrc] = useState("");

  const [progress, setprogress] = useState(0);

  const onProgress = ({ isComputable, value }) => {
    setprogress(value * 100);
    if (value === 1) {
      setprogress(0);
    }
  };

  const handleImageFile = async (e) => {
    const file = e.target.files[0];
    if (file && file.size < 4 * 1024 * 1024) {
      const result = await uploadFile(file, {
        onProgress: onProgress,
        publicKey: "9d1e1dc04a8bdbcddd4c",
        store: "auto",
        metadata: {
          id: (await supabase.auth.getUser()).data.user.id,
        },
      });
      setImageSrc(result.uuid);
      console.log(imageSrc);
      setMessage("");
    }
  };

  const [title, setTitle] = useState("Title");
  const [content, setContent] = useState("Content");
  const [price, setPrice] = useState(100);
  const [message, setMessage] = useState("");

  function publish() {
    const titleRegex = /^[a-zA-Z0-9\s]+$/;
    const contentRegex = /^[a-zA-Z0-9\s.]+$/;
    if (!titleRegex.test(title)) {
      setMessage(
        "Title should contain only alphanumeric characters and spaces"
      );
      return;
    }
    if (!contentRegex.test(content)) {
      setMessage(
        "Content should contain only alphanumeric characters, spaces, and periods"
      );
      return;
    }
    listItem(title, content, price, imageSrc);
    setImageSrc("");
    setTitle("Title");
    setContent("Content");
    setPrice(100);
    setMessage("Your product will be listed after review");
  }

  return (
    <Page name="create">
      <Navbar title="List Product" />
      <div className="flex flex-col">
        <div className="flex p-3">
          {!imageSrc && (
            <button className="bg-blue-800 w-32 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
              <label htmlFor="file">Upload Image</label>
            </button>
          )}
          <input
            id="file"
            type="file"
            onChange={handleImageFile}
            accept="image/*"
            hidden
          />
        </div>
        {progress > 0 && progress < 100 && (
          <Progressbar progress={progress} className="w-full" />
        )}
        {imageSrc && (
          <>
            <div className="flex justify-center">
              <Card outlineMd className="w-full">
                <CardContent className="flex">
                  <div>
                    <img
                      src={`https://ucarecdn.com/${imageSrc}/-/preview/500x500/`}
                      alt=""
                      className="h-20 w-24 aspect-square rounded-md object-cover object-center"
                    />
                  </div>
                  <div className="ml-2">
                    <input
                      className="w-full bg-transparent rounded-md text-xl"
                      placeholder="Title"
                      value={title}
                      onInput={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                      className="w-full bg-transparent rounded-md text-sm opacity-45"
                      placeholder={content}
                      onInput={(e) => setContent(e.target.value)}
                    />
                  </div>
                </CardContent>
                <div className="ml-3 pb-2 text-lg opacity-70">
                  <span className="flex gap-1">
                    ${" "}
                    <input
                      type="number"
                      className="w-full bg-transparent rounded-md text-sm"
                      value={price}
                      onInput={(e) => setPrice(parseInt(e.target.value))}
                    />
                  </span>
                </div>
              </Card>
            </div>
            <div className="pl-4 text-red-500 pb-2">{message}</div>
            <div className="flex justify-start pl-4">
              <Button tonal disabled={!imageSrc} rounded onClick={publish}>
                List Item
              </Button>
              <Button
                onClick={() => {
                  setImageSrc("");
                  setTitle("Title");
                  setContent("Content");
                  setPrice(100);
                  setMessage("");
                }}
                className="ml-auto mr-4 flex gap-2"
                color="red"
                rounded
              >
                <i className="bx bx-no-entry"></i> cancel
              </Button>
            </div>

            <div className="flex text-xs justify-start pl-5 pt-1 opacity-45">
              <p>
                your item will be reviewed and added to the marketplace,
                remember, inapriorate content will be removed and accounts will
                be banned
              </p>
            </div>
          </>
        )}
        {!imageSrc && <div className="pl-4 text-green-500 pb-2">{message}</div>}
      </div>
    </Page>
  );
}
