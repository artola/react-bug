import React, {PureComponent, createElement} from 'react';
import {render, unmountComponentAtNode} from 'react-dom';

const root = document.createElement('div');
document.body.appendChild(root);

// class Trial extends Component {
//   componentDidMount() {
//     const raf = window.requestAnimationFrame;

//     if (this.node) {
//       unmountComponentAtNode(this.node);
//     }

//     raf(() => {
//       render(createElement('div', null, 'works!'), this.node);
//     });
//   }

//   render() {
//     return createElement(
//       'div',
//       {
//         ref: (el) => {
//           if (el) {
//             this.node = el;
//           }
//         },
//       },
//       'here!',
//     );
//   }
// }

export default class Trial extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }

  componentDidMount() {
    this.execute();
  }

  componentDidUpdate() {
    this.execute();
  }

  componentWillUnmount() {
    this.unmount();
  }

  unmount() {
    if (this.mountNode) {
      unmountComponentAtNode(this.mountNode);
    }
  }

  execute() {
    this.setState({
      error: null,
    });

    window.requestAnimationFrame(() => {
      this.unmount();

      try {
        render(createElement('div', null, 'works!'), this.mountNode);
      } catch (err) {
        this.unmount();

        this.setState({
          error: err,
        });

        console.error('==>', err);
      }
    });
  }

  render() {
    const {error} = this.state;

    return (
      <div>
        <div ref={(ref) => (this.mountNode = ref)} />
        <div>{error}</div>
      </div>
    );
  }
}

render(createElement(Trial), root);
