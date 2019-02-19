import * as React from 'react';

/**
 * React Props Interface
 */
interface IHeaderProps {
  /**
   * File name that data applies to
   *
   * @type string
   */
  fileName: string;
  /**
   * TODO: Mime type? file type?
   */
  type: string;
  hasMetadata: string;
}

/**
 * React Header component
 */
export default class Header extends React.Component<IHeaderProps> {
  /**
   * Constructor
   *
   * @param props react props
   */
  constructor(props: IHeaderProps) {
    super(props);
  }

  /**
   * React render function
   */
  render() {
    return (
      <div className="headerArea">
        <div className="headerItem">
          {this.props.fileName !== '' ? (
            <h1 className="headerFileName">{this.props.fileName}</h1>
          ) : (
            <h1 className="headerFileNameNone">
              {this.props.hasMetadata !== ''
                ? 'No metadata for file'
                : 'Select a file to view metadata'}
            </h1>
          )}
          {this.props.fileName !== '' && (
            <h1 className="headerFileType">{this.props.type}</h1>
          )}
        </div>
      </div>
    );
  }
}
