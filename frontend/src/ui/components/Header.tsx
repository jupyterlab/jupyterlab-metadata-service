import * as React from 'react';

/**
 * React Props Interface
 */
interface IHeaderProps {
  /**
   * File name that data applies to. Equals '' if no data
   *
   * @type string
   */
  fileName: string;
  /**
   * Type name of file
   */
  type: string;
  /**
   * File name of focused file
   *
   * @type string
   */
  focusedTarget: string;
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
            <div>
              <h1 className="headerFileName">{this.props.fileName}</h1>
              <h1 className="headerFileType">{this.props.type}</h1>
            </div>
          ) : (
            <h1 className="headerFileNameNone">
              {this.props.focusedTarget !== ''
                ? 'No metadata for file'
                : 'Select a file to view metadata'}
            </h1>
          )}
        </div>
      </div>
    );
  }
}
