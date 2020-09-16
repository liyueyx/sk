/**
 * Created by Administrator on 2018/7/23.
 */

/*import UserNamager from '@/views/UserManager'
import PersonalCenter from '@/views/personalCenter/PersonalCenter'
import EditInfo from '@/views/personalCenter/EditInfo';
import EditPass from '@/views/personalCenter/EditPass'
import Authentication from '@/views/personalCenter/Authentication'*/

const UserManager = resolve => require(['../views/UserManager'],resolve);
const PersonalCenter = resolve => require(['../views/personalCenter/PersonalCenter'],resolve);
const EditInfo = resolve => require(['../views/personalCenter/EditInfo'],resolve);
const EditPass = resolve => require(['../views/personalCenter/EditPass'],resolve);
const Authentication = resolve => require(['../views/personalCenter/Authentication'],resolve);

export default [
  {
    path: '/usermanager',
    name: 'UserManager',
    component: UserManager
  },
  {
    path: '/personalCenter',
    name: 'PersonalCenter',
    component: PersonalCenter,
    children: [
      {
        path: 'editInfo',
        component: EditInfo
      },
      {
        path: 'editPass',
        component: EditPass
      },
      {
        path: 'authentication',
        component: Authentication
      }

    ]
  }
];
