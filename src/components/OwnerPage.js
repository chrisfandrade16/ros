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
      {currentPageTab === constants.OWNER_PAGE_TABS.CONTACT_INFO ? (
        <OwnerPageContact />
      ) : null}
      {currentPageTab === constants.OWNER_PAGE_TABS.ACCOUNT ? (
        <OwnerPageAccount />
      ) : null}
    </div>
  );
};

const OwnerPageMenu = (props) => {
  const currentRestaurant = storage.restaurants[storage.currentRestaurant];

  const [editingItem, setEditingItem] = useState(null);
  const [addingItem, setAddingItem] = useState(null);

  return (
    <div className="tw-flex tw-flex-col tw-gap-[20px]">
      {editingItem ? (
        <OwnerPageMenuModal
          editingItem={editingItem}
          setEditingItem={setEditingItem}
          isEdit={true}
        />
      ) : null}
      {addingItem ? (
        <OwnerPageMenuModal
          editingItem={addingItem}
          setEditingItem={setAddingItem}
          isEdit={false}
        />
      ) : null}
      <Button
        color="blue"
        content="Add Menu Item"
        onClick={() => {
          setAddingItem({});
        }}
        className="tw-w-[350px]"
      />
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

const OwnerPageMenuModal = (props) => {
  const { editingItem, setEditingItem, isEdit } = props;
  return (
    <Modal
      title={isEdit ? "Edit Menu Item" : "Add Menu Item"}
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
          ].unshift(editingItem);
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
            <div className="tw-flex tw-flex-col tw-gap-[30px] tw-items-center">
              {editingItem.img ? (
                <img
                  className="tw-w-[150px] tw-h-[125px]"
                  src={editingItem.img}
                ></img>
              ) : null}
              {
                <>
                  <Button
                    color="blue"
                    content={
                      <label htmlFor="owner-page-menu-input-file">
                        Upload Image
                      </label>
                    }
                  />

                  <input
                    type="file"
                    id="owner-page-menu-input-file"
                    onChange={(event) => {
                      const url = URL.createObjectURL(event.target.files[0]);
                      setEditingItem({
                        ...editingItem,
                        img: url,
                      });
                    }}
                  ></input>
                </>
              }
            </div>
            <div className="tw-flex tw-flex-col tw-gap-[12px]">
              <Input
                value={editingItem.category}
                onChange={(value) => {
                  setEditingItem({ ...editingItem, category: value });
                }}
                hasError={!editingItem.category}
                errorMessage={"Category field cannot be empty"}
              />
              <Input
                value={editingItem.name}
                onChange={(value) => {
                  setEditingItem({ ...editingItem, name: value });
                }}
                hasError={!editingItem.name}
                errorMessage={"Name field cannot be empty"}
              />
              <Input
                value={editingItem.description}
                onChange={(value) => {
                  setEditingItem({ ...editingItem, description: value });
                }}
                hasError={!editingItem.description}
                errorMessage={"Description field cannot be empty"}
              />
              <Input
                value={editingItem.cost}
                onChange={(value) => {
                  setEditingItem({ ...editingItem, cost: value });
                }}
                hasError={!editingItem.cost}
                errorMessage={"Cost field cannot be empty"}
              />
            </div>
            {isEdit ? (
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
            ) : null}
          </div>
        );
      }}
    />
  );
};

