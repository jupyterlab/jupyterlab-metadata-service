import * as React from 'react';

import Header from './Header';
import Body from './Body';

/**
 * React Props Interface
 */
interface IAppProps {}

/**
 * App react component
 */
export default class App extends React.Component<IAppProps> {
  /**
   * Constructor
   *
   * @param props react props
   */
  constructor(props: IAppProps) {
    super(props);
  }

  /**
   * React render function
   */
  render() {
    return (
      <div>
        <Header fileName={'testData.csv'} type={'Dataset'} />
        <Body data={this.data} />
      </div>
    );
  }

  // Data just for testing
  data = {
    info: [
      { Author: 'Jacob Houssian' },
      { 'Copyright year': '2017' },
      { Creator: 'Test Corporation' }
    ],
    date: [
      { 'Date Created': '12:04 This is a test date' },
      { 'Date Modified': 'Test Corporation' },
      { 'Copyright holder': 'Test Corporation' },
      { 'Copyright holder': 'Test Corporation' },
      { 'Copyright holder': 'Test Corporation' }
    ],
    examples: [{ 'Examples of work': 'Lorem ipsum dolor sit amet' }]
  };
}
