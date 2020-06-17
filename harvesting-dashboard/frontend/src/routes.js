import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import DefaultLayout from "./layouts/Default";

// Route Views
import PorkStats from "./views/PorkStats";
import EuropePorkStats from "./views/EuropePorkStats";
import TrigoStats from "./views/TrigoStats";
import CebadaStats from "./views/CebadaStats";
import MaizStats from "./views/MaizStats";
import ArrozStats from "./views/ArrozStats";
import HistoricPork from "./views/HistoricPork";
import HistoricCereal from "./views/HistoricCereal";
import Errors from "./views/Errors";

//TODO: maybe depending on user
export default () => {
      return [
        {
          path: "/",
          exact: true,
          layout: DefaultLayout,
          component: () => <Redirect to="/porkStats" />
        },
        {
          path: "/porkStats",
          layout: DefaultLayout,
          component: PorkStats
        },
        {
          path: "/europePork",
          layout: DefaultLayout,
          component: EuropePorkStats
        },
        {
          path: "/historicPork",
          layout: DefaultLayout,
          component: HistoricPork
        },
        {
          path: "/trigo",
          layout: DefaultLayout,
          component: TrigoStats
        },
        {
          path: "/cebada",
          layout: DefaultLayout,
          component: CebadaStats
        },
        {
          path: "/arroz",
          layout: DefaultLayout,
          component: ArrozStats
        },
        {
          path: "/maiz",
          layout: DefaultLayout,
          component: MaizStats
        },
        {
          path: "/historicCereal",
          layout: DefaultLayout,
          component: HistoricCereal
        },
        {
          layout: DefaultLayout,
          component: Errors
        }
      ];

}
