/**
 * Created by Administrator on 2018/7/23.
 */

import UserNamager from '@/views/UserManager'
import PersonalCenter from '@/views/personalCenter/PersonalCenter'
import EditInfo from '@/views/personalCenter/EditInfo';
import EditPass from '@/views/personalCenter/EditPass'
import Authentication from '@/views/personalCenter/Authentication'


export default [
  {
    path: '/usermanager',
    name: 'UserManager',
    component: UserNamager
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
