import React from "react";
import { Person } from "@/types";
import { Button, divider } from "@heroui/react";
import PersonDetails from "./PersonDetails";
import AddIcon from "@mui/icons-material/Add";
import store from "@/redux/store";
import { commonSliceActions } from "@/redux/CommonSlice";

type Props = {
  people: Person[];
  isLoading: boolean;
};

export default function People(props: Props) {
  function AddClickHandler() {
    store.dispatch(commonSliceActions.setAddPersonVisibility(true));
  }

  return (
    <>
      <div className="p-header flex flex-row justify-between">
        <div className="p-title">People List</div>
        <Button
          isIconOnly
          color="primary"
          onPress={AddClickHandler}
          variant="flat"
        >
          <AddIcon />
        </Button>
      </div>

      {props.people.length > 0 ? (
        <div className="peopleList">
          {props.people.map((p) => (
            <PersonDetails
              key={p.id}
              id={p.id}
              name={p.name}
              dueAmount={p.dueAmount}
              lends={p.lends}
              debts={p.debts}
            />
          ))}
        </div>
      ) : (
        <div>Hi There, add some people to the list by clicking on '+' sign</div>
      )}
    </>
  );
}
