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
