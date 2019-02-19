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
  /**
   * Name of open file without path
   *
   * @type: string
   */
  targetName: any;
  /**
   * DatasetService that interacts with graphql server
   */
  datasets: IMetadataDatasetsService;
}

interface IAppStates {
  /**
   * Holds the response from querying metadata
   */
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

  /**
   * React render function
   */
  render() {
    console.log(this.state.results);
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
          focusedTarget={this.props.targetName}
        />
        {this.props.target !== '' &&
          this.state.results.data.dataset !== null &&
          (this.state.results.data.dataset.id === this.props.target && (
            <Body data={this.state.results} />
          ))}
      </div>
    );
  }

  /**
   * Called each time component updates
   */
  componentDidUpdate(): void {
    this.props.datasets.queryById(this.props.target).then((results: any) => {
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
}
