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
      list: [...stockData],
      courser: 0,
      searchString: this.props.search ? this.props.search : "",
      showList: false
    };
    this.text = React.createRef();
  }

  rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const classActive = classNames({
      activeItem: this.state.courser === index
    });

    return (
      <li
        key={key}
        style={style}
        className={`list-item ${classActive}`}
        onClick={() => {
          this.setState({
            searchString: this.state.list[index]
          });
        }}
      >
        {this.state.list[index]}
      </li>
    );
  };

  handleKeyDown = e => {
    const { courser, list } = this.state;
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 13) {
      this.setState({
        searchString: list[courser],
        showList: false
      });
    } else if (e.keyCode === 38 && courser > 0) {
      const countUp = Math.floor(this.state.courser - 1);
      this.setState({
        courser: countUp,
        searchString: list[countUp],
        showList: true
      });
    } else if (e.keyCode === 40 && courser < list.length - 1) {
      const countDown = Math.floor(this.state.courser + 1);
      this.setState({
        courser: countDown,
        searchString: list[countDown],
        showList: true
      });
    } else {
      this.setState({ showList: true });
    }
  };

  searching = event => {
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
  };

  onFocus = () => {
    const { onFocus } = this.props;
    this.setState({ showList: true });
    onFocus && onFocus();
  };

  onBlur = () => {
    setTimeout(() => {
      const { onBlur } = this.props;
      this.setState({ showList: false });
      onBlur && onBlur();
    }, 100);
  };

  render() {
    return (
      <div className="SuggestionBox">
        <Input
          type="text"
          name="searchText"
          placeholder="Search for a portal..."
          value={this.state.searchString}
          onChange={this.searching}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          autoComplete="off"
          onKeyDown={this.handleKeyDown}
          innerRef={this.text}
        />
        {this.state.showList && (
          <ul className="search-list marginPadding">
            <AutoSizer disableHeight>
              {({ width }) => (
                <ArrowKeyStepper
                  columnCount={1}
                  rowCount={this.state.list.length}
                >
                  {({ onSectionRendered, scrollToColumn, scrollToRow }) => (
                    <List
                      width={width}
                      height={181}
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

const stockData = [
  "DSP Small Cap Fund - Direct Plan - GrowthSmall Cap Fund",
  "HDFC Small Cap Fund - GrowthSmall Cap Fund",
  "L&T Emerging Businesses Fund - Regular Plan - GrowthSmall Cap Fund",
  "Reliance Small Cap Fund - GrowthSmall Cap Fund",
  "Kotak Small Cap Fund - GrowthSmall Cap Fund",
  "Franklin India Smaller Companies Fund - GrowthSmall Cap Fund",
  "Kotak Small Cap Fund - Direct Plan - GrowthSmall Cap Fund",
  "DSP Small Cap Fund - Regular Plan - GrowthSmall Cap Fund",
  "Aditya Birla Sun Life Small cap Fund - Regular Plan - GrowthSmall Cap Fund",
  "Union Small Cap Fund - Regular Plan - GrowthSmall Cap Fund",
  "HSBC Small Cap Equity Fund - GrowthSmall Cap Fund",
  "Sundaram Small Cap Fund - GrowthSmall Cap Fund",
  "ICICI Prudential Smallcap Fund - Direct Plan - GrowthSmall Cap Fund",
  "Axis Small Cap Fund - GrowthSmall Cap Fund",
  "Sundaram Select Small Cap - Series V - Regular Plan - GrowthSmall Cap Fund",
  "Sundaram Select Small Cap - Series VI - Regular Plan - GrowthSmall Cap Fund",
  "Sundaram Select Small Cap - Series IV - Regular Plan - GrowthSmall Cap Fund",
  "Sundaram Select Small Cap - Series III - Regular Plan - GrowthSmall Cap Fund",
  "ICICI Prudential Smallcap Fund - Retail - GrowthSmall Cap Fund",
  "ICICI Prudential Smallcap Fund - Institutional - GrowthSmall Cap Fund",
  "Sundaram Emerging Small Cap - Series 3 - GrowthSmall Cap Fund",
  "Sundaram Select Micro Cap - Series VIII - Regular Plan - GrowthSmall Cap Fund",
  "IDBI Small Cap Fund - GrowthSmall Cap Fund",
  "Sundaram Select Micro Cap - Series IX - Regular Plan - GrowthSmall Cap Fund",
  "Sundaram Emerging Small Cap - Series 2 - GrowthSmall Cap Fund",
  "Sundaram Select Micro Cap - Series X - Regular Plan - GrowthSmall Cap Fund",
  "Quant Small Cap - GrowthSmall Cap Fund",
  "Sundaram Emerging Small Cap - Series 1 - GrowthSmall Cap Fund",
  "Sundaram Select Micro Cap - Series XII - Regular Plan - GrowthSmall Cap Fund",
  "Sundaram Select Micro Cap - Series XI - Regular Plan - GrowthSmall Cap Fund",
  "Sundaram Select Micro Cap - Series XIV - Regular Plan - GrowthSmall Cap Fund",
  "Sundaram Select Micro Cap - Series XV - Regular Plan - GrowthSmall Cap Fund",
  "Sundaram Select Micro Cap - Series XVI - Regular Plan - GrowthSmall Cap Fund",
  "Sundaram Select Micro Cap - Series XVII - Regular Plan - GrowthSmall Cap Fund",
  "Sundaram Emerging Small Cap - Series 4 - GrowthSmall Cap Fund",
  "Sundaram Emerging Small Cap - Series 5 - GrowthSmall Cap Fund",
  "Sundaram Emerging Small Cap - Series 7 - GrowthSmall Cap Fund",
  "Sundaram Emerging Small Cap - Series 6 - GrowthSmall Cap Fund",
  "Tata Small Cap Fund - Regular Plan - GrowthSmall Cap Fund",
  "BOI AXA Small Cap Fund - Regular Plan - GrowthSmall Cap Fund",
  "Canara Robeco Small Cap Fund - Regular Plan - GrowthSmall Cap Fund",
  "Edelweiss Small Cap Fund - Regular Plan - GrowthSmall Cap Fund",
  "Principal Small Cap Fund - Regular Plan - GrowthSmall Cap Fund",
  "Principal Small Cap Fund - Regular Plan - GrowthSmall Cap Fund",
  "Invesco India Smallcap Fund - GrowthSmall Cap Fund",
  "ICICI Prudential Smallcap Fund - Direct Plan - GrowthSmall Cap Fund",
  "Kotak Small Cap Fund - Direct Plan - GrowthSmall Cap Fund",
  "DSP Small Cap  Fund - Direct Plan - GrowthSmall Cap Fund",
  "DSP Equity Opportunities Fund - Direct Plan - GrowthLarge & Mid Cap Fund",
  "Mirae Asset Emerging Bluechip Fund - GrowthLarge & Mid Cap Fund",
  "Invesco India Growth Opportunities Fund - GrowthLarge & Mid Cap Fund",
  "Kotak Equity Opportunities Fund - GrowthLarge & Mid Cap Fund",
  "Sundaram Large and Mid Cap Fund - GrowthLarge & Mid Cap Fund",
  "SBI Large & Midcap Fund - Regular Plan - GrowthLarge & Mid Cap Fund",
  "Kotak Equity Opportunities Fund - Direct Plan - GrowthLarge & Mid Cap Fund",
  "Canara Robeco Emerging Equities - Regular Plan - GrowthLarge & Mid Cap Fund",
  "Tata Large & Mid Cap Fund - Regular Plan - GrowthLarge & Mid Cap Fund",
  "Essel Large & Midcap Fund - Regular Plan - GrowthLarge & Mid Cap Fund",
  "Edelweiss Large and Mid Cap Fund - Regular Plan - GrowthLarge & Mid Cap Fund",
  "ICICI Prudential Large & Mid Cap Fund- Direct Plan - GrowthLarge & Mid Cap Fund",
  "ICICI Prudential Large & Mid Cap Fund- GrowthLarge & Mid Cap Fund",
  "HDFC Growth Opportunities Fund - Regular - GrowthLarge & Mid Cap Fund",
  "DSP Equity Opportunities Fund - Regular Plan - GrowthLarge & Mid Cap Fund",
  "LIC MF Large & Mid Cap Fund - GrowthLarge & Mid Cap Fund",
  "IDFC Core Equity Fund - Regular Plan - GrowthLarge & Mid Cap Fund",
  "Principal Emerging Bluechip Fund - GrowthLarge & Mid Cap Fund",
  "Aditya Birla Sun Life Equity Advantage Fund - Regular Plan - GrowthLarge & Mid Cap Fund",
  "Franklin India Equity Advantage Fund - GrowthLarge & Mid Cap Fund",
  "UTI Core Equity Fund - GrowthLarge & Mid Cap Fund",
  "L&T Large and Midcap Fund - GrowthLarge & Mid Cap Fund",
  "Reliance Vision Fund - GrowthLarge & Mid Cap Fund",
  "BOI AXA Large & Mid Cap Equity Fund - Regular Plan - GrowthLarge & Mid Cap Fund",
  "Quant Large and Mid Cap Fund - GrowthLarge & Mid Cap Fund",
  "Axis Growth Opportunities Fund - GrowthLarge & Mid Cap Fund",
  "HSBC Large and Mid Cap Equity Fund - Regular Plan - GrowthLarge & Mid Cap Fund",
  "HSBC Large and Mid Cap Equity Fund - Regular Plan - GrowthLarge & Mid Cap Fund",
  "Kotak Equity Opportunities Fund - Direct Plan - GrowthLarge & Mid Cap Fund",
  "ICICI Prudential Large & Mid Cap Fund- Direct Plan - GrowthLarge & Mid Cap Fund",
  "DSP Equity Opportunities Fund - Direct Plan - GrowthLarge & Mid Cap Fund"
];
