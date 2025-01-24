import { Person } from "@/types";
import { divider } from "@heroui/react";
import PersonDetails from "./PersonDetails";

type Props = {
  people: Person[];
  isLoading: boolean;
};

export default function People(props: Props) {
  return (
    <div className="proot">
      <div className="p-title">People List</div>
      {props.people.length > 0 ? (
        props.people.map((p) => (
          <PersonDetails
            key={p.id}
            id={p.id}
            name={p.name}
            dueAmount={p.dueAmount}
            lends={p.lends}
            debts={p.debts}
          />
        ))
      ) : (
        <div>Hi There, add some people to the list by clicking on '+' sign</div>
      )}
    </div>
  );
}
