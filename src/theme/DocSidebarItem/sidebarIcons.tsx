import {type ComponentType, type SVGProps} from 'react';
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
