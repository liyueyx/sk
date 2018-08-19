/**
 * Created by Administrator on 2018/7/23.
 */

import UserNamager from '@/views/UserManager'
import PersonalCenter from '@/views/personalCenter/PersonalCenter'


export default [
  {
    path: '/usermanager',
    name: 'UserManager',
    component: UserNamager
  },
  {
    path: '/personalCenter',
    name: 'PersonalCenter',
    component: PersonalCenter
  }
];
