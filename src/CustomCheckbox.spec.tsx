import { render, fireEvent } from "@testing-library/react";
import CustomCheckbox from "./CustomCheckbox";

describe("CustomCheckbox", () => {
  // it("should render the label correctly", () => {
  //   const { getByText } = render(
  //     <CustomCheckbox label="Test Label" checked={false} onChange={() => {}} />
  //   );
  //   expect(getByText("Test Label")).toBeInTheDocument();
  // });

  it("should call the onChange function when clicked", () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <CustomCheckbox label="" checked={false} onChange={handleChange} />
    );
    fireEvent.click(getByRole("checkbox"));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("should be checked when the checked prop is true", () => {
    const { getByRole } = render(
      <CustomCheckbox label="Test Label" checked={true} onChange={() => {}} />
    );
    expect(getByRole("checkbox")).toBeChecked();
  });
});
