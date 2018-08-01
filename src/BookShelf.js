import React from 'react'
import PropTypes from 'prop-types'

export default class BookSHelf extends React.PureComponent {
    propTypes = {
        label: PropTypes.string.isRequired
    }

    render() {
        return <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.label}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.children}
          </ol>
        </div>
      </div>
    }
}