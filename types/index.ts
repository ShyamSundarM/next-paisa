import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type LoginResponse = {
  token: string;
  expiresIn: string;
};

export type Person = {
  id: number;
  name: string;
  dueAmount: number;
  lends: number;
  debts: number;
};

export type Txn = {
  id: number;
  personId: number;
  amount: number;
  date: string;
  txnDirection: 1 | 0;
  reason: string;
  txnReference?: string;
  isSettled: boolean;
  txnParentId?: number;
  children?: Txn[];
};
