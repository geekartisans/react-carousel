import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Arrow from 'Arrow';
import Slide from 'Slide';
import './styles.css';


export default class Carousel extends PureComponent {
  static propTypes = {
    afterChange: PropTypes.func,
    children: PropTypes.node,
    current: PropTypes.number,
    size: PropTypes.number,
  };
  static defaultProps = {
    current: 0,
    size: 3,
  };
  state = {
    size: this.props.size,
    current: this.props.current,
    slides: [],
  };
  componentWillMount() {
    this.rebuild();
  }
  /**
   * @returns {Array}
   */
  getSlides() {
    const { slides } = this.state;
    if (slides.length) {
      return slides;
    }
    return this.getWrappedChildren();
  }
  /**
   * Wrap children into Slide component
   * @returns {Array}
   */
  getWrappedChildren() {
    const { children } = this.props;

    const result = Children.toArray(children).map((child, index) => {
      const onClick = (evt) => {
        if (evt && evt.preventDefault) evt.preventDefault();

        const to = index < 1 ? this.getChildrenSize() : index;

        return this.rewind(to - 1);
      };

      return (
        <Slide
          key={index}
          onClick={onClick}
        >
          {child}
        </Slide>
      );
    });

    return result;
  }
  /**
   * Return number of children
   * @returns {Integer}
   */
  getChildrenSize() {
    const { children } = this.props;

    return Children.count(children);
  }
  /**
   * @returns {Integer}
   */
  getStartPos() {
    return this.state.current;
  }
  /**
   * @returns {Integer}
   */
  getEndPos() {
    const { current, size } = this.state;
    return current + size;
  }
  /**
   * Rebuild slider
  */
  rebuild() {
    const children = this.getWrappedChildren();
    const { size } = this.state;

    if (this.hasOffset()) {
      this.setState(() => ({
        slides: [
          ...children.slice(-size),
          ...children,
          ...children.slice(0, size),
        ],
      }));
    } else {
      this.setState(() => ({
        slides: children,
    }));
    }
  }
  /**
   * Go to the next slide
   */
  forward = (evt = null) => {
    if (evt && evt.preventDefault) evt.preventDefault();

    const childrenSize = this.getChildrenSize();
    const length = childrenSize - 1;
    let index = this.getStartPos();

    if (index >= length) {
      index = -1;
    }

    index += 1;

    this.rewind(index);
  }
  /**
   * Go to the prev slide
   */
  backward = (evt = null) => {
    if (evt && evt.preventDefault) evt.preventDefault();

    const length = this.getChildrenSize();
    let index = this.getStartPos();

    if (index < 1) {
      index = length;
    }

    index -= 1;

    this.rewind(index);
  }
  /**
   * Go to the slide
   * And notify subscribers
   *
   * @param {Integer} to
   */
  rewind(to) {
    this.setState(() => (
      {
        current: to,
      }
    ), this.notify);
  }
  /**
   * Notify subscribers
   */
  notify() {
    const { afterChange } = this.props;

    if (typeof afterChange === 'function') {
      afterChange(this.state.current);
    }
  }
  hasOffset() {
    const childrenSize = this.getChildrenSize();
    const { size } = this.state;

    return childrenSize > size;
  }
  render() {
    const { current, size } = this.state;
    const slides = this.getSlides();
    const hasOffset = this.hasOffset();
    const endPosition = this.getEndPos();
    const start = hasOffset ? current + size : current;
    const end = hasOffset ? endPosition + size : endPosition;

    return (
      <div className="Carousel">
        <Arrow left onClick={this.backward} />
        <div className="Slides">
          { slides.slice(start, end) }
        </div>
        <Arrow onClick={this.forward} />
      </div>
    );
  }
}
