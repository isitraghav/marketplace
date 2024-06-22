import { uploadFile } from "@uploadcare/upload-client";
import {
  Block,
  Navbar,
  Page,
  Button,
  List,
  ListItem,
  ListInput,
  ListButton,
} from "framework7-react";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ProfilePage() {
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
      setImageSrc(`https://ucarecdn.com/${result.uuid}/-/preview/500x500/`);
      console.log(imageSrc);
    }
  };

  return (
    <Page name="profile">
      <Navbar title="Profile" />
      <Block strong className="flex flex-col justify-center items-center">
        <label
          htmlFor="file"
          className="flex justify-center items-center"
        >
          <img
            src={
              imageSrc ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2V3ynaT18VgjH2uGddnhnQQaa_OT6nzEOtw&s"
            }
            width="100"
            className={`${imageSrc ? "" : "grayscale"} rounded-full`}
          />
        </label>
        {progress > 0 && <progress value={progress} max="100" />}
        <input
          id="file"
          type="file"
          onChange={handleImageFile}
          accept="image/*"
          hidden
        />
      </Block>
      <List>
        <ListInput
          label="First Name"
          type="text"
          placeholder="Your first name"
        />
        <ListInput label="Last Name" type="text" placeholder="Your last name" />
        <ListInput label="Email" type="email" placeholder="Your email" />
        <ListInput
          label="Password"
          type="password"
          placeholder="Your password"
        />
        <ListButton title="Update Profile" />
      </List>
    </Page>
  );
}
