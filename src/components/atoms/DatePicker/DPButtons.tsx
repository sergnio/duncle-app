import React, { PropsWithChildren } from "react";
import ComputerIcon from "@material-ui/icons/Computer";
import GroupIcon from "@material-ui/icons/Group";
import PhoneForwardedIcon from "@material-ui/icons/PhoneForwarded";
import Button from "@material-ui/core/Button";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon/SvgIcon";
import useGlobalDatePicker from "./useGlobalDatePicker";
import styled from "styled-components";
import GlobalDatePicker from "./GlobalDatePicker";
import { LastContactType } from "../../../model/newLibrary";
import Tooltip from "@material-ui/core/Tooltip";

const Flex = styled.div`
  display: flex;
`;

interface Props {
  Icon: OverridableComponent<SvgIconTypeMap>;
  contactType: LastContactType;
  disabled: boolean;
}

/**
 * Slight overkill, but this makes sure the GlobalDatePickerProvider ALWAYS ships with
 * the icon buttons.
 * @param Icon the icon you want to display on the button
 * @param contactType see LastContactType
 */
const IconWrapper = ({ Icon, contactType, disabled }: Props) => {
  const { handleOpen } = useGlobalDatePicker();

  return (
    <Tooltip
      title={
        disabled
          ? "Please type a note first"
          : `Last contacted by: ${contactType}`
      }
    >
      <Button
        variant="outlined"
        onClick={() => handleOpen(contactType)}
        type="button"
        disabled={disabled}
      >
        <Icon />
      </Button>
    </Tooltip>
  );
};

interface ButtonProps {
  disabled: boolean;
}

const ContactedByEmail = ({ disabled }: ButtonProps) => (
  <IconWrapper disabled={disabled} Icon={ComputerIcon} contactType="email" />
);
const ContactedInPerson = ({ disabled }: ButtonProps) => (
  <IconWrapper disabled={disabled} Icon={GroupIcon} contactType="inPerson" />
);
const ContactedByPhone = ({ disabled }: ButtonProps) => (
  <IconWrapper
    disabled={disabled}
    Icon={PhoneForwardedIcon}
    contactType="phone"
  />
);

export const ContactButtonsRow = ({ disabled }: ButtonProps) => (
  <Flex>
    <GlobalDatePicker />
    <ContactedByPhone disabled={disabled} />
    <ContactedByEmail disabled={disabled} />
    <ContactedInPerson disabled={disabled} />
  </Flex>
);
