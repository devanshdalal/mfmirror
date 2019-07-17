import React from "react";
import { Input } from "reactstrap";
import { ArrowKeyStepper, AutoSizer, List } from "react-virtualized";
import classNames from "classnames";

// import type { Portal } from "../../types/Portal";

// type Props = {
//   portals: Array<Portal>,
//   search?: string,
//   onPortalSelected: (portal: Portal) => {},
//   onCentralSelected: () => {}
// };
class SuggestionBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      courser: 0,
      searchString: this.props.search ? this.props.search : "",
      showList: false
    };
  }

  componentDidMount() {
    this.setState({
      list: JSON.parse(JSON.stringify(this.props.suggestionBoxData))
    });
    stockData = this.props.suggestionBoxData;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.list.length !== nextProps.suggestionBoxData.length) {
      stockData = nextProps.suggestionBoxData;
      return { list: JSON.parse(JSON.stringify(nextProps.suggestionBoxData)) };
    }
    return null;
  }

  rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const classActive = classNames({
      activeItem: this.state.courser === index
    });

    const {
      setValue,
      inputProps: { name }
    } = this.props;
    return (
      <li
        key={key}
        style={style}
        className={`list-item ${classActive}`}
        onMouseDown={e => {
          e.stopPropagation();
          e.preventDefault();
          this.setState({
            searchString: this.state.list[index],
            showList: false
          });
          setValue &&
            setValue({ target: { name, value: this.state.list[index] } });
        }}
      >
        {this.state.list[index]}
      </li>
    );
  };

  handleKeyDown = event => {
    const { courser, list } = this.state;
    const {
      setValue,
      inputProps: { name }
    } = this.props;
    // arrow up/down button should select next/previous list element
    if (event.keyCode === 13) {
      this.setState({
        searchString: list[courser],
        showList: false
      });
      setValue && setValue({ target: { name, value: list[courser] } });
    } else if (event.keyCode === 38 && courser > 0) {
      const countUp = Math.floor(this.state.courser - 1);
      this.setState({
        courser: countUp,
        searchString: list[countUp],
        showList: true
      });
      setValue && setValue({ target: { name, value: list[courser] } });
    } else if (event.keyCode === 40 && courser < list.length - 1) {
      const countDown = Math.floor(this.state.courser + 1);
      this.setState({
        courser: countDown,
        searchString: list[countDown],
        showList: true
      });
      setValue && setValue({ target: { name, value: list[courser] } });
    } else if (event.keyCode === 27) {
      this.setState({
        showList: false
      });
    } else {
      this.setState({ showList: true });
    }
  };

  searching = event => {
    const { setValue } = this.props;
    let searchedData = [];
    const text = event.target.value.trim().toLowerCase();
    if (text && text.length) {
      stockData.map((item, index) => {
        if (item.toLowerCase().indexOf(text) !== -1) {
          searchedData.push(item);
        }
        return void 0;
      });
    } else {
      searchedData = [...stockData];
    }
    this.setState({
      list: searchedData,
      searchString: event.target.value
    });
    setValue && setValue(event);
  };

  onFocus = event => {
    const { onFocus } = this.props.inputProps;
    this.setState({ showList: true });
    onFocus && onFocus(event);
  };

  onBlur = event => {
    const { onBlur } = this.props.inputProps;
    this.setState({ showList: false });
    onBlur && onBlur(event);
  };

  render() {
    const { inputProps } = this.props;
    const { list } = this.state;
    return (
      <div className="SuggestionBox">
        <Input
          {...inputProps}
          onChange={this.searching}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          value={this.state.searchString}
          onKeyDown={this.handleKeyDown}
        />
        {this.state.showList && (
          <ul className="search-list marginPadding">
            <AutoSizer disableHeight>
              {({ width }) => (
                <ArrowKeyStepper columnCount={1} rowCount={list.length}>
                  {({ onSectionRendered, scrollToColumn, scrollToRow }) => (
                    <List
                      width={width}
                      height={list.length > 3 ? 4 * 56 : list.length * 56}
                      className="virtualized-list marginPadding"
                      rowCount={this.state.list.length}
                      rowHeight={56}
                      rowRenderer={this.rowRenderer}
                      columnCount={1}
                      scrollToIndex={this.state.courser}
                      searchString={this.state.searchString}
                      scrollToColumn={scrollToColumn}
                      scrollToRow={scrollToRow}
                    />
                  )}
                </ArrowKeyStepper>
              )}
            </AutoSizer>
          </ul>
        )}
      </div>
    );
  }
}
SuggestionBox.defaultProps = {};
SuggestionBox.displayName = "SuggestionBox";

export default SuggestionBox;

let stockData = [];
