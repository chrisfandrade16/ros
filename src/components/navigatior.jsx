const Navigator = (props) => {
    const {
        tabs = [], // [ { text: string, onClick: function } ... ]
        activeTab = null, // index of tab in tabs
        activeTabStyle = "highlight-tab", // "highlight-tab" -> active tab is highlighted, "pointer-tab" -> active tab has bottom pointer
        height = "small-tab-height", // "small-tab-height" -> height is 8px, "big-tab-height" -> height is 16px
    } = props;

    return (
        <div className={`row spaced full-border`}>
            {tabs.map((tab, index) => {
                return (
                    <div className={`tab ${height} ${activeTab === index ? `active ${activeTabStyle}` : ""}`} onClick={tab.onClick}>{tab.text}</div>
                )
            })}
        </div>
    )
};

export default Navigator;
