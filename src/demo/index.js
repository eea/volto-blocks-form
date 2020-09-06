import codeSVG from '@plone/volto/icons/code.svg';

import ColumnsBlockView from './ColumnsBlockView';
import ColumnsBlockEdit from './ColumnsBlockEdit';

import NumberWidget from './NumberWidget';

export default function install(config) {
  config.blocks.blocksConfig.demoColumns = {
    id: 'demoColumns',
    title: 'Demo Columns',
    icon: codeSVG,
    group: 'common',
    view: ColumnsBlockView,
    edit: ColumnsBlockEdit,
    restricted: false,
    mostUsed: true,
    blockHasOwnFocusManagement: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  config.widgets.type.number = NumberWidget;
  return config;
}
