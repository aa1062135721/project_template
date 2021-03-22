// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vue18n from 'vue-i18n'
import dayjs from 'dayjs'
import utils from './helper/Utils'
import Api from './helper/Api'
import messages from './helper/Lang-jp'
import lang from 'element-ui/lib/locale/lang/ja'
import locale from 'element-ui/lib/locale'
import { Button, Radio, RadioGroup, Checkbox, CheckboxGroup, Upload, Popover, DatePicker, Pagination, Input, Select, Option, Tag, Breadcrumb, BreadcrumbItem, Form, FormItem, Alert, Col, Collapse, CollapseItem, MessageBox, Message, Dialog, Row, Table, Tabs, TabPane, Card, TimePicker, Transfer, Tree, Tooltip } from 'element-ui'
import './assets/element-variables.scss'
import './assets/style.scss'
import './assets/fontawesome/scss/font-awesome.scss'
import './assets/datatables.min.css'
lang.el.pagination.pagesize = '件/頁'
Vue.prototype.Api = Api
Vue.prototype.Utils = utils
Vue.use(Vue18n)
locale.use(lang)
Vue.use(Tabs)
Vue.use(Tree)
Vue.use(Transfer)
Vue.use(TimePicker)
Vue.use(TabPane)
Vue.use(Button)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Popover)
Vue.use(DatePicker)
Vue.use(Pagination)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tag)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Alert)
Vue.use(Col)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Dialog)
Vue.use(Row)
Vue.use(Table)
Vue.use(Upload)
Vue.use(Card)
Vue.use(Tooltip)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
Vue.prototype.dayjs = dayjs

const i18n = new Vue18n({
  locale: 'jp',
  messages
})
Vue.prototype.i18n = i18n
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
