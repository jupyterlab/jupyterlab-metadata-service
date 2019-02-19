import * as React from 'react';

/**
 * React Props Interface
 */
interface IBodyProps {
  /**
   * Metadata to display
   */
  data: any;
}

/**
 * Header react component
 */
export default class Header extends React.Component<IBodyProps> {
  /**
   * Constructor
   *
   * @param props react props
   */
  constructor(props: IBodyProps) {
    super(props);

    this.getFormatedData = this.getFormatedData.bind(this);
    this.formatData = this.formatData.bind(this);
    this.createField = this.createField.bind(this);
  }

  /**
   * React render function
   */
  render() {
    return (
      <div>
        {this.props.data.data.dataset !== null ? this.getFormatedData() : ''}
      </div>
    );
  }

  /**
   * Handles mapping the list of ReactNode objects for display in a single
   * ReactNode
   */
  getFormatedData(): React.ReactNode {
    const nodes = this.formatData();
    const items = nodes.map((node, i) => <div key={i}>{node}</div>);
    console.log(items);
    return <div className="bodyArea">{items}</div>;
  }

  /**
   * Loops through all data and formats it
   */
  formatData(): React.ReactNode[] {
    let formated: React.ReactNode[] = [];
    let data: any = this.props.data.data.dataset;

    for (let section in data) {
      console.log(section);

      if (typeof data[section] === 'object') {
        formated.push(this.createField(section, data[section].name));
      } else {
        section !== '__typename' &&
          section !== 'id' &&
          formated.push(this.createField(section, data[section]));
      }
    }
    return formated;
  }

  /**
   * Creates a ReactNode for a key value pair
   *
   * @param key Type: string - key value of a field
   * @param value Type: string - value of field
   */
  createField(key: string, value: string): React.ReactNode {
    return (
      <div className="bodyItem">
        <span className="bodyKey">{key}:</span>
        <span className="bodyValue">{value}</span>
      </div>
    );
  }
}
