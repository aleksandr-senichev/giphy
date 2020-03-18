import { PanelProps } from '@grafana/data';
import { debounce } from 'debounce';
import React, { PureComponent } from 'react';
import { Gif } from 'types';
import { Gifs } from './api';
import './css/giphy-panel.css';

interface State {
  gifs: Gif[];
  query: string;
  loading: boolean;
}

export class GiphyPanel extends PureComponent<PanelProps> {
  state: State = {
    gifs: [],
    query: '',
    loading: false,
  };

  constructor(props: PanelProps) {
    super(props);
    this.fetchGifs = debounce(this.fetchGifs, 500);
  }

  render() {
    const { width, height } = this.props;
    return (
      <div
        style={{
          width,
          height,
        }}
        className="panel-app-wrapper"
      >
        {this.renderSearchBar()}
        {this.renderGifs()}
      </div>
    );
  }

  private onInputChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    this.setState({ query: value, loading: true }, () => {
      this.fetchGifs(value);
    });
  };

  private fetchGifs = async (value: string) => {
    try {
      const { data: gifs } = await Gifs.search({
        q: value,
      });
      this.setState({ gifs, loading: false });
    } catch (error) {
      //
    }
  };

  private renderSearchBar = () => {
    return (
      <div className="search-bar-wrapper">
        <input
          onChange={this.onInputChangeHandler}
          value={this.state.query}
          className="search-bar input-small gf-form-input width-100"
          placeholder="Enter Your Gif"
        />
        {this.state.loading && (
          <svg className="spinner" viewBox="0 0 50 50">
            <circle className="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
          </svg>
        )}
      </div>
    );
  };

  private renderGifs = () => {
    const { height } = this.props;
    const { gifs } = this.state;
    return gifs.length > 0 ? (
      <div className="gifs" style={{ maxHeight: `${height - 50}px` }}>
        {gifs.map(gif => {
          return (
            <a href={gif.url} className="gifs__item" target="_blank">
              <img key={gif.id} src={gif.url} className="gifs__item__img" />
            </a>
          );
        })}
      </div>
    ) : (
      <h6>No Search Results.</h6>
    );
  };
}
