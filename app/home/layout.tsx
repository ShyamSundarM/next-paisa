"use client";

import { Person } from "@/types";
import AppBar from "./AppBar";
import Chart from "./Chart";
import useApi from "@/hooks/useApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import store, { RootState } from "@/redux/store";
import { peopleSliceActions } from "@/redux/PeopleSlice";
import { useSelector } from "react-redux";
import "./styles.css";
import People from "./People";

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const peopleApi = useApi<Array<Person>>({
    url: "people/all",
    method: "GET",
  });

  useEffect(() => {
    callApi();
    async function callApi() {
      const resp = await peopleApi.executeAsync();
      if (resp.status === 200) {
        console.log(resp.data);
        store.dispatch(peopleSliceActions.Set(resp.data));
      } else {
        toast.error("Network error");
      }
    }
  }, []);

  const people = useSelector((state: RootState) => state.people.data);

  return (
    <div className="homeLayoutRoot flex flex-col">
      <AppBar />
      <div className="homeContent">
        <div className="chartContainer">
          <Chart people={people} />
        </div>
        <div className="peopleContainer">
          <People people={people} isLoading={peopleApi.loading} />
        </div>
      </div>
    </div>
  );
}
