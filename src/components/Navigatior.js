import * as constants from "utils/constants";

const Navigator = (props) => {
  const {
    tabs = [],
    activeTab = null,
    activePointerTab = false,
    activeNextTab = false,
    useTextAsId = false,
    lowlightTabs = [],
  } = props;

  return (
    <div
      className={`tw-flex tw-flex-row tw-justify-between tw-rounded tw-border-[2px] tw-border-solid tw-border-[#CBD5E1] tw-mb-[20px] tw-select-none`}
    >
      {tabs.map((tab, index) => {
        const {
          getIsDisabled = constants.EMPTY_FUNCTION,
          onClick = constants.EMPTY_FUNCTION,
          text = constants.EMPTY_STRING,
        } = tab;
        const isTabActive = useTextAsId
          ? activeTab === text
          : activeTab === index;
        const isLastTab = index === tabs.length - 1;
        return (
          <div
            key={tab + index}
            className={`tw-relative tw-flex-1 tw-text-center tw-duration-300 ${
              lowlightTabs.length && lowlightTabs.includes(text)
                ? "tw-bg-[#40425f]"
                : ""
            } ${
              isTabActive
                ? `!tw-bg-white tw-text-black ${
                    activePointerTab ? "pointer-tab" : ""
                  } ${activeNextTab && !isLastTab ? "next-tab" : ""}`
                : ""
            } ${
              getIsDisabled()
                ? "tw-cursor-not-allowed tw-text-[#7e7f9a]"
                : "tw-cursor-pointer hover:tw-bg-[#7e7f9a]"
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
