import * as constants from "utils/constants";
import Navigator from "components/Navigatior";
import { storage } from "utils/storage";
import { useState } from "react";
import Button from "components/Button";
import edit_pencil from "images/image_edit_pencil.png";

const Input = (props) => {
  const {
    value = "",
    onChange = () => {},
    onBlur = () => {},
    hasError = false,
    errorMessage = "",
    className = "",
    type = "search",
  } = props;

  return (
    <div className="tw-flex tw-flex-col tw-gap-[8px]">
      <input
        value={value}
        onChange={(event) => {
          return onChange(event.target.value);
        }}
        onBlur={onBlur}
        type={type}
        className={`text-center tw-px-[8px] tw-py-[4px] tw-text-ellipsis focus:tw-rounded focus:tw-border-[2px] focus:tw-border-solid focus:tw-border-[#90ddf0] tw-border-[2px] tw-border-transparent focus:tw-outline-none tw-shadow-none tw-bg-transparent tw-border-b-solid tw-border-b-[#CBD5E1] hover:tw-border-b-[#90ddf0] tw-duration-200 ${
          hasError
            ? "tw-border-b-[#eb9486] hover:tw-border-b-[#eb9486] focus:tw-border-[#eb9486]"
            : ""
        } ${className}`}
      />
      {hasError ? (
        <div className="tw-text-xs tw-text-[#eb9486]">{errorMessage}</div>
      ) : null}
    </div>
  );
};

export default Input;
