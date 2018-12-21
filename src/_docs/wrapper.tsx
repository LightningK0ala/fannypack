import * as React from 'react';
import 'parse-prop-types';
// @ts-ignore
import queryString from 'query-string';
import ThemeProvider from '../ThemeProvider';
// @ts-ignore
import _get from 'lodash/get';

import {
  faIgloo,
  faSearch,
  faClipboard,
  faThumbsUp,
  faPen,
  faLongArrowAltRight,
  faFile,
  faComments,
  faUser,
  faHandPaper
} from '@fortawesome/free-solid-svg-icons';

const theme = {
  Icon: {
    icons: {
      calendar: {
        viewBoxWidth: 16,
        viewBoxHeight: 16,
        paths: [
          'M11 3c.6 0 1-.5 1-1V1c0-.6-.4-1-1-1s-1 .4-1 1v1c0 .5.4 1 1 1zm3-2h-1v1c0 1.1-.9 2-2 2s-2-.9-2-2V1H6v1c0 1.1-.9 2-2 2s-2-.9-2-2V1H1c-.6 0-1 .5-1 1v12c0 .6.4 1 1 1h13c.6 0 1-.4 1-1V2c0-.6-.5-1-1-1zM5 13H2v-3h3v3zm0-4H2V6h3v3zm4 4H6v-3h3v3zm0-4H6V6h3v3zm4 4h-3v-3h3v3zm0-4h-3V6h3v3zM4 3c.6 0 1-.5 1-1V1c0-.6-.4-1-1-1S3 .4 3 1v1c0 .5.4 1 1 1z'
        ]
      }
    },
    iconSets: [
      {
        icons: [
          faIgloo,
          faSearch,
          faClipboard,
          faThumbsUp,
          faPen,
          faLongArrowAltRight,
          faFile,
          faComments,
          faUser,
          faHandPaper
        ],
        prefix: 'solid-',
        type: 'font-awesome' as 'font-awesome'
      }
    ]
  }
};

type Props = {
  children: Node
}

class Wrapper extends React.PureComponent<Props> {
  state =  { Theme: null };

  componentDidMount() {
    const theme = _get(queryString.parse(location.search), 'theme') || sessionStorage.getItem('theme');

    if (!theme) return;

    import(`../themes/${theme}`)
      .then(theme => this.setState({ Theme: theme.default }))
      .catch(() => {})

    sessionStorage.setItem('theme', theme);
  }

  render = () => {
    const { children } = this.props;
    const { Theme } = this.state;

    return (
      <ThemeProvider theme={Theme || theme}>{children}</ThemeProvider>
    )

  }
}

export default Wrapper;
