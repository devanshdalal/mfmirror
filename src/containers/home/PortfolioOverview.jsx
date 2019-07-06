import React, { Component } from "react";
// import { Table, Button, Form, Input } from "reactstrap";
import { AutoSizer, Table as TableVirtualized, Column, WindowScroller } from "react-virtualized";

class PortfolioOverview extends Component {
  constructor(props) {
    super(props);

    const sortBy = "totalHoldings";
    const sortDirection = "ASC";
    const sortedList = this._sortList({ sortBy, sortDirection });
    this.state = {
      sortedList,
      sortBy,
      sortDirection
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this._windowScroller && this.props.rowsPrinted !== nextProps.rowsPrinted) {
      this.setState({}, () => this._windowScroller.updatePosition());
    }
  }

  _setRef = windowScroller => {
    this._windowScroller = windowScroller;
  };

  _sort = ({ sortBy, sortDirection }) => {
    const sortedList = this._sortList({ sortBy, sortDirection });
    this.setState({ sortBy, sortDirection, sortedList });
  };

  _sortList = ({ sortBy, sortDirection }) => {
    const isSortAscending = sortDirection === "ASC";
    const { state } = this.props.location;
    return state.sort((a, b) => {
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
            {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
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
                        <Column label="Stock Invested in" dataKey="Stock Invested in" width={300} />
                        <Column label="Sector" dataKey="sector" width={200} />
                        <Column label="value(Cr)" dataKey="value" width={100} />
                        <Column label="% of Total Holdings" dataKey="% of Total Holdings" width={200} />
                        <Column label="Quantity" dataKey="quantity" width={100} />
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
