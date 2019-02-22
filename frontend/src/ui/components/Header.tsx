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
  targetName: string;
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
      <div style={this.styles.headercard} className="headerArea">
        <div style={this.styles.header}>
          <div>{this.renderAppHeader(this.props.targetName)}</div>
        </div>
      </div>
    );
  }

  renderAppHeader(header: string): React.ReactNode {
    return (
      <span style={this.styles.header}>
        {this.props.targetName !== '' && this.getFileIcon(header)}
        <span style={this.styles.headerLabel} className={'--jp-ui-font-size1'}>
          {this.props.targetName !== ''
            ? header
            : 'Select a file to view metadata'}
        </span>
      </span>
    );
  }

  getFileIcon(header: string): React.ReactNode {
    try {
      let extensionName = header.slice(header.indexOf('.'));
      for (let key in this.fileTypes) {
        for (let value in this.fileTypes[key].extensions) {
          if (extensionName === this.fileTypes[key].extensions[value]) {
            return (
              <span
                className={this.fileTypes[key].iconClass}
                style={this.styles.headerIcon}
              />
            );
          }
        }
      }
      return <span className={'jp-FileIcon'} style={this.styles.headerIcon} />;
    } catch {
      return <span />;
    }
  }

  fileTypes = [
    {
      extensions: ['.md'],
      mimeTypes: ['text/markdown'],
      iconClass: 'jp-Icon jp-MarkdownIcon'
    },
    {
      extensions: ['.py'],
      mimeTypes: ['text/x-python'],
      iconClass: 'jp-Icon jp-PythonIcon'
    },
    {
      extensions: ['.json'],
      mimeTypes: ['application/json'],
      iconClass: 'jp-Icon jp-JSONIcon'
    },
    {
      extensions: ['.csv'],
      mimeTypes: ['text/csv'],
      iconClass: 'jp-Icon jp-SpreadsheetIcon'
    },
    {
      extensions: ['.tsv'],
      mimeTypes: ['text/csv'],
      iconClass: 'jp-Icon jp-SpreadsheetIcon'
    },
    {
      mimeTypes: ['text/x-rsrc'],
      extensions: ['.r'],
      iconClass: 'jp-Icon jp-RKernelIcon'
    },
    {
      mimeTypes: ['text/x-yaml', 'text/yaml'],
      extensions: ['.yaml', '.yml'],
      iconClass: 'jp-Icon jp-YamlIcon'
    },
    {
      mimeTypes: ['image/svg+xml'],
      extensions: ['.svg'],
      iconClass: 'jp-Icon jp-ImageIcon'
    },
    {
      mimeTypes: ['image/tiff'],
      extensions: ['.tif', '.tiff'],
      iconClass: 'jp-Icon jp-ImageIcon'
    },
    {
      mimeTypes: ['image/jpeg'],
      extensions: ['.jpg', '.jpeg'],
      iconClass: 'jp-Icon jp-ImageIcon'
    },
    {
      mimeTypes: ['image/gif'],
      extensions: ['.gif'],
      iconClass: 'jp-Icon jp-ImageIcon'
    },
    {
      mimeTypes: ['image/png'],
      extensions: ['.png'],
      iconClass: 'jp-Icon jp-ImageIcon'
    },
    {
      mimeTypes: ['image/bmp'],
      extensions: ['.bmp'],
      iconClass: 'jp-Icon jp-ImageIcon'
    }
  ];

  styles = {
    headercard: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '5px',
      width: '100%'
    },
    emptyHeader: {
      background: 'white',
      color: '#4F4F4F',
      marginTop: '15px',
      marginBottom: '15px'
    },
    header: {
      display: 'flex',
      flexDirection: 'row' as 'row',
      maxWidth: '200px'
    },
    headerLabel: {
      paddingLeft: '5px',
      textAlign: 'left' as 'left',
      whiteSpace: 'nowrap' as 'nowrap',
      width: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    headerIcon: {
      minWidth: '18px',
      minHeight: '18px',
      backgroundSize: '18px',
      padding: '8px'
    },
    typeLabel: { display: 'flex' }
  };
}
