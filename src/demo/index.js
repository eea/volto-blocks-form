import codeSVG from '@plone/volto/icons/code.svg';

import ColumnsBlockView from './ColumnsBlockView';
import ColumnsBlockEdit from './ColumnsBlockEdit';
import ColumnsWidget from './ColumnsWidget';

// import NumberWidget from './NumberWidget';

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
    blockHasOwnFocusManagement: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  // config.widgets.type.number = NumberWidget;
  config.widgets.type.columns = ColumnsWidget;

  return config;
}
