"use client";

import { Person } from "@/types";
import Chart from "./Chart";
import useApi from "@/hooks/useApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import store, { RootState } from "@/redux/store";
import { peopleSliceActions } from "@/redux/PeopleSlice";
import { useSelector } from "react-redux";
import "./styles.css";
import People from "./People";
import { CircularProgress } from "@heroui/react";
import { commonSliceActions } from "@/redux/CommonSlice";

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const peopleApi = useApi<Array<Person>>({
    url: "people/all",
    method: "GET",
  });

  const peopleRefresh = useSelector(
    (state: RootState) => state.common.triggerPeopleRefresh
  );

  async function callApi() {
    const resp = await peopleApi.executeAsync();
    if (resp.status === 200) {
      console.log(resp.data);
      store.dispatch(peopleSliceActions.Set(resp.data));
    } else {
      toast.error("Network error");
    }
  }

  useEffect(() => {
    callApi();
  }, []);

  //listen for refresh
  useEffect(() => {
    if (peopleRefresh) {
      callApi();
      store.dispatch(commonSliceActions.setPeopleRefresh(false));
    }
  }, [peopleRefresh]);

  const people = useSelector((state: RootState) => state.people.data);

  return (
    <div className="homeLayoutRoot flex flex-col">
      {peopleApi.loading ? (
        <div className="loadingContainer">
          <CircularProgress label="Loading..." />
        </div>
      ) : (
        <div className="homeContent">
          <div className="chartContainer">
            <Chart people={people} />
          </div>
          <div className="peopleContainer">
            <People people={people} isLoading={peopleApi.loading} />
          </div>
        </div>
      )}
    </div>
  );
}
