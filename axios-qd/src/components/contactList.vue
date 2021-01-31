<template>
  <div>
    <van-contact-list v-model="chosenContactId"
                      :list="list"
                      default-tag-text="默认"
                      @add="onAdd"
                      @edit="onEdit"
                      @select="onSelect" />

    <van-popup v-model="show">
      <van-contact-edit is-edit
                        :contact-info="editingContact"
                        @save="onSave"
                        @delete="onDelete" />
    </van-popup>
  </div>
</template>
<script>
import Vue from 'vue';
import { ContactList, Popup, ContactEdit } from 'vant';
import { Toast } from 'vant';
import axios from 'axios'
export default {
  name: 'contactList',
  data () {
    return {
      chosenContactId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          isDefault: true,
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
        },
      ],
      show: false,
      editingContact: {},
    };
  },
  components: {
    //注册vant组件
    [ContactList.name]: ContactList,
    [Popup.name]: Popup,
    [ContactEdit.name]: ContactEdit
  },
  created () {
    this.getContactList()
  },
  methods: {
    /*
      @method getContactList 获取联系人列表
      @params {null}
      @return {null}

    */
    async getContactList () {
      let res = await this.$Http.getContactList();
      this.list = res.data
    },
    onAdd () {
      this.show = true
    },
    onEdit (contact) {
      this.show = true;
      this.editingContact = contact
    },
    onSelect (contact) {
      Toast('选择' + contact.id);
    },
    /*
      @method onSave  保存新建/修改联系人
      @params {Object} 联系人的电话和姓名
      @return {null}
    */
    async onSave (contactInfo) {
      if (contactInfo.id == undefined) {   //新建联系人
        let res = await this.$Http.addContact(contactInfo)
        this.show = false;
        Toast({
          duration: 1000,
          message: '新建联系人成功',
          forbidClick: true,
        });
        this.getContactList()
      } else {  //修改联系人
        let res = await this.$Http.editContact(contactInfo)
        this.show = false;
        Toast({
          duration: 1000,
          message: '新建联系人成功',
          forbidClick: true,
        });
        this.getContactList()
      }
    },
    async onDelete (contactInfo) {
      let res = await this.$Http.deleteContact({ id: contactInfo.id })
      if (res.code == 2000) {
        Toast({
          duration: 1000,
          message: '删除成功',
          forbidClick: true,
        });
      }
    },
  },
}
</script>
<style scoped>
.van-popup {
  width: 100%;
  height: 100%;
}
</style>