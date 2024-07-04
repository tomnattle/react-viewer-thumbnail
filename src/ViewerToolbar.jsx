import * as React from 'react';
import Icon, { ActionType } from './Icon';
export const defaultToolbars = [
    {
        key: 'zoomIn',
        actionType: ActionType.zoomIn,
    },
    {
        key: 'zoomOut',
        actionType: ActionType.zoomOut,
    },
    {
        key: 'prev',
        actionType: ActionType.prev,
    },
    {
        key: 'reset',
        actionType: ActionType.reset,
    },
    {
        key: 'next',
        actionType: ActionType.next,
    },
    {
        key: 'rotateLeft',
        actionType: ActionType.rotateLeft,
    },
    {
        key: 'rotateRight',
        actionType: ActionType.rotateRight,
    },
    {
        key: 'scaleX',
        actionType: ActionType.scaleX,
    },
    {
        key: 'scaleY',
        actionType: ActionType.scaleY,
    },
    {
        key: 'download',
        actionType: ActionType.download,
    },
];
function deleteToolbarFromKey(toolbars, keys) {
    const targetToolbar = toolbars.filter(item => keys.indexOf(item.key) < 0);
    return targetToolbar;
}
export default function ViewerToolbar(props) {
    function handleAction(config) {
        props.onAction(config);
    }
    function renderAction(config) {
        let content = null;
        // default toolbar
        if (typeof ActionType[config.actionType] !== 'undefined') {
            content = <Icon type={config.actionType}/>;
        }
        // extra toolbar
        if (config.render) {
            content = config.render;
        }
        return (<li key={config.key} className={`${props.prefixCls}-btn`} onClick={() => { handleAction(config); }} data-key={config.key}>
          {content}
      </li>);
    }
    let attributeNode = props.attribute ? (<p className={`${props.prefixCls}-attribute`}>
      {props.alt && `${props.alt}`}
      {props.noImgDetails || <span className={`${props.prefixCls}-img-details`}>
        {`(${props.width} x ${props.height})`}
      </span>}
      {props.showTotal
        && <span className={`${props.prefixCls}-showTotal`}>
          {`${props.activeIndex + 1} ${props.totalName} ${props.count}`}</span>}
    </p>) : null;
    let toolbars = props.toolbars;
    if (!props.zoomable) {
        toolbars = deleteToolbarFromKey(toolbars, ['zoomIn', 'zoomOut']);
    }
    if (!props.changeable) {
        toolbars = deleteToolbarFromKey(toolbars, ['prev', 'next']);
    }
    if (!props.rotatable) {
        toolbars = deleteToolbarFromKey(toolbars, ['rotateLeft', 'rotateRight']);
    }
    if (!props.scalable) {
        toolbars = deleteToolbarFromKey(toolbars, ['scaleX', 'scaleY']);
    }
    if (!props.downloadable) {
        toolbars = deleteToolbarFromKey(toolbars, ['download']);
    }
    return (<div>
      {attributeNode}
      <ul className={`${props.prefixCls}-toolbar`}>
        {toolbars.map(item => {
        return renderAction(item);
    })}
      </ul>
    </div>);
}
//# sourceMappingURL=ViewerToolbar.jsx.map