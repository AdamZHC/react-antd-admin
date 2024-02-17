import { enUS_account } from './account';
import { en_US_component } from './component';
import { enUS_dashboard } from './dashboard';
import { en_US_documentation } from './documentation';
import { enUS_globalTips } from './global/tips';
import { enUS_guide } from './guide';
import { enUS_notice } from './notice';
import { enUS_permissionRole } from './permission/role';
import { enUS_avatorDropMenu } from './user/avatorDropMenu';
import { enUS_tagsViewDropMenu } from './user/tagsViewDropMenu';
import { enUS_title } from './user/title';
import { en_US_geography } from './geography/index';

const en_US = {
  ...enUS_account,
  ...enUS_avatorDropMenu,
  ...enUS_tagsViewDropMenu,
  ...enUS_title,
  ...enUS_globalTips,
  ...enUS_permissionRole,
  ...enUS_dashboard,
  ...enUS_guide,
  ...en_US_documentation,
  ...enUS_notice,
  ...en_US_component,
  ...en_US_geography,
};

export default en_US;
