import React from 'react';

import ReactTable from 'react-table';

import PropTypes from 'prop-types';

import 'react-table/react-table.css';

class Table extends React.PureComponent {
  render() {
    const { data, columns, onPageChanged, loading, pageSize, page } = this.props;

    return (
      <ReactTable
        data={data}
        columns={columns}
        showPageSizeOptions={false}
        onPageChange={onPageChanged}
        loading={loading}
        defaultPageSize={pageSize}
        page={page}
      />
    );
  };
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
}

export default Table;
