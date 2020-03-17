import { PanelPlugin } from '@grafana/data';
import { GiphyPanel } from './giphy-panel';

export const plugin = new PanelPlugin(GiphyPanel);
