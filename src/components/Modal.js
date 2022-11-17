import * as constants from "utils/constants";
import Navigator from "components/Navigatior";
import { storage } from "utils/storage";
import { useState } from "react";
import Button from "components/Button";
import edit_pencil from "images/image_edit_pencil.png";

const Modal = (props) => {
  const {
    title = "",
    onClose,
    onConfirm,
    onReset,
    renderBody = () => {},
  } = props;

  return (
    <>
      <div className="modal-backdrop"></div>
      <div className="modal tw-px[10px] tw-rounded-sm">
        <div className="tw-flex tw-flex-row tw-justify-between tw-py-[10px] tw-border-b-[2px] tw-border-solid tw-border-[#CBD5E1]">
          <div className="tw-text-lg">{title}</div>
          {onClose ? (
            <Button color="red" content={"X"} onClick={onClose} />
          ) : null}
        </div>
        <div className="tw-flex tw-px-[10px] tw-py-[20px]">{renderBody()}</div>
        {onReset || onConfirm ? (
          <div className="tw-flex tw-flex-row tw-ml-auto tw-py-[10px] tw-border-t-[2px] tw-border-solid tw-border-[#CBD5E1]">
            {onReset ? (
              <Button color="blue" content={"Reset"} onClick={onReset} />
            ) : null}
            {onConfirm ? (
              <Button color="blue" content={"Confirm"} onClick={onConfirm} />
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Modal;
