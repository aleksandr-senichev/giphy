import { PanelProps } from '@grafana/data';
import { debounce } from 'debounce';
import React, { PureComponent } from 'react';
import { Gif } from 'types';
import { Gifs } from './api';
import './css/giphy-panel.css';

interface State {
  gifs: Gif[];
  query: string;
}

export class GiphyPanel extends PureComponent<PanelProps> {
  state: State = {
    gifs: [],
    query: '',
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
          position: 'relative',
          width,
          height,
        }}
      >
        <input
          onChange={this.onInputChangeHandler}
          value={this.state.query}
          className="search-bar input-small gf-form-input width-100"
          placeholder="Enter Your Gif"
        />
        {this.renderGifs()}
      </div>
    );
  }

  private onInputChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    this.setState({ query: value }, () => {
      this.fetchGifs(value);
    });
  };

  private fetchGifs = async (value: string) => {
    try {
      const { data: gifs } = await Gifs.search({
        q: value,
      });
      this.setState({ gifs });
    } catch (error) {
      //
    }
  };

  private renderGifs = () => {
    const { height } = this.props;
    const { gifs } = this.state;
    return gifs.length > 0 ? (
      <div className="gifs" style={{ maxHeight: `${height - 50}px` }}>
        {gifs.map(gif => {
          return <img key={gif.id} src={gif.url} className="gifs__item" />;
        })}
      </div>
    ) : (
      <h5>No Search Results.</h5>
    );
  };
}
