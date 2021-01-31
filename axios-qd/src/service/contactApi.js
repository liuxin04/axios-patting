const CONTACT_SERVICE = {
  //获取联系人列表
  getContactList: {
    method: "get",
    url: "/contactList"
  },
  //新增联系人
  addContact: {
    method: "post",
    url: "/contact/new/json"
  },
  //编辑联系人列表
  editContact: {
    method: "put",
    url: "/contact/edit"
  },
  //删除联系人
  deleteContact: {
    method: "delete",
    url: "/contact"
  }
};
export default CONTACT_SERVICE;
