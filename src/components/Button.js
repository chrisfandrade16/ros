import * as constants from "utils/constants";

const Button = (props) => {
  const {
    content = "",
    onClick = () => {},
    color = "blue",
    disabled = false,
  } = props;

  return (
    <button
      className={`tw-flex tw-flex-row tw-justify-center tw-items-center tw-rounded tw-border-[2px] tw-border-solid tw-border-[#CBD5E1] tw-px-[8px] tw-duration-200 ${
        disabled
          ? "!tw-cursor-not-allowed tw-border-[#7e7f9a] tw-text-[#7e7f9a]"
          : color === "blue"
          ? "hover:tw-border-[#90ddf0] hover:tw-text-[#90ddf0]"
          : color === "red"
          ? "hover:tw-border-[#eb9486] hover:tw-text-[#eb9486]"
          : color === "green"
          ? "hover:tw-border-[#9ed8db] hover:tw-text-[#9ed8db]"
          : ""
      }}
      onClick={disabled ? () => {} : onClick}
    >
      {content}
    </button>
  );
};

export default Button;
