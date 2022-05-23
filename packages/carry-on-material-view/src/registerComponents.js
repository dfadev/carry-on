import React from "react";
import { register } from "carry-on-store";
import { Box, Paper, Grid } from "@mui/material";
import TextField from "./TextField";
import CheckboxField from "./CheckboxField";
import ButtonField from "./ButtonField";
import IconButtonField from "./IconButtonField";
import CurrencyField from "./CurrencyField";
import SSNField from "./SSNField";
import EINField from "./EINField";
import PercentageField from "./PercentageField";
import PhoneField from "./PhoneField";
import ZipCodeField from "./ZipCodeField";
import SubmitButtonField from "./SubmitButtonField";
import ResetButtonField from "./ResetButtonField";
import SelectField from "./SelectField";
import RadioField from "./RadioField";
import SwitchField from "./SwitchField";
import ToggleButtonGroupField from "./ToggleButtonGroupField";
import ContentField from "./ContentField";
import InspectorField from "./InspectorField";
import DateField from "./DateField";
import DobField from "./DobField";
import TimeField from "./TimeField";
import DateTimeField from "./DateTimeField";
import ListField from "./ListField";
import DataField from "./DataField";
import TabsField from "./TabsField";
import SubmitIconField from "./SubmitIconField";
import SubmitFabField from "./SubmitFabField";
import FabField from "./FabField";
import ImageField from "./ImageField";
import ButtonGroupField from "./ButtonGroupField";

function FormViewBox({ children }) {
  return (
    <Paper elevation={3}>
      <Box m={1} p={1}>
        {children}
      </Box>
    </Paper>
  );
}

function SectionBox({ section, children, ...props }) {
  return <Box {...props}>{children}</Box>;
}

function View({ children, ...props }) {
  return (
    <Grid {...props} container>
      {children}
    </Grid>
  );
}

function ViewItem({ children, field, ...props }) {
  return (
    <Grid {...props} item>
      <Box mb={1} p={1}>
        {children}
      </Box>
    </Grid>
  );
}

export const materialViewComponents = {
  components: {
    FormViewBox,
    SectionBox,
    View,
    ViewItem,
    editors: {
      button: ButtonField,
      buttonGroup: ButtonGroupField,
      checkbox: CheckboxField,
      content: ContentField,
      currency: CurrencyField,
      data: DataField,
      date: DateField,
      dateTime: DateTimeField,
      dob: DobField,
      ein: EINField,
      fab: FabField,
      iconButton: IconButtonField,
      image: ImageField,
      inspector: InspectorField,
      list: ListField,
      percentage: PercentageField,
      phone: PhoneField,
      radio: RadioField,
      reset: ResetButtonField,
      select: SelectField,
      ssn: SSNField,
      submit: SubmitButtonField,
      submitFab: SubmitFabField,
      submitIcon: SubmitIconField,
      switch: SwitchField,
      tabs: TabsField,
      text: TextField,
      time: TimeField,
      toggleButtonGroup: ToggleButtonGroupField,
      zipCode: ZipCodeField
    }
  }
};

function registerComponents(...args) {
  register({ state: materialViewComponents }, ...args);
}

export default registerComponents;
