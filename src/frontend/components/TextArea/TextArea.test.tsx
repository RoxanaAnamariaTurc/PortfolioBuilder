import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import TextArea from "./TextArea";

describe("TextArea component", () => {
  it("renders a textarea element", () => {
    render(
      <ThemeProvider theme={{}}>
        <TextArea limit={100} value="" onChange={() => {}} name="description" />
      </ThemeProvider>
    );
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
  });
  it("renders the correct number of words remaining", () => {
    render(
      <ThemeProvider theme={{}}>
        <TextArea
          limit={100}
          value="Hello world"
          onChange={() => {}}
          name="description"
        />
      </ThemeProvider>
    );
    const wordsRemaining = screen.getByText("Words remaining: 98");
    expect(wordsRemaining).toBeInTheDocument();
  });
  it("displays a message when the limit is exceeded", async () => {
    render(
      <ThemeProvider theme={{}}>
        <TextArea
          limit={5}
          value="Hello from this world mate"
          onChange={() => {}}
          name="description"
        />
      </ThemeProvider>
    );
    const limitExceeded = await screen.findByText(
      "You have exceeded the limit!"
    );
    expect(limitExceeded).toBeInTheDocument();
  });
});
