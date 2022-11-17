import * as constants from "utils/constants";
import Navigator from "components/Navigatior";
import { storage } from "utils/storage";
import { useState } from "react";
import Button from "components/Button";
import Modal from "components/Modal";
import edit_pencil from "images/image_edit_pencil.png";
import delete_trash from "images/image_delete_trash.png";
import Input from "components/Input";

const OwnerPage = (props) => {
  const [currentPageTab, setCurrentPageTab] = useState(
    constants.OWNER_PAGE_TABS.MENU_ITEMS
  );

  return (
    <div>
      <Navigator
        tabs={constants.OWNER_PAGE_TABS_CONFIGS(setCurrentPageTab)}
        activeTab={currentPageTab}
        activePointerTab={true}
      />
      {currentPageTab === constants.OWNER_PAGE_TABS.MENU_ITEMS ? (
        <OwnerPageMenu />
      ) : null}
    </div>
  );
};

const OwnerPageMenu = (props) => {
  const currentRestaurant = storage.restaurants[storage.currentRestaurant];

  const [editingItem, setEditingItem] = useState(null);

  console.log(editingItem);

  return (
    <div>
      {editingItem ? (
        <OwnerPageEditModal
          editingItem={editingItem}
          setEditingItem={setEditingItem}
        />
      ) : null}
      {Object.keys(currentRestaurant.restaurantMenu).map((category) => {
        return (
          <div className="tw-mb-[20px]">
            <div className="tw-text-2xl tw-underline tw-mb-[10px]">
              {category}
            </div>
            {currentRestaurant.restaurantMenu[category].map((item, index) => {
              return (
                <div className="tw-p-[20px] tw-flex tw-flex-row tw-rounded tw-border-[2px] tw-border-solid tw-border-[#CBD5E1] tw-gap-[15px] tw-mb-[15px]">
                  <img className="tw-w-[125px]" src={item.img}></img>
                  <div className="tw-flex tw-flex-col tw-gap-[3px]">
                    <div>Name: {item.name}</div>
                    <div>Description: {item.description}</div>
                    <div>Cost: ${item.cost}</div>
                  </div>
                  <div className="tw-ml-auto tw-self-center">
                    <Button
                      color="blue"
                      content={
                        <img
                          className="tw-w-[48px] tw-h-[48px] tw-brightness-0 tw-invert"
                          src={edit_pencil}
                        ></img>
                      }
                      onClick={() => {
                        setEditingItem({
                          ...item,
                          key: category,
                          category: category,
                          index: index,
                        });
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const OwnerPageEditModal = (props) => {
  const { editingItem, setEditingItem } = props;
  return (
    <Modal
      title="Edit Item"
      onClose={() => {
        setEditingItem(null);
      }}
      onReset={() => {
        setEditingItem({
          ...storage.restaurants[storage.currentRestaurant].restaurantMenu[
            editingItem.category
          ][editingItem.index],
          category: editingItem.category,
          index: editingItem.index,
        });
      }}
      onConfirm={() => {
        if (editingItem.category === editingItem.key) {
          storage.restaurants[storage.currentRestaurant].restaurantMenu[
            editingItem.category
          ][editingItem.index] = editingItem;
        } else if (
          storage.restaurants[storage.currentRestaurant].restaurantMenu[
            editingItem.category
          ]
        ) {
          storage.restaurants[storage.currentRestaurant].restaurantMenu[
            editingItem.category
          ].push(editingItem);
        } else {
          storage.restaurants[storage.currentRestaurant].restaurantMenu[
            editingItem.category
          ] = [editingItem];
        }
        setEditingItem(null);
      }}
      confirmDisabled={
        !editingItem.category ||
        !editingItem.name ||
        !editingItem.description ||
        !editingItem.cost
      }
      renderBody={() => {
        return (
          <div className="tw-flex tw-flex-row tw-gap-[30px] tw-items-center">
            <img
              className="tw-w-[150px] tw-h-[125px]"
              src={editingItem.img}
            ></img>
            <div className="tw-flex tw-flex-col tw-gap-[12px]">
              <Input
                value={editingItem.category}
                onChange={(value) => {
                  console.log(value);
                  setEditingItem({ ...editingItem, category: value });
                }}
                hasError={!editingItem.category}
                errorMessage={"Category cannot be empty"}
              />
              <Input
                value={editingItem.name}
                onChange={(value) => {
                  setEditingItem({ ...editingItem, name: value });
                }}
                hasError={!editingItem.name}
                errorMessage={"Name cannot be empty"}
              />
              <Input
                value={editingItem.description}
                onChange={(value) => {
                  setEditingItem({ ...editingItem, description: value });
                }}
                hasError={!editingItem.description}
                errorMessage={"Description cannot be empty"}
              />
              <Input
                value={editingItem.cost}
                onChange={(value) => {
                  setEditingItem({ ...editingItem, cost: value });
                }}
                hasError={!editingItem.cost}
                errorMessage={"Cost cannot be empty"}
              />
            </div>
            <div className="tw-ml-auto tw-self-center">
              <Button
                color="red"
                content={
                  <img
                    className="tw-w-[48px] tw-h-[48px] tw-brightness-0 tw-invert"
                    src={delete_trash}
                  ></img>
                }
                onClick={() => {
                  storage.restaurants[storage.currentRestaurant].restaurantMenu[
                    editingItem.key
                  ].splice(editingItem.index, 1);
                  setEditingItem(null);
                }}
              />
            </div>
          </div>
        );
      }}
    />
  );
};

export default OwnerPage;
