import * as React from 'react';

import Header from './Header';
import Body from './Body';

import { IMetadataDatasetsService } from '../..';

/**
 * React Props Interface
 */
interface IAppProps {
  /**
   * Path of open file, used as unique id to fetch comments and annotations
   *
   * @type string
   */
  target: any;

  targetName: any;

  datasets: IMetadataDatasetsService;
}

interface IAppStates {
  results: any;
}

/**
 * App react component
 */
export default class App extends React.Component<IAppProps, IAppStates> {
  /**
   * Constructor
   *
   * @param props react props
   */
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      results: { data: { dataset: null } }
    };
  }

  componentDidUpdate(): void {
    console.log('state: ', this.state.results);
    this.props.datasets.queryById(this.props.target).then((results: any) => {
      console.log('results: ', results);
      if (this.state.results.data.dataset !== null) {
        if (this.state.results.data.dataset.id !== results.data.dataset.id) {
          this.setState({ results: results });
        }
      } else {
        if (results.data.dataset !== null) {
          this.setState({ results: results });
        } else {
          if (this.state.results.data.dataset !== null) {
            this.setState({ results: { data: { dataset: null } } });
          }
        }
      }
    });
  }

  /**
   * React render function
   */
  render() {
    return (
      <div>
        <Header
          fileName={
            this.state.results.data.dataset !== null &&
            this.state.results.data.dataset.id === this.props.target
              ? this.props.targetName
              : ''
          }
          type={
            this.state.results.data.dataset !== null &&
            this.state.results.data.dataset.id === this.props.target
              ? this.state.results.data.dataset.__typename
              : ''
          }
          hasMetadata={this.props.targetName}
        />
        {this.props.target !== '' &&
          this.state.results.data.dataset !== null &&
          (this.state.results.data.dataset.id === this.props.target && (
            <Body data={this.state.results} />
          ))}
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
