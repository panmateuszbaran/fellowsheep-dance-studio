import { StyledButton } from "./styles";
import { ButtonProps } from "../types";

export const Button = ({ color, children, style, onClick }: ButtonProps) => (
  <StyledButton color={color} style={style} onClick={onClick}>
    {children}
  </StyledButton>
);
