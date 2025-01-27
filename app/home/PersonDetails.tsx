import { Person } from "@/types";
import { Avatar } from "@heroui/react";
import Link from "next/link";

export default function PersonDetails(props: Person) {
  function clickHandler() {
    //navigate(`${props.id}/txns`, { state: { id: props.id, name: props.name } });
    //router.push(`/app/home/${props.id}/txns`);
  }

  function GetAvatarChars(name: string): string {
    var res = "";
    var parts = name.split(" ");
    if (parts.length > 1) {
      res = parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
    } else {
      res = parts[0][0].toUpperCase();
    }

    return res;
  }

  function getTag(amount: number): string {
    if (amount === 0) {
      return "Settled, No dues found";
    } else if (amount > 0) {
      return "Owes you ₹" + amount + "/-";
    } else {
      return "you owe ₹" + Math.abs(amount) + "/-";
    }
  }

  return (
    <Link
      href={{
        pathname: `txns`,
        query: { personId: props.id },
      }}
      className="personDetailRoot"
      //onClick={clickHandler}
      role="button"
      tabIndex={0}
    >
      <div className="leftDiv">
        <Avatar size="lg" name={GetAvatarChars(props.name)}></Avatar>
        <div>
          <div className="Name" title={props.name}>
            {props.name.length > 21
              ? props.name.substring(0, 21) + "..."
              : props.name}
          </div>
          <div className="Tag">{getTag(props.dueAmount)}</div>
        </div>
      </div>
      <div className="rightDiv">
        {/* <IconButton onClick={editClickHandler}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={deleteClickHandler}>
          <DeleteOutlineIcon />
        </IconButton> */}
      </div>
    </Link>
  );
}
