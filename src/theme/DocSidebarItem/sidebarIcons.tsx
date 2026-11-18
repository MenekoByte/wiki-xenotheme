import {type ComponentType, type CSSProperties, type ReactNode, type SVGProps} from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './sidebarIcons.module.css';
// @ts-ignore
import HomeSvg from '../../../static/img/sidebar-icons/home.svg';
// @ts-ignore
import PaletteSvg from '../../../static/img/sidebar-icons/palette.svg';
// @ts-ignore
import TroubleshootSvg from '../../../static/img/sidebar-icons/troubleshoot.svg';
// @ts-ignore
import UpdateSvg from '../../../static/img/sidebar-icons/update.svg';
// @ts-ignore
import UploadSvg from '../../../static/img/sidebar-icons/upload.svg';
// @ts-ignore
import InfoSvg from '../../../static/img/sidebar-icons/info.svg';

export const svgIconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  '/img/sidebar-icons/home.svg': HomeSvg,
  '/img/sidebar-icons/palette.svg': PaletteSvg,
  '/img/sidebar-icons/troubleshoot.svg': TroubleshootSvg,
  '/img/sidebar-icons/update.svg': UpdateSvg,
  '/img/sidebar-icons/upload.svg': UploadSvg,
  '/img/sidebar-icons/info.svg': InfoSvg,
};

// Built-in icons render as inline SVGs. Any other path (a site's own icon in its static folder) is drawn as a
// mask filled with the text colour, so sites can use their own icons without adding them to this list.
export function SidebarIcon({path, className}: {path: string; className?: string}): ReactNode {
  const url = useBaseUrl(path);
  const BuiltIn = svgIconMap[path];
  if (BuiltIn) {
    return <BuiltIn className={className} aria-hidden="true" />;
  }
  return (
    <span
      className={clsx(className, styles.maskIcon)}
      style={{'--xeno-icon-url': `url("${url}")`} as CSSProperties}
      aria-hidden="true"
    />
  );
}
