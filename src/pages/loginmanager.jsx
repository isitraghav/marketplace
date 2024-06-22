import {
  Button,
  List,
  ListButton,
  ListInput,
  ListItem,
  LoginScreen,
  LoginScreenTitle,
  Page,
} from "framework7-react";
import React from "react";
import { supabase } from "../lib/supabase";

export default function loginManager() {
  const [loginScreenOpened, setLoginScreenOpened] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const signIn = async () => {
    await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    setLoginScreenOpened(false);
  };

  const signUp = async () => {
    try {
      await supabase.auth.signUp({
        email: email,
        password: password,
      });
    } catch (error) {
      console.log(error);
    }
    setLoginScreenOpened(false);
  };

  React.useEffect(() => {
    async function checkAuth() {
      if ((await supabase.auth.getUser()).data.user) {
        setLoginScreenOpened(false);
      }
    }
    checkAuth();
  });

  return (
    <>
      <LoginScreen
        className="demo-login-screen"
        opened={loginScreenOpened}
        onLoginScreenClosed={() => {
          setLoginScreenOpened(false);
        }}
      >
        <Page loginScreen>
          <LoginScreenTitle>marketplace</LoginScreenTitle>
          <List form>
            <ListInput
              label="Email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onInput={(e) => setEmail(e.target.value)}
            />
            <ListInput
              label="Password"
              type="password"
              placeholder="Your password"
              value={password}
              onInput={(e) => setPassword(e.target.value)}
            />
          </List>
          <List inset>
            <ListItem>
              <Button onClick={signIn}>Sign In</Button>
              <Button onClick={signUp}>Sign Up</Button>
            </ListItem>
          </List>
        </Page>
      </LoginScreen>
    </>
  );
}