const OwnerPageContact = (props) => {
  const currentRestaurant = storage.restaurants[storage.currentRestaurant];

  const [isEditing, setIsEditing] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    ...currentRestaurant.restaurantOwner,
  });

  return (
    <div className="tw-flex tw-flex-col tw-gap-[10px]">
      {!isEditing ? (
        <Button
          color="blue"
          content="Edit Contact Info"
          onClick={() => {
            setIsEditing(true);
          }}
          className="tw-w-[250px]"
        />
      ) : null}
      <div className="tw-flex tw-flex-col tw-gap-[6px] tw-mb-[30px]">
        {isEditing ? (
          <Input
            value={contactInfo.firstName}
            onChange={(value) => {
              setContactInfo({ ...contactInfo, firstName: value });
            }}
            hasError={!contactInfo.firstName}
            errorMessage={"First name field cannot be empty"}
            className="tw-w-[50%]"
          />
        ) : (
          <div>First Name: {currentRestaurant.restaurantOwner.firstName}</div>
        )}
        {isEditing ? (
          <Input
            value={contactInfo.lastName}
            onChange={(value) => {
              setContactInfo({ ...contactInfo, lastName: value });
            }}
            hasError={!contactInfo.lastName}
            errorMessage={"Last name field cannot be empty"}
            className="tw-w-[50%]"
          />
        ) : (
          <div>Last Name: {currentRestaurant.restaurantOwner.lastName}</div>
        )}
        {isEditing ? (
          <Input
            value={contactInfo.phone}
            onChange={(value) => {
              setContactInfo({ ...contactInfo, phone: value });
            }}
            hasError={!contactInfo.phone}
            errorMessage={"Phone field cannot be empty"}
            className="tw-w-[50%]"
          />
        ) : (
          <div>Phone: {currentRestaurant.restaurantOwner.phone}</div>
        )}
        {isEditing ? (
          <Input
            value={contactInfo.address}
            onChange={(value) => {
              setContactInfo({ ...contactInfo, address: value });
            }}
            hasError={!contactInfo.address}
            errorMessage={"Address field cannot be empty"}
            className="tw-w-[50%]"
          />
        ) : (
          <div>Address: {currentRestaurant.restaurantOwner.address}</div>
        )}
      </div>
      {isEditing ? (
        <div className="tw-flex tw-flex-row tw-justify-end tw-gap-[20px] tw-p-[12px] tw-border-t-[2px] tw-border-solid tw-border-[#CBD5E1]">
          <Button
            color="blue"
            content={"Reset"}
            onClick={() => {
              setContactInfo({ ...currentRestaurant.restaurantOwner });
            }}
            className="tw-self-start"
          />
          <Button
            color="red"
            content={"Cancel"}
            onClick={() => {
              setContactInfo({ ...currentRestaurant.restaurantOwner });
              setIsEditing(false);
            }}
          />
          <Button
            color="green"
            content={"Confirm"}
            onClick={() => {
              storage.restaurants[storage.currentRestaurant].restaurantOwner = {
                ...currentRestaurant.restaurantOwner,
                ...contactInfo,
              };
              setIsEditing(false);
            }}
            disabled={
              !contactInfo.firstName ||
              !contactInfo.lastName ||
              !contactInfo.phone ||
              !contactInfo.address
            }
          />
        </div>
      ) : null}
    </div>
  );
};

