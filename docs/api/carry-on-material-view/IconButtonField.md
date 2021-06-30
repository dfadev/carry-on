---
id: IconButtonField
title: IconButtonField
---

```js live
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
            <IconButtonField name="fastRewind" label={<FastRewindIcon />} />
          </Grid>
          <Grid item>
            <IconButtonField name="fastFwd" label={<FastForwardIcon />} />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  </Form>
  <StateInspector />
</Store>
```

```js live
<Store id={"iconButtonFieldFormView"}>
  <FormView>
    <Register>{materialViewComponents}</Register>
    <Fields>
      <Field name="play" label={<PlayArrowIcon />} editor="iconButton" />
      <Field name="pause" label={<PauseIcon />} editor="iconButton" />
      <Field name="stop" label={<StopIcon />} editor="iconButton" />
      <Field name="fastRewind" label={<FastRewindIcon />} editor="iconButton" />
      <Field name="fastFwd" label={<FastForwardIcon />} editor="iconButton" />
    </Fields>
    <Sections>
      <Section>{["play", "pause", "stop", "fastRewind", "fastFwd"]}</Section>
    </Sections>
  </FormView>
  <StateInspector />
</Store>
```
