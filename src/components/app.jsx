import React, { useState, useEffect } from "react";
import { getDevice } from "framework7/lite-bundle";
import { f7, f7ready, App, Views, View, Toolbar, Link } from "framework7-react";

import capacitorApp from "../js/capacitor-app";
import routes from "../js/routes";
import store from "../js/store";

const MyApp = () => {
  const device = getDevice();
  // Framework7 Parameters
  const f7params = {
    name: "marketplace", // App name
    theme: "ios", // Automatic theme detection
    colors: {
      primary: "#007aff",
    },
    darkMode: true,

    // App store
    store: store,
    // App routes
    routes: routes,

    // Input settings
    input: {
      scrollIntoViewOnFocus: device.capacitor,
      scrollIntoViewCentered: device.capacitor,
    },
    // Capacitor Statusbar settings
    statusbar: {
      iosOverlaysWebView: true,
      androidOverlaysWebView: false,
    },
  };

  f7ready(() => {
    // Init capacitor APIs (see capacitor-app.js)
    if (f7.device.capacitor) {
      capacitorApp.init(f7);
    }
    // Call F7 APIs here
  });

  return (
    <App {...f7params}>
      <Views tabs className="safe-areas">
        <Toolbar tabbar icons bottom>
          <Link tabLink="#view-home" tabLinkActive>
            <i className="bx bx-home bx-sm"></i>
          </Link>
          <Link tabLink="#view-search">
            <i className="bx bx-search bx-sm"></i>
          </Link>
          <Link tabLink="#view-messaging">
            <i className="bx bx-message-square-dots bx-sm"></i>
          </Link>
          <Link tabLink="#view-profile">
            <i className="bx bx-user bx-sm"></i>
          </Link>
        </Toolbar>
        <View id="view-home" main tab tabActive url="/" />
        <View id="view-search" name="view-search" main tab url="/search" />
        <View id="view-messaging" name="view-messaging" tab url="/messaging" />
        <View id="view-profile" name="view-profile" tab url="/profile" />
      </Views>
    </App>
  );
};
export default MyApp;
