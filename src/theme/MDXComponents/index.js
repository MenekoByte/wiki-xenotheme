import MDXComponents from '@theme-init/MDXComponents';
import { LocationCard } from '@theme/LocationCard';
import {
  GaugeHeader,
  SectionBanner,
  SectionTab,
  SubSectionBanner,
} from '@theme/XenoMarkers';

export default {
  ...MDXComponents,
  LocationCard,
  SectionTab,
  SectionBanner,
  SubSectionBanner,
  SubsectionBanner: SubSectionBanner,
  GaugeHeader,
};
