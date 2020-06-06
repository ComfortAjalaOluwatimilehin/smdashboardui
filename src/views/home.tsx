import { observer } from "mobx-react-lite";
import React from "react";
import { RouteComponentProps } from "react-router";
import { ReadStats } from "./stats/readstats";
export interface IHome extends RouteComponentProps {}
export const Home: React.FC<IHome> = observer((props) => {
  return (
    <>
      <ReadStats />
    </>
  );
});
