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
    return <div className="bodyArea">{items}</div>;
  }

  /**
   * Loops through all data and formats it
   */
  formatData(): React.ReactNode[] {
    let formated: React.ReactNode[] = [];
    let data: any = this.props.data.data.dataset;
    for (let section in data) {
      if (data[section] !== null) {
        if (typeof data[section] === 'object') {
          formated.push(
            this.createField(
              this.nameMap[section],
              this.converterMap[section],
              data[section].name
            )
          );
        } else {
          section !== '__typename' &&
            section !== 'id' &&
            formated.push(
              this.createField(
                this.nameMap[section],
                this.converterMap[section],
                data[section]
              )
            );
        }
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
  createField(key: string, converter: any, value: string): React.ReactNode {
    return (
      <div className="bodyItem">
        <span className="bodyKey">{key}:</span>
        <span className="bodyValue">{converter(value)}</span>
      </div>
    );
  }

  passThrough(field: any) {
    return field;
  }

  dateTransform(field: any): string {
    let serverTimeStamp = new Date(+field * 1000);
    let localTimeStamp = serverTimeStamp.toLocaleString();
    let fullDate = localTimeStamp.split(',')[0].split('/');
    let fullTime = localTimeStamp.split(',')[1].split(':');
    let timeIdentifier = fullTime[2].slice(3).toLowerCase();

    let month: any = {
      '1': 'Jan',
      '2': 'Feb',
      '3': 'Mar',
      '4': 'Apr',
      '5': 'May',
      '6': 'Jun',
      '7': 'Jul',
      '8': 'Aug',
      '9': 'Sep',
      '10': 'Oct',
      '11': 'Nov',
      '12': 'Dec'
    };
    let timestamp =
      month[fullDate[0]] +
      ' ' +
      fullDate[1] +
      fullTime[0] +
      ':' +
      fullTime[1] +
      timeIdentifier;
    return timestamp;
  }

  nameMap = {
    author: 'Author',
    category: 'Category',
    citation: 'Citation',
    copyrightHolder: 'Copy Right Holder',
    creator: 'Creator',
    dateCreated: 'Date Created',
    dateModified: 'Date Modified',
    datePublished: 'Date Published',
    description: 'Description',
    distribution: 'Distribution',
    exampleOfWork: 'Example of Work',
    headline: 'Headline',
    keywords: 'Keywords',
    license: 'License',
    provider: 'Provider'
  };

  converterMap = {
    author: this.passThrough,
    category: this.passThrough,
    citation: this.passThrough,
    copyrightHolder: this.passThrough,
    creator: this.passThrough,
    dateCreated: this.dateTransform,
    dateModified: this.dateTransform,
    datePublished: this.dateTransform,
    description: this.passThrough,
    distribution: this.passThrough,
    exampleOfWork: this.passThrough,
    headline: this.passThrough,
    keywords: this.passThrough,
    license: this.passThrough,
    provider: this.passThrough
  };
}