const OwnerPageAccount = (props) => {
  const currentRestaurant = storage.restaurants[storage.currentRestaurant];

  const [isEditingOwnerAccount, setIsEditingOwnerAccount] = useState(false);
  const [isAddingEmployeeAccount, setIsAddingEmployeeAccount] = useState(false);
  const [accountUsername, setAccountUsername] = useState(
    currentRestaurant.restaurantOwner.username
  );
  const [accountPassword, setAccountPassword] = useState(
    currentRestaurant.restaurantOwner.password
  );
  const [forceUpdate, setForceUpdate] = useState(false);
  return (
    <div className="tw-flex tw-flex-col tw-gap-[10px]">
      {!isEditingOwnerAccount ? (
        <div className="tw-flex tw-flex-col tw-gap-[20px]">
          <div className="tw-text-2xl tw-underline tw-mb-[10px]">
            Restaurant Owner Account
          </div>
          <Button
            color="blue"
            content="Edit Restaurant Owner Account"
            onClick={() => {
              setIsEditingOwnerAccount(true);
            }}
            className="tw-w-[350px]"
          />
        </div>
      ) : null}
      <div className="tw-flex tw-flex-col tw-gap-[6px] tw-mb-[30px]">
        {isEditingOwnerAccount ? (
          <Input
            value={accountUsername}
            onChange={(value) => {
              setAccountUsername(value);
            }}
            hasError={!accountUsername}
            errorMessage={"Username field cannot be empty"}
            className="tw-w-[50%]"
          />
        ) : (
          <div>Username: {currentRestaurant.restaurantOwner.username}</div>
        )}
        {isEditingOwnerAccount ? (
          <Input
            value={accountPassword}
            onChange={(value) => {
              setAccountPassword(value);
            }}
            hasError={!accountPassword}
            errorMessage={"Password field cannot be empty"}
            className="tw-w-[50%] password"
          />
        ) : (
          <div>
            Password:{" "}
            {"*".repeat(currentRestaurant.restaurantOwner.password.length)}
          </div>
        )}
      </div>
      {isEditingOwnerAccount ? (
        <div className="tw-flex tw-flex-row tw-justify-end tw-gap-[20px] tw-p-[12px] tw-border-t-[2px] tw-border-solid tw-border-[#CBD5E1]">
          <Button
            color="blue"
            content={"Reset"}
            onClick={() => {
              setAccountUsername(currentRestaurant.restaurantOwner.username);
              setAccountPassword(currentRestaurant.restaurantOwner.password);
            }}
            className="tw-self-start"
          />
          <Button
            color="red"
            content={"Cancel"}
            onClick={() => {
              setAccountUsername(currentRestaurant.restaurantOwner.username);
              setAccountPassword("");
              setIsEditingOwnerAccount(false);
            }}
          />
          <Button
            color="green"
            content={"Confirm"}
            onClick={() => {
              storage.restaurants[
                storage.currentRestaurant
              ].restaurantOwner.username = accountUsername;
              storage.restaurants[
                storage.currentRestaurant
              ].restaurantOwner.password = accountPassword;
              setIsEditingOwnerAccount(false);
            }}
            disabled={!accountUsername || !accountPassword}
          />
        </div>
      ) : null}
      {!isEditingOwnerAccount ? (
        <div className="tw-flex tw-flex-col tw-gap-[20px]">
          <div className="tw-text-2xl tw-underline tw-mb-[10px]">
            Restaurant Employee Accounts
          </div>
          <Button
            color="blue"
            content="Add Restaurant Employee Account"
            onClick={() => {
              setIsAddingEmployeeAccount(true);
            }}
            className="tw-w-[350px]"
          />
          {currentRestaurant.restaurantEmployees.map((employee, index) => {
            return (
              <div className="tw-p-[20px] tw-flex tw-flex-row tw-rounded tw-border-[2px] tw-border-solid tw-border-[#CBD5E1] tw-gap-[15px] tw-mb-[15px]">
                <div className="tw-flex tw-flex-col tw-gap-[3px]">
                  <div>Username: {employee.username}</div>
                  <div>Password: {"*".repeat(employee.password.length)}</div>
                </div>
                <div className="tw-ml-auto tw-self-center">
                  <Button
                    color="red"
                    content={
                      <img
                        className="tw-w-[48px] tw-h-[48px] tw-brightness-0 tw-invert"
                        src={delete_trash}
                        alt="delete trash"
                      />
                    }
                    onClick={() => {
                      storage.restaurants[
                        storage.currentRestaurant
                      ].restaurantEmployees.splice(index, 1);
                      // console.log(
                      //   storage.restaurants[storage.currentRestaurant]
                      //     .restaurantEmployees
                      // );
                      setForceUpdate(!forceUpdate);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      {isAddingEmployeeAccount ? (
        <OwnerPageAccountModal
          setIsAddingEmployeeAccount={setIsAddingEmployeeAccount}
        />
      ) : null}
    </div>
  );
};

const OwnerPageAccountModal = (props) => {
  const currentRestaurant = storage.restaurants[storage.currentRestaurant];

  const { setIsAddingEmployeeAccount } = props;

  const [employeeUsername, setEmployeeUsername] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");

  return (
    <Modal
      title="Add Restaurant Employee Account"
      onClose={() => {
        setIsAddingEmployeeAccount(false);
      }}
      onReset={() => {
        setEmployeeUsername("");
        setEmployeePassword("");
      }}
      onConfirm={() => {
        currentRestaurant.restaurantEmployees.unshift({
          username: employeeUsername,
          password: employeePassword,
        });
        setIsAddingEmployeeAccount(false);
      }}
      confirmDisabled={!employeeUsername || !employeePassword}
      renderBody={() => {
        return (
          <div className="tw-flex tw-flex-row tw-gap-[30px] tw-items-center">
            <div className="tw-flex tw-flex-col tw-gap-[12px]">
              <Input
                value={employeeUsername}
                onChange={(value) => {
                  setEmployeeUsername(value);
                }}
                hasError={!employeeUsername}
                errorMessage={"Username field cannot be empty"}
              />
              <Input
                value={employeePassword}
                onChange={(value) => {
                  setEmployeePassword(value);
                }}
                hasError={!employeePassword}
                errorMessage={"Password field cannot be empty"}
                className="password"
              />
            </div>
          </div>
        );
      }}
    />
  );
};

export default OwnerPage;
