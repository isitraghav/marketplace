import React, { useState, useEffect } from "react";
import { getDevice } from "framework7/lite-bundle";
import { f7, f7ready, App, Views, View, Toolbar, Link } from "framework7-react";

import capacitorApp from "../js/capacitor-app";
import routes from "../js/routes";
import store from "../js/store";
import LoginManager from "../pages/loginmanager";
import "../css/app.css";

const MyApp = () => {
  const device = getDevice();
  const f7params = {
    name: "marketplace",
    theme: "ios",
    colors: {
      primary: "#007aff",
    },
    darkMode: true,
    store: store,
    routes: routes,
    input: {
      scrollIntoViewOnFocus: device.capacitor,
      scrollIntoViewCentered: device.capacitor,
    },
    statusbar: {
      iosOverlaysWebView: true,
      androidOverlaysWebView: false,
    },
  };

  f7ready(() => {
    if (f7.device.capacitor) {
      capacitorApp.init(f7);
    }
  });

  return (
    <App {...f7params}>
      <Views tabs className="safe-areas">
        <LoginManager />
        <Toolbar tabbar icons bottom>
          <Link tabLink="#view-home" tabLinkActive>
            <i className="bx bx-home bx-sm"></i>
          </Link>
          <Link tabLink="#view-search">
            <i className="bx bx-search bx-sm"></i>
          </Link>
          <Link tabLink="#view-create">
            <i className="bx bx-plus bx-sm"></i>
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
        <View id="view-create" name="view-create" main tab url="/create" />
        <View id="view-messaging" name="view-messaging" tab url="/messaging" />
        <View id="view-profile" name="view-profile" tab url="/profile" />
      </Views>
    </App>
  );
};
export default MyApp;
