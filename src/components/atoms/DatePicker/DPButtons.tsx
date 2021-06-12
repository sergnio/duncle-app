import React, { PropsWithChildren } from "react";
import ComputerIcon from "@material-ui/icons/Computer";
import GroupIcon from "@material-ui/icons/Group";
import PhoneForwardedIcon from "@material-ui/icons/PhoneForwarded";
import Button from "@material-ui/core/Button";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon/SvgIcon";
import useGlobalDatePicker from "./useGlobalDatePicker";
import {
  GlobalDatePickerContext,
  GlobalDatePickerProvider,
} from "../../../common/providers/GlobalDatePickerProvider";
import styled from "styled-components";
import GlobalDatePicker from "./GlobalDatePicker";
import { LastContactType } from "../../../model/newLibrary";

const Flex = styled.div`
  display: flex;
`;

interface Props {
  Icon: OverridableComponent<SvgIconTypeMap>;
  contactType: LastContactType;
}

/**
 * Slight overkill, but this makes sure the GlobalDatePickerProvider ALWAYS ships with
 * the icon buttons.
 * @param Icon the icon you want to display on the button
 * @param contactType see LastContactType
 */
const IconWrapper = ({ Icon, contactType }: Props) => {
  const { handleOpen } = useGlobalDatePicker();

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => handleOpen(contactType)}
        type="button"
      >
        <Icon />
      </Button>
    </>
  );
};

const ContactedByEmail = () => (
  <IconWrapper Icon={ComputerIcon} contactType="email" />
);
const ContactedInPerson = () => (
  <IconWrapper Icon={GroupIcon} contactType="inPerson" />
);
const ContactedByPhone = () => (
  <IconWrapper Icon={PhoneForwardedIcon} contactType="phone" />
);

export const ContactButtonsRow = () => (
  <Flex>
    <GlobalDatePicker />
    <ContactedByPhone />
    <ContactedByEmail />
    <ContactedInPerson />
  </Flex>
);
