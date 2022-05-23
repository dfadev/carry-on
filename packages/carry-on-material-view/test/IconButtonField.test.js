/**
 * @jest-environment jsdom
 */
import React from "react";
import { initStores } from "carry-on-store";
import { render } from "@testing-library/react";
import { Paper, Box, Grid } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import { Store, Register } from "carry-on-react";
import { Form } from "carry-on-react-forms";
import {
  FormView,
  Fields,
  Field,
  Sections,
  Section
} from "carry-on-react-view";
import { materialViewComponents } from "../src/registerComponents";
import IconButtonField from "../src/IconButtonField";

beforeEach(() => {
  initStores();
});

it("should render <IconButtonField> inside a Form", () => {
  expect(
    render(
      <Store id={"iconButtonFieldForm"}>
        <Form>
          <Paper>
            <Box px={3} pt={2} pb={3} mb={2}>
              <Grid container>
                <Grid item>
                  <IconButtonField name="play" label={<PlayArrowIcon />} />
                </Grid>
                <Grid item>
                  <IconButtonField name="pause" label={<PauseIcon />} />
                </Grid>
                <Grid item>
                  <IconButtonField name="stop" label={<StopIcon />} />
                </Grid>
                <Grid item>
                  <IconButtonField
                    name="fastRewind"
                    label={<FastRewindIcon />}
                  />
                </Grid>
                <Grid item>
                  <IconButtonField name="fastFwd" label={<FastForwardIcon />} />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Form>
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});

it("should render <IconButtonField> inside a FormView", () => {
  expect(
    render(
      <Store id={"iconButtonFieldFormView"}>
        <FormView>
          <Register>{materialViewComponents}</Register>
          <Fields>
            <Field name="play" label={<PlayArrowIcon />} editor="iconButton" />
            <Field name="pause" label={<PauseIcon />} editor="iconButton" />
            <Field name="stop" label={<StopIcon />} editor="iconButton" />
            <Field
              name="fastRewind"
              label={<FastRewindIcon />}
              editor="iconButton"
            />
            <Field
              name="fastFwd"
              label={<FastForwardIcon />}
              editor="iconButton"
            />
          </Fields>
          <Sections>
            <Section>
              {["play", "pause", "stop", "fastRewind", "fastFwd"]}
            </Section>
          </Sections>
        </FormView>
      </Store>
    ).asFragment()
  ).toMatchSnapshot();
});
