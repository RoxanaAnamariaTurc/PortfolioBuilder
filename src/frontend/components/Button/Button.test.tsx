import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import Button from "./Button";
import { theme, MyTheme } from "../../../theme";
import { screen } from "@testing-library/react";

describe("Button", () => {
  const mockOnClick = jest.fn();
  it("renders without crashing", () => {
    const { getByRole } = render(
      <ThemeProvider theme={theme as MyTheme}>
        <Button>Test Button</Button>
      </ThemeProvider>
    );

    expect(getByRole("button")).toBeInTheDocument();
  });

  it("handles on click event", () => {
    render(
      <ThemeProvider theme={theme as MyTheme}>
        <Button onClick={mockOnClick}>Click Me</Button>
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText("Click Me"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("applies the styles from props", () => {
    render(
      <ThemeProvider theme={theme as MyTheme}>
        <Button
          color="primary"
          backgroundColor="transparent"
          fontSize="small"
          padding="xsmall"
          margin="small"
          borderRadius="medium"
        >
          Custom Styles Button
        </Button>
      </ThemeProvider>
    );

    const button = screen.getByText("Custom Styles Button");
    expect(button).toHaveStyle(`color: ${theme.colors.primary}`);
    expect(button).toHaveStyle(`font-size: ${theme.sizes.small}`);
    expect(button).toHaveStyle(`padding: ${theme.sizes.xsmall}`);
  });
});
