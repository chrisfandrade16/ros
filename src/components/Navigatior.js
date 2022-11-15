import * as constants from "utils/constants";

const Navigator = (props) => {
  const {
    tabs = [], // [ { text: string, onClick: function } ... ]
    activeTab = null, // index of tab in tabs
  } = props;

  return (
    <div
      className={`tw-flex tw-flex-row tw-justify-between tw-border-[1px] tw-border-solid tw-border-slate-300 tw-my-[20px] tw-mx-[30px]`}
    >
      {tabs.map((tab, index) => {
        const {
          getIsDisabled = constants.EMPTY_FUNCTION,
          onClick = constants.EMPTY_FUNCTION,
          text = constants.EMPTY_STRING,
        } = tab;
        return (
          <div
            className={`tw-flex-1 tw-text-center tw-duration-300  ${
              activeTab === index ? `!tw-bg-orange-200` : ""
            } ${
              getIsDisabled()
                ? "tw-cursor-not-allowed tw-text-slate-400"
                : "tw-cursor-pointer hover:tw-bg-slate-300"
            }`}
            onClick={!getIsDisabled() ? onClick : constants.EMPTY_FUNCTION}
          >
            {text}
          </div>
        );
      })}
    </div>
  );
};

export default Navigator;
