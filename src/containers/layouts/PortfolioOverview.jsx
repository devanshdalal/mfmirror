import React, { Component } from "react";
// import { Table, Button, Form, Input } from "reactstrap";
import {
  AutoSizer,
  Table as TableVirtualized,
  Column,
  WindowScroller,
} from "react-virtualized";

class PortfolioOverview extends Component {
  constructor(props) {
    super(props);

    const sortBy = "totalHoldings";
    const sortDirection = "ASC";
    const sortedList = this._sortList({
      sortBy,
      sortDirection,
      portfolio: this.filterLaggards(props.portfolio),
    });
    this.state = {
      sortedList,
      sortBy,
      sortDirection,
    };
  }

  filterLaggards = (portfolioList) => {
    return portfolioList.filter((k) => {
      return k.wt > 0.005;
    });
  };

  componentWillReceiveProps(nextProps) {
    const { sortBy, sortDirection } = this.state;
    if (
      this._windowScroller &&
      this.props.rowsPrinted !== nextProps.rowsPrinted
    ) {
      this.setState({}, () => this._windowScroller.updatePosition());
    }
    if (nextProps.portfolio !== this.props.portfolio) {
      this.setState(
        {
          sortedList: this._sortList({
            sortBy,
            sortDirection,
            portfolio: this.filterLaggards(nextProps.portfolio),
          }),
        },
        () => this._windowScroller && this._windowScroller.updatePosition()
      );
    }
  }

  _setRef = (windowScroller) => {
    this._windowScroller = windowScroller;
  };

  _sort = ({ sortBy, sortDirection }) => {
    const sortedList = this._sortList({
      sortBy,
      sortDirection,
      portfolio: this.state.sortedList,
    });
    this.setState({ sortBy, sortDirection, sortedList });
  };

  _sortList = ({ sortBy, sortDirection, portfolio }) => {
    const isSortAscending = sortDirection === "ASC";
    return portfolio.sort((a, b) => {
      let result = 0;
      if (a[sortBy] < b[sortBy]) {
        result = -1;
      } else if (a[sortBy] > b[sortBy]) {
        result = 1;
      }

      if (!isSortAscending) {
        result *= -1;
      }

      return result;
    });
  };

  render() {
    const { sortedList } = this.state;
    return (
      <div className="PortfolioOverview">
        <div className="app-container">
          <WindowScroller ref={this._setRef}>
            {({
              height,
              isScrolling,
              registerChild,
              onChildScroll,
              scrollTop,
            }) => (
              <div className="WindowScroller">
                <AutoSizer disableHeight>
                  {({ width }) => (
                    <div ref={registerChild}>
                      <TableVirtualized
                        width={width}
                        height={height}
                        autoHeight
                        isScrolling={isScrolling}
                        onScroll={onChildScroll}
                        scrollTop={scrollTop}
                        headerHeight={50}
                        rowHeight={40}
                        rowCount={sortedList.length}
                        overscanRowCount={4}
                        sort={this._sort}
                        sortBy={this.state.sortBy}
                        sortDirection={this.state.sortDirection}
                        rowGetter={({ index }) => sortedList[index]}
                      >
                        <Column label="Stock" dataKey="stock" width={400} />
                        {/* <Column label="Sector" dataKey="sector" width={200} /> */}
                        {/* <Column label="value(Cr)" dataKey="value" width={100} /> */}
                        <Column
                          label="weight"
                          dataKey="wt"
                          width={200}
                          cellRenderer={(data) => {
                            return (data.cellData * 100).toFixed(2) + " %";
                          }}
                        />
                        {/* <Column
                          label="Quantity"
                          dataKey="quantity"
                          width={100}
                        /> */}
                      </TableVirtualized>
                    </div>
                  )}
                </AutoSizer>
              </div>
            )}
          </WindowScroller>
        </div>
      </div>
    );
  }
}

export default PortfolioOverview;
