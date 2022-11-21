import * as constants from "utils/constants";
import Navigator from "components/Navigatior";
import { storage } from "utils/storage";
import { useState } from "react";
import Button from "components/Button";
import Modal from "components/Modal";
import edit_pencil from "images/image_edit_pencil.png";
import delete_trash from "images/image_delete_trash.png";
import Input from "components/Input";
import { Textarea, Select } from "@chakra-ui/react";

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
  const [addingCategory, setAddingCategory] = useState(null);
  const [removingCategory, setRemovingCategory] = useState(null);

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
      {addingCategory ? (
        <Modal
          title={"Add Category"}
          onClose={() => {
            setAddingCategory(null);
          }}
          onConfirm={() => {
            storage.restaurants[storage.currentRestaurant].restaurantMenu[
              addingCategory.name
            ] = [];
            setAddingCategory(null);
          }}
          confirmDisabled={!addingCategory}
          renderBody={() => {
            return (
              <Input
                value={addingCategory.name}
                onChange={(value) => {
                  setAddingCategory({
                    name: value,
                  });
                }}
                hasError={
                  !addingCategory.name ||
                  Object.keys(currentRestaurant.restaurantMenu).includes(
                    addingCategory.name
                  )
                }
                errorMessage={
                  !addingCategory.name
                    ? "Category field cannot be empty"
                    : "Category already exists"
                }
              />
            );
          }}
        />
      ) : null}
      {removingCategory ? (
        <Modal
          title={`Remove Category: ${removingCategory}`}
          onClose={() => {
            setRemovingCategory(null);
          }}
          onConfirm={() => {
            delete storage.restaurants[storage.currentRestaurant]
              .restaurantMenu[removingCategory];
            setRemovingCategory(null);
          }}
          renderBody={() => {
            return (
              <div>{`Are you sure you want to remove the category "${removingCategory}"?`}</div>
            );
          }}
        />
      ) : null}
      <div className="tw-flex tw-flex-row tw-gap-[20px]">
        <Button
          color="blue"
          content="Add Menu Item"
          onClick={() => {
            setAddingItem({});
          }}
          className="tw-w-[350px]"
        />
        <Button
          color="blue"
          content="Add Category"
          onClick={() => {
            setAddingCategory({});
          }}
          className="tw-w-[350px]"
        />
      </div>
      {Object.keys(currentRestaurant.restaurantMenu)
        .reverse()
        .map((category) => {
          return (
            <div className="tw-mb-[20px]">
              <div className="tw-flex tw-flex-row tw-gap-[20px] tw-mb-[20px]">
                <div className="tw-text-2xl tw-underline">{category}</div>
                <Button
                  className="tw-w-[32px] tw-h-[32px]"
                  color="red"
                  content={"X"}
                  onClick={() => {
                    setRemovingCategory(category);
                  }}
                />
              </div>
              {currentRestaurant.restaurantMenu[category].length ? (
                currentRestaurant.restaurantMenu[category].map(
                  (item, index) => {
                    return (
                      <div className="tw-p-[20px] tw-flex tw-flex-row tw-rounded tw-border-[2px] tw-border-solid tw-border-[#CBD5E1] tw-gap-[15px] tw-mb-[15px]">
                        <img className="tw-w-[125px]" src={item.img}></img>
                        <div className="tw-flex tw-flex-col tw-gap-[3px]">
                          <div>
                            <span style={{ color: "#B5838D" }}>Name: </span>
                            {item.name}
                          </div>
                          <div>
                            <span style={{ color: "#B5838D" }}>
                              Description:{" "}
                            </span>
                            {item.description}
                          </div>
                          <div>
                            <span style={{ color: "#B5838D" }}>Cost: </span>$
                            {item.cost}
                          </div>
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
                  }
                )
              ) : (
                <div className="tw-italic">No items added in category</div>
              )}
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
          if (
            storage.restaurants[storage.currentRestaurant].restaurantMenu[
            editingItem.key
            ]
          ) {
            storage.restaurants[storage.currentRestaurant].restaurantMenu[
              editingItem.key
            ].splice(editingItem.index, 1);
          }
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
              <div className="tw-flex tw-flex-row tw-gap-[20px]">
                <div className="tw-mt-[8px]">Category:</div>
                <div className="tw-flex tw-flex-col tw-gap-[12px]">
                  <Select
                    className="tw-px-[8px] tw-py-[4px] tw-text-ellipsis focus:tw-rounded focus:tw-border-[2px] focus:tw-border-solid focus:tw-border-[#90ddf0] tw-border-[2px] tw-border-transparent focus:tw-outline-none tw-shadow-none tw-bg-transparent tw-border-b-solid tw-border-b-[#CBD5E1] hover:tw-border-b-[#90ddf0] tw-duration-200"
                    value={editingItem.category}
                    defaultValue={editingItem.category}
                    placeholder={"Select category"}
                    onChange={(event) => {
                      setEditingItem({
                        ...editingItem,
                        category: event.target.value,
                      });
                    }}
                  >
                    {Object.keys(
                      storage.restaurants[storage.currentRestaurant]
                        .restaurantMenu
                    )
                      .reverse()
                      .map((category) => {
                        return (
                          <option
                            style={{ backgroundColor: "#434560" }}
                            key={category}
                            value={category}
                          >
                            {category}
                          </option>
                        );
                      })}
                  </Select>
                  {!editingItem.category ? (
                    <div className="tw-text-xs tw-text-[#eb9486]">
                      Category field cannot be emppty
                    </div>
                  ) : null}
                </div>
              </div>
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
                    storage.restaurants[
                      storage.currentRestaurant
                    ].restaurantMenu[editingItem.key].splice(
                      editingItem.index,
                      1
                    );
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
          content="Edit Restaurant Info"
          onClick={() => {
            setIsEditing(true);
          }}
          className="tw-w-[250px]"
        />
      ) : null}
      <div className="tw-flex tw-flex-col tw-gap-[6px] tw-mb-[30px]">
        {isEditing ? (
          <Textarea
            value={contactInfo.aboutUs}
            onChange={(e) => {
              setContactInfo({ ...contactInfo, aboutUs: e.target.value });
            }}
            hasError={!contactInfo.aboutUs}
            errorMessage={"About Us field cannot be empty"}
            className="tw-w-[50%]"
            focusBorderColor="blue.100"
            size="s"
            style={{ width: "50%", height: "30vh", padding: "1%" }}
          />
        ) : (
          <div>
            <p style={{ color: "#B5838D" }}>About Us: </p>
            <p className="tw-w-[45%] mb-[3%]">{currentRestaurant.restaurantOwner.aboutUs}</p>
          </div>
        )}
        {isEditing ? (
          <Input
            value={contactInfo.location}
            onChange={(value) => {
              setContactInfo({ ...contactInfo, location: value });
            }}
            hasError={!contactInfo.location}
            errorMessage={"Location field cannot be empty"}
            className="tw-w-[50%]"
          />
        ) : (
          <div>
            <p style={{ color: "#B5838D" }}>Location:</p>
            <p className="mb-[3%]"> {currentRestaurant.restaurantOwner.location}</p>
          </div>
        )}
        {isEditing ? (
          <Input
            value={contactInfo.email}
            onChange={(value) => {
              setContactInfo({ ...contactInfo, email: value });
            }}
            hasError={!contactInfo.email}
            errorMessage={"Email field cannot be empty"}
            className="tw-w-[50%]"
          />
        ) : (
          <div>
            <p style={{ color: "#B5838D" }}>Email: </p>
            <p className="mb-[3%]"> {currentRestaurant.restaurantOwner.email}</p>
          </div>
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
          <div>
            <p style={{ color: "#B5838D" }}>Phone: </p>
            <p className="mb-[3%]">{currentRestaurant.restaurantOwner.phone}</p>
          </div>
        )}
      </div>
      {
        isEditing ? (
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
                !contactInfo.aboutUs ||
                !contactInfo.location ||
                !contactInfo.email ||
                !contactInfo.phone
              }
            />
          </div>
        ) : null
      }
    </div >
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
          <div>
            <span style={{ color: "#B5838D" }}>Username: </span>
            {currentRestaurant.restaurantOwner.username}
          </div>
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
            <span style={{ color: "#B5838D" }}>Password:{" "} </span>
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
              setAccountPassword(currentRestaurant.restaurantOwner.password);
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
                  <div>
                    <span style={{ color: "#B5838D" }}>Username: </span>
                    {employee.username}
                  </div>
                  <div>
                    <span style={{ color: "#B5838D" }}>Password: </span>
                    {"*".repeat(employee.password.length)}
                  </div>
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
