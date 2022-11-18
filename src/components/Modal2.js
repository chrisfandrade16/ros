import Button from "components/Button";

const Modal2 = (props) => {
  const {
    title = "",
    onClose,
    renderBody = () => { },
    renderFooter = () => { }
  } = props;

  return (
    <>
      <div className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-bg-[rgba(0,0,0,0.6)]"></div>
      <div className="tw-border-[2px] tw-border-solid tw-border-[#CBD5E1] tw-px-[20px] tw-rounded-sm tw-bg-[#272838] tw-fixed tw-top-2/4 tw-left-2/4 tw-translate-x-[-50%] tw-translate-y-[-50%]">
        <div className="tw-gap-[20px] tw-flex tw-flex-row tw-items-center tw-justify-between tw-pt-[18px] tw-pb-[12px] tw-border-b-[2px] tw-border-solid tw-border-[#CBD5E1]">
          <div className="tw-text-lg">{title}</div>
          {onClose ? (
            <Button
              className="tw-w-[32px] tw-h-[32px]"
              color="red"
              content={"X"}
              onClick={onClose}
            />
          ) : null}
        </div>
        <div className="tw-flex tw-py-[20px]">{renderBody()}</div>
        <div className="tw-flex tw-py-[20px]">{
          <div className="tw-flex tw-flex-row tw-justify-end tw-gap-[20px] tw-pt-[12px] tw-pb-[18px] tw-border-t-[2px] tw-border-solid tw-border-[#CBD5E1]">
            {renderFooter()}
          </div>
        }</div>
      </div>
    </>
  );
};

export default Modal2;
