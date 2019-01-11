import React, { Component } from 'react';

const stickOnScroll = (InnerComponent, scrollThreshold = null) => {
    class StickOnScroll extends Component {
        state = {
            height : null,
            sticky : false
        }

        measure(height) {
            this.setState({
                height: height,
            })

            scrollThreshold = scrollThreshold ? scrollThreshold : height;
        }

        constructor(props) {
            super(props);
            if(!scrollThreshold) scrollThreshold = this.state.height;

            this.getMeasure = this.measure.bind(this);
            this.onScroll = this.onScroll.bind(this);
            this.state = { sticky: false };
        }

        componentDidMount() {
            window.addEventListener('scroll', this.onScroll, false);
        }

        componentWillUnmount() {
            window.removeEventListener('scroll', this.onScroll, false);
        }

        onScroll() {
            const { scrollY } = window;
            const { sticky } = this.state;
            const scrolledPastThreshold = scrollY >= scrollThreshold;

            if (scrolledPastThreshold && !sticky) {
                this.setState({ sticky: true });
            } else if (!scrolledPastThreshold && sticky) {
                this.setState({ sticky: false });
            }
        }

        render() {
            const { sticky } = this.state;
            return (
                <InnerComponent
                    getMeasure={this.getMeasure}
                    {...this.props}
                    sticky={sticky}
                />
            );
        }
    }

    return StickOnScroll;
};

export default stickOnScroll;